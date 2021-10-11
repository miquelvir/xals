import json

from pydantic import BaseModel, ValidationError

from server import socketio
from server.blueprints.realtime._utils import authenticated_only, get_current_user_room_id, \
    get_current_user_restaurant_id
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
    table = TablesService.new_table(restaurant_id=get_current_user_restaurant_id(),
                                    number=table_data.number)
    print(NewTableOut(table=table.to_schema()).json())
    socketio.emit(
        "v1.tables.new",
        json.loads(NewTableOut(table=table.to_schema()).json()),
        room=get_current_user_room_id(),
        include_self=True,
        json=True
    )


@socketio.on("v1.tables.finish")
@authenticated_only
def v1_tables_finish(data):
    table_data = NewTable(**data)
    table = TablesService.new_table(restaurant_id=get_current_user_restaurant_id(),
                                    number=table_data.number)

    socketio.emit(
        "v1.tables.finish",
        json.loads(NewTableOut(table=table.to_schema()).json()), room=get_current_user_room_id(), include_self=False,
        json=True
    )
