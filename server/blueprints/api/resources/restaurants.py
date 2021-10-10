from typing import List

from flask import request
from flask_restful import Resource
from pydantic import BaseModel
from werkzeug.exceptions import BadRequest

import server
from server.blueprints.api.utils import super_admin_required
from server.models import Restaurant


class RestaurantCollectionSchema(BaseModel):
    restaurants: List[Restaurant.Schema]


class NewRestaurantSchema(BaseModel):
    name: str


class RestaurantCollectionResource(Resource):
    @super_admin_required
    def get(self) -> RestaurantCollectionSchema:
        restaurants: List[Restaurant] = Restaurant.query.all()
        return RestaurantCollectionSchema(
            restaurants=[restaurant.to_schema() for restaurant in restaurants]
        )

    @super_admin_required
    def post(self) -> None:
        data = request.get_json(force=True)
        restaurant = NewRestaurantSchema(**data)

        if Restaurant.query.filter_by(name=restaurant.name).one_or_none() is not None:
            raise BadRequest("a restaurant already exists with this name")

        server.db.session.add(
            Restaurant(id=Restaurant.generate_new_id(), name=restaurant.name)
        )
        server.db.session.commit()
