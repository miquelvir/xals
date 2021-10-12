from server import db
from server.models._base import MyBase


class Course(MyBase):
    __tablename__ = "course"
    __mapper_args__ = {"polymorphic_identity": "course"}

    id = db.Column(db.Text, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    table_id = db.Column(db.Text, db.ForeignKey("table.id"))
