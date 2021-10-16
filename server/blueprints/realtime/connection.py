import functools
import json
from typing import List

from flask import current_app
from flask_login import current_user, login_user
from flask_socketio import disconnect, join_room
from pydantic import BaseModel

from server import socketio
from server.blueprints.realtime._utils import (
    authenticated_only,
    get_current_user_room_id,
    get_current_user_restaurant_id,
)
from server.models import AccessToken, Table, Restaurant, DefaultTable
from server.services.tables_service import TablesService


class AllActiveTables(BaseModel):
    tables: List[Table.Schema]


@socketio.on("connect")
@authenticated_only
def connected():
    join_room(get_current_user_room_id())

    restaurant_id = get_current_user_restaurant_id()

    tables = Table.query.filter_by(
        restaurant_id=restaurant_id, finished=False
    ).all()

    socketio.emit(
        "v1.tables",
        json.loads(AllActiveTables(tables=[t.to_schema() for t in tables]).json()),
        json=True,
    )
