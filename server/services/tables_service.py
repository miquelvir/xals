import datetime

import server
from server.models import Table, Course


class TablesService:
    @staticmethod
    def new_table(restaurant_id, number):
        table = Table(
            id=Table.generate_new_id(), number=number, restaurant_id=restaurant_id
        )
        table.courses.append(
            Course(
                id=Course.generate_new_id(),
                table_id=table.id,
                name="[[welcome]]",
                timestamp=datetime.datetime.utcnow(),
                waiting_time=None,
            )
        )
        server.db.session.add(table)
        server.db.session.commit()

        return table

    @staticmethod
    def finish_table(restaurant_id, table_id):
        table = Table.query.filter_by(
            restaurant_id=restaurant_id, id=table_id
        ).one_or_none()

        if table is None:
            raise KeyError("no table found for this id")

        table.finished = True

        table.courses.append(
            Course(
                name="desserts",
                id=Course.generate_new_id(),
                table_id=table.id,
                timestamp=datetime.datetime.utcnow(),
                waiting_time=(
                    datetime.datetime.utcnow() - table.last_course_datetime
                ).total_seconds(),
            )
        )
        server.db.session.commit()

        return table

    @staticmethod
    def next_course(restaurant_id, table_id, to_desserts: bool):
        table = Table.query.filter_by(
            restaurant_id=restaurant_id, id=table_id
        ).one_or_none()

        if table is None:
            raise KeyError("no table found for this id")

        table.courses.append(
            Course(
                name=table.next_course,
                id=Course.generate_new_id(),
                table_id=table.id,
                timestamp=datetime.datetime.utcnow(),
                waiting_time=(
                    datetime.datetime.utcnow() - table.last_course_datetime
                ).total_seconds(),
            )
        )

        if to_desserts:
            table.to_desserts = True

        server.db.session.commit()

        return table

    @staticmethod
    def delete(restaurant_id, table_id):
        table = Table.query.filter_by(
            restaurant_id=restaurant_id, id=table_id
        ).one_or_none()

        if table is None:
            raise KeyError("no table found for this id")

        temp_table = table.to_schema()

        server.db.session.delete(table)
        server.db.session.commit()

        return temp_table
