from typing import List

from flask import request
from flask.views import MethodView
from flask_login import current_user
from pydantic import BaseModel
from werkzeug.exceptions import NotFound, BadRequest

import server

from server.blueprints.api.utils import (
    admin_required,
    require_restaurant_admin_or_super,
)
from server.models import DefaultTable


class DefaultTableCollectionSchema(BaseModel):
    default_tables: List[DefaultTable.Schema]


class NewDefaultTableOutSchema(BaseModel):
    default_table: DefaultTable.Schema


class NewDefaultTableSchema(BaseModel):
    name: str


class RestaurantDefaultTableCollectionResource(MethodView):
    @admin_required
    def get(self, restaurant_id) -> DefaultTableCollectionSchema.dict:
        require_restaurant_admin_or_super(restaurant_id)

        default_tables: List[DefaultTable] = DefaultTable.query.filter_by(
            restaurant_id=restaurant_id
        ).all()
        return DefaultTableCollectionSchema(
            default_tables=[
                default_table.to_schema() for default_table in default_tables
            ]
        ).dict()

    @admin_required
    def post(self, restaurant_id) -> NewDefaultTableOutSchema.dict:
        require_restaurant_admin_or_super(restaurant_id)

        data = request.get_json(force=True)
        default_table_schema = NewDefaultTableSchema(**data)
        name = default_table_schema.name

        if name == "":
            raise BadRequest("default tables can't be empty")

        if (
            DefaultTable.query.filter_by(
                name=name, restaurant_id=restaurant_id
            ).one_or_none()
            is not None
        ):
            raise BadRequest("a default table already exists with this name")

        default_table = DefaultTable(restaurant_id=restaurant_id, name=name)
        server.db.session.add(default_table)
        server.db.session.commit()
        return NewDefaultTableOutSchema(default_table=default_table.to_schema()).dict()


class RestaurantDefaultTableResource(MethodView):
    @admin_required
    def delete(self, restaurant_id, name):
        require_restaurant_admin_or_super(restaurant_id)

        default_table: DefaultTable = DefaultTable.query.filter_by(
            restaurant_id=restaurant_id, name=name
        ).one_or_none()
        if default_table is None:
            raise NotFound("default table not found")
        server.db.session.delete(default_table)
        server.db.session.commit()

        return "", 200
