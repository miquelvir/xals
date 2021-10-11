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
from server.models import AccessToken


class AccessTokenCollectionSchema(BaseModel):
    access_tokens: List[AccessToken.Schema]


class NewAccessTokenOutSchema(BaseModel):
    access_token: AccessToken.Schema


class NewAccessTokenSchema(BaseModel):
    comment: str


class PatchAccessTokenSchema(NewAccessTokenSchema):
    pass


class RestaurantAccessTokensCollectionResource(MethodView):
    @admin_required
    def get(self, restaurant_id) -> AccessTokenCollectionSchema.dict:
        require_restaurant_admin_or_super(restaurant_id)

        access_tokens: List[AccessToken] = AccessToken.query.filter_by(
            restaurant_id=restaurant_id
        ).all()
        return AccessTokenCollectionSchema(
            access_tokens=[access_token.to_schema() for access_token in access_tokens]
        ).dict()

    @admin_required
    def post(self, restaurant_id) -> NewAccessTokenOutSchema.dict:
        require_restaurant_admin_or_super(restaurant_id)
        issuer_id = current_user.id

        data = request.get_json(force=True)
        access_token_schema = NewAccessTokenSchema(**data)
        comment = access_token_schema.comment

        access_token = AccessToken.new(
            restaurant_id=restaurant_id, issuer_id=issuer_id, comment=comment
        )

        server.db.session.add(access_token)
        server.db.session.commit()

        return NewAccessTokenOutSchema(access_token=access_token.to_schema()).dict()


class RestaurantAccessTokensResource(MethodView):
    @admin_required
    def delete(self, restaurant_id, id_):
        require_restaurant_admin_or_super(restaurant_id)

        access_token: AccessToken = AccessToken.query.filter_by(
            restaurant_id=restaurant_id, id=id_
        ).one_or_none()
        if access_token is None:
            raise NotFound("access token not found")
        server.db.session.delete(access_token)
        server.db.session.commit()

        return "", 200

    @admin_required
    def patch(self, restaurant_id, id_):
        require_restaurant_admin_or_super(restaurant_id)

        access_token: AccessToken = AccessToken.query.filter_by(id=id_).one_or_none()
        if access_token is None:
            raise NotFound("access token not found")

        data = request.get_json(force=True)
        access_token_schema = PatchAccessTokenSchema(**data)

        access_token.comment = access_token_schema.comment

        server.db.session.commit()
        return NewAccessTokenOutSchema(access_token=access_token.to_schema()).dict()
