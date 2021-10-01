from flask import Blueprint
from flask_restful import Api as Api


from server.easy_api.resource_factory import get_resources
from server.blueprints.api.errors import Forbidden

from server.errors.authorization import Forbidden as RawForbidden
from server.models import (
    User,
    Student,
    Guardian,
    Course,
    Payment,
    Schedule,
    Teacher,
    Room,
    Role,
    Attendance,
)

api_blueprint = Blueprint("api", __name__, template_folder="templates")


@api_blueprint.errorhandler(RawForbidden)  # todo common outside api?
def handle(e):
    raise Forbidden(e.message, **e.kwargs)


api = Api(api_blueprint)

for model in (
    Student,
    Guardian,
    Course,
    Payment,
    Schedule,
    Teacher,
    Room,
    User,
    Role,
    Attendance,
):
    for res in get_resources(model):
        api.add_resource(*res)
