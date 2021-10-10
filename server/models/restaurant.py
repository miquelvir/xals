from server import db
from server.models._base import MyBase
from pydantic import BaseModel


class Restaurant(MyBase):
    __tablename__ = "restaurant"
    __mapper_args__ = {"polymorphic_identity": "restaurant"}

    id = db.Column(db.Text, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=True)

    access_tokens = db.relationship(
        "AccessToken", backref="restaurant",
    )
    admins = db.relationship(
        "Admin", backref="restaurant",
    )

    class Schema(BaseModel):
        id: str
        name: str

    def to_schema(self):
        return Restaurant.Schema(id=self.id, name=self.name)
