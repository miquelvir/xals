import functools

from flask import current_app
from flask_login import current_user, login_user
from flask_socketio import disconnect

from server.models import AccessToken


def get_room_id(restaurant_id: str) -> str:
    return f"restaurant/{restaurant_id}"


def get_current_user_room_id() -> str:
    restaurant_id = current_user.restaurant_id
    return get_room_id(restaurant_id)


def get_current_user_restaurant_id() -> str:
    return current_user.restaurant_id


def authenticated_only(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if current_app.config['DEVELOPMENT']:
            login_user(AccessToken.query.first())
            return f(*args, **kwargs)
        if not current_user.is_authenticated:
            return disconnect()
        if (
            not hasattr(current_user, "restaurant_id")
            or current_user.restaurant_id is None
        ):
            return disconnect()
        return f(*args, **kwargs)

    return wrapped
