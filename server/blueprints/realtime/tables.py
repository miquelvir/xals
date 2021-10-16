import json

from pydantic import BaseModel, ValidationError

from server import socketio
from server.blueprints.realtime._utils import (
    authenticated_only,
    get_current_user_room_id,
    get_current_user_restaurant_id,
)
from server.models import Table
from server.services.tables_service import TablesService


class NewTable(BaseModel):
    number: str


class NewTableOut(BaseModel):
    table: Table.Schema




@socketio.on("v1.tables.new")
@authenticated_only
def v1_tables_new(data):
    try:
        table_data = NewTable(**data)
    except ValidationError:
        return
    table = TablesService.new_table(
        restaurant_id=get_current_user_restaurant_id(), number=table_data.number
    )

    socketio.emit(
        "v1.tables.new",
        json.loads(NewTableOut(table=table.to_schema()).json()),
        room=get_current_user_room_id(),
        include_self=True,
        json=True,
    )


class FinishedTable(BaseModel):
    id: str


@socketio.on("v1.tables.finish")
@authenticated_only
def v1_tables_finish(data):
    try:
        table_data = FinishedTable(**data)
    except ValidationError:
        return

    try:
        table = TablesService.finish_table(
            restaurant_id=get_current_user_restaurant_id(), table_id=table_data.id
        )
    except KeyError:
        return

    socketio.emit(
        "v1.tables.finish",
        json.loads(NewTableOut(table=table.to_schema()).json()),
        room=get_current_user_room_id(),
        include_self=True,
        json=True,
    )


@socketio.on("v1.tables.next")
@authenticated_only
def v1_tables_next(data):
    try:
        table_data = FinishedTable(**data)
    except ValidationError:
        return

    try:
        table = TablesService.next_course(
            restaurant_id=get_current_user_restaurant_id(), table_id=table_data.id
        )
    except KeyError:
        return

    socketio.emit(
        "v1.tables.next",
        json.loads(NewTableOut(table=table.to_schema()).json()),
        room=get_current_user_room_id(),
        include_self=True,
        json=True,
    )


@socketio.on("v1.tables.delete")
@authenticated_only
def v1_tables_delete(data):
    try:
        table_data = FinishedTable(**data)
    except ValidationError:
        return

    try:
        table = TablesService.delete(
            restaurant_id=get_current_user_restaurant_id(), table_id=table_data.id
        )
    except KeyError:
        return

    socketio.emit(
        "v1.tables.delete",
        json.loads(NewTableOut(table=table).json()),
        room=get_current_user_room_id(),
        include_self=True,
        json=True,
    )

