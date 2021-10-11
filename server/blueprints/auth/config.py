from collections import namedtuple
from functools import wraps

from flask import Blueprint, g, request, current_app, session, abort, jsonify

# initialise the blueprint
from flask_login import login_user, logout_user, login_required, current_user

from server.models import Admin, AccessToken
from google.oauth2 import id_token
from google.auth.transport import requests

auth_blueprint = Blueprint("auth", __name__)


def google_oauth_required(f):
    def verify_password(token: str) -> bool:
        """Given a username and optionally a password, verify its validity."""
        try:
            # Specify the CLIENT_ID of the app that accesses the backend:
            idinfo = id_token.verify_oauth2_token(
                token, requests.Request(), current_app.config["GOOGLE_CLIENT_ID"]
            )

            # ID token is valid. Get the user's Google Account ID from the decoded token.
            userid = idinfo["sub"]
        except ValueError:
            # Invalid token
            return False

        email = idinfo["email"]
        admin = Admin.query.filter_by(email=email).one_or_none()

        if admin is None:
            return False

        g.user = admin
        return True

    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.authorization
        if not (auth and verify_password(auth.password)):
            abort(401)
        return f(*args, **kwargs)

    return wrapper


@auth_blueprint.route("/login/google", methods=["POST"])
@google_oauth_required  # require user and password to be validated
def login():
    """
    In the before_request, the user is required to login. When reaching this endpoint, the user is already validated.
        // pre-condition: g.user has the user name
    Given a username, it generates the jwt_token and send it to the client.
    The client must store it for future calls.
    """
    user = g.user

    login_user(user, remember=False)

    return {
        "type": "restaurantAdmin" if user.restaurant_id is not None else "superAdmin",
        "restaurantId": user.restaurant_id,
        "restaurantName": None if user.restaurant is None else user.restaurant.name,
    }, 200


@auth_blueprint.route("/logout", methods=["POST"])
@login_required
def logout():
    """
    # Because the JWTs are stored in an httponly cookie now, we cannot
    # log the user out by simply deleting the cookie in the frontend.
    # We need the backend to send us a response to delete the cookies
    # in order to logout. unset_jwt_cookies is a helper function to
    # do just that.
    """
    logout_user()

    current_app.login_manager._update_request_context_with_user()

    session.clear()

    return "", 200


@auth_blueprint.route("/ping", methods=["GET"])
@login_required
def ping():
    # will break if login is disabled, as in wsgi_development config
    return "", 200


def restaurant_access_token_required(f):
    def get_access_token(restaurant_id: str, access_token: str) -> bool:
        """Given a username and optionally a password, verify its validity."""
        return AccessToken.query.filter_by(
            restaurant_id=restaurant_id, token=access_token
        ).one_or_none()

    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.authorization
        if not auth:
            abort(401)

        restaurant_id, access_token = auth.username, auth.password
        token = get_access_token(restaurant_id, access_token)
        if token is None:
            abort(401)

        g.user = token
        return f(*args, **kwargs)

    return wrapper


@auth_blueprint.route("/login/accessToken", methods=["POST"])
@restaurant_access_token_required  # require restaurant id and access token
def login_access_token():
    token = g.user

    login_user(token, remember=False)

    return {
        "type": "accessToken",
        "restaurantId": token.restaurant_id,
        "restaurantName": token.restaurant.name,
        "warningMinutes": token.restaurant.warning_minutes,
        "alarmMinutes": token.restaurant.alarm_minutes,
    }, 200
