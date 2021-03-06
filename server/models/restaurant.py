from server import db
from server.models._base import MyBase
from pydantic import BaseModel


class Restaurant(MyBase):
    __tablename__ = "restaurant"
    __mapper_args__ = {"polymorphic_identity": "restaurant"}

    id = db.Column(db.Text, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=True)

    alarm_minutes = db.Column(db.Integer, nullable=False, default=20)
    warning_minutes = db.Column(db.Integer, nullable=False, default=15)

    access_tokens = db.relationship(
        "AccessToken", backref="restaurant", cascade="all, delete"
    )
    admins = db.relationship("Admin", backref="restaurant", cascade="all, delete")
    default_tables = db.relationship(
        "DefaultTable", backref="table", cascade="all, delete"
    )
    tables = db.relationship("Table", backref="restaurant", cascade="all, delete")

    class Schema(BaseModel):
        id: str
        name: str
        alarm_minutes: int
        warning_minutes: int

    def to_schema(self):
        return Restaurant.Schema(
            id=self.id,
            name=self.name,
            alarm_minutes=self.alarm_minutes,
            warning_minutes=self.warning_minutes,
        )
