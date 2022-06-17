import server
from development.manual_db_utils.generate_empty_db import create
from server.models import (
    Restaurant,
    Admin,
    AccessToken,
    Table,
)
from random import randint, choice, sample

from server.models.default_table import DefaultTable


def fill_all():
    print("filling in waiting times... [0]")
    tables = Table.query.all()
    for table in tables:
        print(f"table {table.id}")
        courses = table.courses
        courses.sort(key=lambda c: c.timestamp)  # old to new

        for idx, course in enumerate(courses):
            if idx == 0:
                courses[idx].waiting_time = 0
            else:
                courses[idx].waiting_time = int(
                    (
                        courses[idx].timestamp - courses[idx - 1].timestamp
                    ).total_seconds()
                )

    print("committing... [1]")
    server.db.session.commit()


if __name__ == "__main__":
    app, socketio = server.init_app()
    with app.app_context():
        fill_all()
