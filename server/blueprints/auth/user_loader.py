from flask import current_app

from server import login
from server.models import Admin, AccessToken


@login.user_loader
def user_loader(id_):
    """
    loads a user given its id for Flask-Login

    :param id_: the user id
    :return: the User with that id
    """
    if id_.startswith(AccessToken.PREFIX):
        id_ = AccessToken.parse_id(id_)
        return AccessToken.query.filter_by(id=id_).one_or_none()
    if id_.startswith(Admin.PREFIX):
        id_ = Admin.parse_id(id_)
        return Admin.query.filter_by(id=id_).one_or_none()
    if current_app.config['DEVELOPMENT']:
        return Admin.query.filter_by(restaurant_id=None).one_or_none()
    return None
