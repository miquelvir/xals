import datetime
import json
from typing import List, Literal, cast, Iterable

from flask import request, session
from flask.views import MethodView
from flask_login import current_user
from pydantic import BaseModel
from werkzeug.exceptions import NotFound, BadRequest
from sqlalchemy import Time, func
import server

from server.blueprints.api.utils import (
    admin_required,
    require_restaurant_admin_or_super,
)
from server.models import DefaultTable, Restaurant, Course, Table


class AverageWaitingTimeSchema(BaseModel):
    average: float


DayOfTheWeek = Literal[0, 1, 2, 3, 4, 5, 6]


class AverageWaitingTimeParamsSchema(BaseModel):
    startDate: datetime.date
    endDate: datetime.date
    startTime: datetime.time = datetime.time(hour=0, minute=0)
    endTime: datetime.time = datetime.time(hour=23, minute=59)
    daysOfTheWeek: List[DayOfTheWeek] = [0, 1, 2, 3, 4, 5, 6]  # 1 monday to 6 sunday
    restaurantId: str


class AverageWaitingTime(MethodView):
    @staticmethod
    def _compute_daily_averages(date_min_max_count: Iterable):
        averages = {}
        for date, waiting_time, count in date_min_max_count:
            if date not in averages:
                averages[date] = []
            averages[date].append(waiting_time)
        for date, average in averages.items():
            averages[date] = sum(average) / len(average)
        return averages

    @staticmethod
    def _compute_max_average(date_min_max_count: Iterable):
        sum_ = 0
        count = 0
        for date, waiting_time, _ in date_min_max_count:
            sum_ += waiting_time
            count += 1
        return sum_ / count if sum_ != 0 else -1

    @staticmethod
    def _filter_by_day_of_week(
        date_min_max_count: Iterable, days_of_week: List[DayOfTheWeek]
    ):
        for date, waiting_time, count in date_min_max_count:
            if datetime.datetime.strptime(date, "%Y-%m-%d").weekday() in days_of_week:
                yield date, waiting_time, count

    @admin_required
    def get(self) -> AverageWaitingTimeSchema.dict:
        params = dict(request.args)
        if "daysOfTheWeek" in params:
            try:
                params["daysOfTheWeek"] = list(
                    map(int, params["daysOfTheWeek"].split(","))
                )
            except ValueError:
                raise BadRequest("daysOfTheWeek must be a comma-separated list of ints")

        params = AverageWaitingTimeParamsSchema(**params)

        require_restaurant_admin_or_super(params.restaurantId)

        restaurant: Restaurant = Restaurant.query.filter_by(
            id=params.restaurantId
        ).one_or_none()
        if restaurant is None:
            raise NotFound("restaurant not found")

        tables: List = (
            server.db.session.query(
                func.Date(Course.timestamp), func.avg(Course.waiting_time), func.count()
            )
            .join(Table)
            .filter(Table.restaurant_id == params.restaurantId)
            .filter(Course.timestamp.between(params.startDate, params.endDate))
            .filter(func.Time(Course.timestamp) <= params.endTime)
            .filter(params.startTime <= func.Time(Course.timestamp))
            .group_by(Table.id)
            .all()
        )

        # if len(params.daysOfTheWeek) != 7:  # todo does not work do within sql query
        #    tables: Iterable = self._filter_by_day_of_week(tables, params.daysOfTheWeek)

        return {
            "average": self._compute_daily_averages(tables),
        }


class AverageWaitingTimePerCourse(MethodView):
    @admin_required
    def get(self) -> AverageWaitingTimeSchema.dict:
        params = dict(request.args)
        if "daysOfTheWeek" in params:
            try:
                params["daysOfTheWeek"] = list(
                    map(int, params["daysOfTheWeek"].split(","))
                )
            except ValueError:
                raise BadRequest("daysOfTheWeek must be a comma-separated list of ints")

        params = AverageWaitingTimeParamsSchema(**params)

        require_restaurant_admin_or_super(params.restaurantId)

        restaurant: Restaurant = Restaurant.query.filter_by(
            id=params.restaurantId
        ).one_or_none()
        if restaurant is None:
            raise NotFound("restaurant not found")

        name_waiting: List = (
            server.db.session.query(Course.name, func.avg(Course.waiting_time))
            .join(Table)
            .filter(Table.restaurant_id == params.restaurantId)
            .filter(Course.timestamp.between(params.startDate, params.endDate))
            .filter(func.Time(Course.timestamp) <= params.endTime)
            .filter(params.startTime <= func.Time(Course.timestamp))
            .filter(Course.name != "[[welcome]]")
            .group_by(Course.name)
            .all()
        )

        # if len(params.daysOfTheWeek) != 7:  # todo does not work do within sql query
        #    tables: Iterable = self._filter_by_day_of_week(tables, params.daysOfTheWeek)

        return {
            "average": {name: waiting for name, waiting in name_waiting},
        }
