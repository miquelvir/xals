import datetime

from pydantic import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property

from server import db
from server.models._base import MyBase


class Table(MyBase):
    __tablename__ = "table"

    id = db.Column(db.Text, primary_key=True)
    number = db.Column(db.Text, nullable=False)
    finished = db.Column(db.Boolean, nullable=False, default=False)
    to_desserts = db.Column(db.Boolean, nullable=False, default=False)

    courses = db.relationship("Course", backref="table", cascade="all, delete")
    restaurant_id = db.Column(
        db.Text, db.ForeignKey("restaurant.id", ondelete="CASCADE")
    )

    @hybrid_property
    def last_course_datetime(self):
        last = None
        for course in self.courses:
            if last is None or course.timestamp > last:
                last = course.timestamp
        return last

    @hybrid_property
    def next_course(self):
        if self.to_desserts:
            return "desserts"
        return len(self.courses)

    class Schema(BaseModel):
        restaurant_id: str
        number: str
        id: str
        last_course_datetime: datetime.datetime
        next_course: str
        finished: bool

    def to_schema(self):
        return Table.Schema(
            restaurant_id=self.restaurant_id,
            number=self.number,
            id=self.id,
            last_course_datetime=self.last_course_datetime,
            next_course=self.next_course,
            finished=self.finished,
        )
