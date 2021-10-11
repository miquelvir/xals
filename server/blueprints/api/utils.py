import functools

from flask import g, current_app
from flask_login import login_required, current_user
from flask_restful import abort

from server.models import Admin


def super_admin_required(f):
    @functools.wraps(f)
    @login_required
    def wrapper(*args, **kwargs):
        if current_app.config["DEVELOPMENT"]:
            return f(*args, **kwargs)
        if current_user is None:
            abort(401)
        if not isinstance(current_user._get_current_object(), Admin):
            abort(403)
        if current_user.restaurant_id is not None:
            abort(403)
        return f(*args, **kwargs)

    return wrapper


def admin_required(f):
    @functools.wraps(f)
    @login_required
    def wrapper(*args, **kwargs):
        if current_app.config['DEVELOPMENT']:
            return f(*args, **kwargs)
        if current_user is None:
            abort(401)
        if not isinstance(current_user._get_current_object(), Admin):
            abort(403)
        return f(*args, **kwargs)
    return wrapper


def require_restaurant_admin_or_super(restaurant_id):
    if current_app.config['DEVELOPMENT']:
        return True
    if current_user is None:
        abort(401)
    if not isinstance(current_user._get_current_object(), Admin):
        abort(403)
    if current_user.restaurant_id is None:
        return True
    if current_user.restaurant_id == restaurant_id:
        return True
    abort(403)
