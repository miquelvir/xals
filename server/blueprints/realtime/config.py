import functools

from flask_login import current_user
from flask_socketio import disconnect, join_room

from server import socketio


def authenticated_only(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not current_user.is_authenticated:
            disconnect()
        if not hasattr(current_user, 'restaurant_id') or current_user.restaurant_id is None:
            disconnect()
        return f(*args, **kwargs)
    return wrapped


def get_room_id(restaurant_id: str) -> str:
    return f"restaurant/{restaurant_id}"


@socketio.on('connect')
@authenticated_only
def connected():
    restaurant_id = current_user.restaurant_id
    room_id = get_room_id(restaurant_id)
    join_room(room_id)

    socketio.emit('v1.tables', {'tables': [
        {
            "number": 1,
            "lastCourseDatetime": '2021-10-10T08:33:03.969Z',
            "nextCourse": 'desserts'
        },
        {
            "number": 2,
            "lastCourseDatetime": '2021-10-10T09:15:03.969Z',
            "nextCourse": 'first'
        },
        {
            "number": 5,
            "lastCourseDatetime": '2021-10-10T08:00:02.969Z',
            "nextCourse": 'second'
        },
        {
            "number": 6,
            "lastCourseDatetime": '2021-10-10T07:31:06.969Z',
            "nextCourse": 'desserts'
        }
    ]}, json=True)


@socketio.on('v1.tables.new')
@authenticated_only
def v1_tables_new(data):
    socketio.emit('v1.tables.new', {'table': {}}, room=data['room'], include_self=False)


@socketio.on('v1.tables.finish')
@authenticated_only
def v1_tables_finish(data):
    socketio.emit('v1.tables.finish', {'table': {}}, room=data['room'], include_self=False)
