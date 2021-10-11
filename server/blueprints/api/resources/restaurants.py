from typing import List

from flask import request
from flask.views import MethodView
from flask_login import login_required
from pydantic import BaseModel
from werkzeug.exceptions import NotFound, BadRequest

import server
from server.blueprints.api.utils import super_admin_required
from server.models import Restaurant


class RestaurantCollectionSchema(BaseModel):
    restaurants: List[Restaurant.Schema]


class NewRestaurantOutSchema(BaseModel):
    restaurant: Restaurant.Schema


class NewRestaurantSchema(BaseModel):
    name: str


class PatchRestaurantSchema(NewRestaurantSchema):
    pass


class RestaurantsCollectionResource(MethodView):
    @super_admin_required
    def get(self) -> RestaurantCollectionSchema.dict:
        restaurants: List[Restaurant] = Restaurant.query.all()
        return RestaurantCollectionSchema(
            restaurants=[restaurant.to_schema() for restaurant in restaurants]
        ).dict()

    @super_admin_required
    def post(self) -> NewRestaurantOutSchema.dict:
        data = request.get_json(force=True)
        restaurant = NewRestaurantSchema(**data)

        if Restaurant.query.filter_by(name=restaurant.name).one_or_none() is not None:
            raise BadRequest("a restaurant already exists with this name")

        restaurant = Restaurant(
            id=Restaurant.generate_new_id(),
            name=restaurant.name
        )
        server.db.session.add(restaurant)
        server.db.session.commit()
        return NewRestaurantOutSchema(restaurant=restaurant.to_schema()).dict()


class RestaurantResource(MethodView):
    @super_admin_required
    def delete(self, id_):
        restaurant: Restaurant = Restaurant.query.filter_by(id=id_).one_or_none()
        if restaurant is None:
            raise NotFound("restaurant not found")
        server.db.session.delete(restaurant)
        server.db.session.commit()
        return "", 200

    @super_admin_required
    def patch(self, id_):
        restaurant: Restaurant = Restaurant.query.filter_by(id=id_).one_or_none()
        if restaurant is None:
            raise NotFound("restaurant not found")

        data = request.get_json(force=True)
        restaurant_data = PatchRestaurantSchema(**data)

        restaurant.name = restaurant_data.name

        server.db.session.commit()
        return NewRestaurantOutSchema(restaurant=restaurant.to_schema()).dict()

