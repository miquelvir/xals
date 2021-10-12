from typing import List

from flask import request
from flask.views import MethodView
from flask_login import current_user
from pydantic import BaseModel
from werkzeug.exceptions import NotFound, BadRequest

import server

from server.blueprints.api.utils import super_admin_required
from server.models import Admin


class SuperAdminCollectionSchema(BaseModel):
    administrators: List[Admin.Schema]


class NewSuperAdminOutSchema(BaseModel):
    administrator: Admin.Schema


class NewSuperAdminSchema(BaseModel):
    email: str


class SuperAdministratorsCollectionResource(MethodView):
    @super_admin_required
    def get(self) -> SuperAdminCollectionSchema.dict:
        super_admins: List[Admin] = Admin.query.filter_by(restaurant_id=None).all()
        return SuperAdminCollectionSchema(
            administrators=[super_admin.to_schema() for super_admin in super_admins]
        ).dict()

    @super_admin_required
    def post(self) -> NewSuperAdminOutSchema.dict:
        data = request.get_json(force=True)
        super_admin = NewSuperAdminSchema(**data)

        if not Admin.is_email_valid(super_admin.email):
            raise BadRequest("invalid email")

        if Admin.query.filter_by(email=super_admin.email).one_or_none() is not None:
            raise BadRequest("an admin already exists with this email")

        admin = Admin(id=Admin.generate_new_id(), email=super_admin.email)
        server.db.session.add(admin)
        server.db.session.commit()
        return NewSuperAdminOutSchema(administrator=admin.to_schema()).dict()


class SuperAdministratorResource(MethodView):
    @super_admin_required
    def delete(self, id_):
        admin: Admin = Admin.query.filter_by(id=id_).one_or_none()
        if admin is None:
            raise NotFound("admin not found")
        if hasattr(current_user, "email") and admin.email == current_user.email:
            raise BadRequest("an admin can't delete itself")
        server.db.session.delete(admin)
        server.db.session.commit()
        return "", 200
