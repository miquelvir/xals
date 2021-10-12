from flask import Blueprint
from flask_restful import Api as Api
from pydantic import ValidationError
from werkzeug.exceptions import BadRequest

from server.blueprints.api.errors import Forbidden
from server.errors.authorization import Forbidden as RawForbidden

from server.blueprints.api.resources.restaurants import (
    RestaurantsCollectionResource,
    RestaurantResource,
)
from server.blueprints.api.resources.super_administrators import (
    SuperAdministratorResource,
    SuperAdministratorsCollectionResource,
)
from server.blueprints.api.resources.administrators import (
    RestaurantAdministratorResource,
    RestaurantAdministratorsCollectionResource,
)
from server.blueprints.api.resources.default_tables import (
    RestaurantDefaultTableResource,
    RestaurantDefaultTableCollectionResource,
)
from server.blueprints.api.resources.access_tokens import (
    RestaurantAccessTokensResource,
    RestaurantAccessTokensCollectionResource,
)

api_blueprint = Blueprint("api", __name__)


@api_blueprint.errorhandler(RawForbidden)  # todo common outside api?
def handle(e):
    raise Forbidden(e.message, **e.kwargs)


@api_blueprint.errorhandler(ValidationError)
def handle(e):
    raise BadRequest(e)


# RESTAURANTS
api_blueprint.add_url_rule(
    "/restaurants", view_func=RestaurantsCollectionResource.as_view("restaurants")
)
api_blueprint.add_url_rule(
    "/restaurants/<id_>", view_func=RestaurantResource.as_view("restaurant")
)
api_blueprint.add_url_rule(
    "/restaurants/<restaurant_id>/administrators",
    view_func=RestaurantAdministratorsCollectionResource.as_view(
        "restaurant_administrators"
    ),
)
api_blueprint.add_url_rule(
    "/restaurants/<restaurant_id>/administrators/<id_>",
    view_func=RestaurantAdministratorResource.as_view("restaurant_administrator"),
)
api_blueprint.add_url_rule(
    "/restaurants/<restaurant_id>/defaultTables",
    view_func=RestaurantDefaultTableCollectionResource.as_view(
        "restaurant_defaultTables"
    ),
)
api_blueprint.add_url_rule(
    "/restaurants/<restaurant_id>/defaultTables/<name>",
    view_func=RestaurantDefaultTableResource.as_view("restaurant_defaultTable"),
)
api_blueprint.add_url_rule(
    "/restaurants/<restaurant_id>/accessTokens",
    view_func=RestaurantAccessTokensCollectionResource.as_view(
        "restaurant_accessTokens"
    ),
)
api_blueprint.add_url_rule(
    "/restaurants/<restaurant_id>/accessTokens/<id_>",
    view_func=RestaurantAccessTokensResource.as_view("restaurant_accessToken"),
)


# SUPER ADMINISTRATORS
api_blueprint.add_url_rule(
    "/administrators/super",
    view_func=SuperAdministratorsCollectionResource.as_view("super_administrators"),
)
api_blueprint.add_url_rule(
    "/administrators/super/<id_>",
    view_func=SuperAdministratorResource.as_view("super_administrator"),
)
