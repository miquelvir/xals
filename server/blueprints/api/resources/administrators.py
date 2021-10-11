from typing import List

from flask import request
from flask.views import MethodView
from flask_login import current_user
from pydantic import BaseModel
from werkzeug.exceptions import NotFound, BadRequest

import server

from server.blueprints.api.utils import super_admin_required
from server.models import Admin


class RestaurantAdminCollectionSchema(BaseModel):
    administrators: List[Admin.Schema]


class NewRestaurantAdminOutSchema(BaseModel):
    administrator: Admin.Schema


class NewRestaurantAdminSchema(BaseModel):
    email: str


class RestaurantAdministratorsCollectionResource(MethodView):
    @super_admin_required
    def get(self, restaurant_id) -> RestaurantAdminCollectionSchema.dict:
        restaurant_admins: List[Admin] = Admin.query.filter_by(restaurant_id=restaurant_id).all()
        return RestaurantAdminCollectionSchema(
            administrators=[restaurant_admin.to_schema() for restaurant_admin in restaurant_admins]
        ).dict()

    @super_admin_required
    def post(self, restaurant_id) -> NewRestaurantAdminOutSchema.dict:
        data = request.get_json(force=True)
        restaurant_admin = NewRestaurantAdminSchema(**data)

        if not Admin.is_email_valid(restaurant_admin.email):
            raise BadRequest("invalid email")

        if Admin.query.filter_by(email=restaurant_admin.email).one_or_none() is not None:
            raise BadRequest("an admin already exists with this email")

        admin = Admin(
            id=Admin.generate_new_id(),
            email=restaurant_admin.email,
            restaurant_id=restaurant_id
        )
        server.db.session.add(admin)
        server.db.session.commit()
        return NewRestaurantAdminOutSchema(administrator=admin.to_schema()).dict()


class RestaurantAdministratorResource(MethodView):
    @super_admin_required
    def delete(self, restaurant_id, id_):
        admin: Admin = Admin.query.filter_by(restaurant_id=restaurant_id, id=id_).one_or_none()
        if admin is None:
            raise NotFound("admin not found")
        server.db.session.delete(admin)
        server.db.session.commit()
        return "", 200
