from flask import Blueprint
from flask_restful import Api as Api


from server.blueprints.api.errors import Forbidden
from server.blueprints.api.resources.restaurants import RestaurantCollectionResource

from server.errors.authorization import Forbidden as RawForbidden

api_blueprint = Blueprint("api", __name__, template_folder="templates")


@api_blueprint.errorhandler(RawForbidden)  # todo common outside api?
def handle(e):
    raise Forbidden(e.message, **e.kwargs)


api = Api(api_blueprint)
api.add_resource(RestaurantCollectionResource)
