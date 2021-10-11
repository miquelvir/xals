from flask import Blueprint
from flask_restful import Api as Api
from pydantic import ValidationError
from werkzeug.exceptions import BadRequest

from server.blueprints.api.errors import Forbidden
from server.blueprints.api.resources.restaurants import RestaurantsCollectionResource, RestaurantResource
from server.blueprints.api.resources.super_administrators import SuperAdministratorResource, SuperAdministratorsCollectionResource
from server.errors.authorization import Forbidden as RawForbidden

api_blueprint = Blueprint("api", __name__)


@api_blueprint.errorhandler(RawForbidden)  # todo common outside api?
def handle(e):
    raise Forbidden(e.message, **e.kwargs)


@api_blueprint.errorhandler(ValidationError)
def handle(e):
    raise BadRequest(e)


api_blueprint.add_url_rule('/restaurants', view_func=RestaurantsCollectionResource.as_view('restaurants'))
api_blueprint.add_url_rule('/restaurants/<id_>', view_func=RestaurantResource.as_view('restaurant'))
api_blueprint.add_url_rule('/administrators/super', view_func=SuperAdministratorsCollectionResource.as_view('super_administrators'))
api_blueprint.add_url_rule('/administrators/super/<id_>', view_func=SuperAdministratorResource.as_view('super_administrator'))

