from flask_login import UserMixin
from server import db
from server.models._base import MyBase
import uuid


class AccessToken(MyBase, UserMixin):
    __tablename__ = "access_token"
    __mapper_args__ = {"polymorphic_identity": "access_token"}

    id = db.Column(db.Text, primary_key=True)
    comment = db.Column(db.Text, nullable=True, unique=False)
    token = db.Column(db.Text, nullable=False, unique=True)

    restaurant_id = db.Column(db.Text, db.ForeignKey("restaurant.id"))

    issuer_id = db.Column(db.Text, db.ForeignKey("admin.id"))

    @classmethod
    def new(cls, restaurant_id, issuer_id, comment=''):
        return AccessToken(
            id=str(uuid.uuid4()),
            comment=comment,
            token=str(uuid.uuid4()),
            restaurant_id=restaurant_id,
            issuer_id=issuer_id
        )



