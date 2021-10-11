import datetime

import server
from server.models import Table, Course


class TablesService:
    @staticmethod
    def new_table(restaurant_id, number):
        table = Table(
            id=Table.generate_new_id(),
            number=number,
            restaurant_id=restaurant_id
        )
        table.courses.append(Course(
            id=Course.generate_new_id(),
            table_id=table.id,
            name='welcome',
            timestamp=datetime.datetime.utcnow()
        ))
        server.db.session.add(table)
        server.db.session.commit()

        return table
