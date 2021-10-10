from flask_login import UserMixin
from server import db
from server.models._base import MyBase


class Admin(MyBase, UserMixin):
    __tablename__ = "admin"
    __mapper_args__ = {"polymorphic_identity": "admin"}

    id = db.Column(db.Text, primary_key=True)
    email = db.Column(db.Text, nullable=False, unique=True)

    restaurant_id = db.Column(db.Text, db.ForeignKey("restaurant.id"))

    access_tokens = db.relationship(
        "AccessToken", backref="issuer",
    )

    def login(self, token: str) -> bool:
        """checks if the token is a valid google sign in token for this email """
        # todo !!! do not merge !!! use G Sign in
        return True


