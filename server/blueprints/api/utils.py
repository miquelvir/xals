import functools

from flask_login import login_required, current_user
from flask_restful import abort

from server.models import Admin


def super_admin_required(f):
    @functools.wraps(f)
    @login_required
    def wrapper(*args, **kwargs):
        if current_user is None:
            abort(401)
        if not isinstance(current_user, Admin):
            abort(403)
        if current_user.restaurant_id is not None:
            abort(403)
        return f(*args, **kwargs)

    return wrapper
