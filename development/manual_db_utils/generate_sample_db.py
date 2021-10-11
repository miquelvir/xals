import server
from development.manual_db_utils.generate_empty_db import create
from server.models import (
    Restaurant,
    Admin,
    AccessToken,
)
from random import randint, choice, sample

from server.models.default_table import DefaultTable


def add_default_tables(restaurant, min_amount=0, max_amount=25):
    for idx in range(randint(min_amount, max_amount)):
        print(f"    default table {idx} for restaurant {restaurant.id}")
        table = DefaultTable(
            restaurant_id=restaurant.id,
            name=str(idx),
        )

        server.db.session.add(table)


def add_restaurants(amount=25):
    for idx in range(amount):
        print(f"    restaurant {idx}")
        restaurant = Restaurant(
            id=Restaurant.generate_new_id(),
            name=f"Restaurant {idx}",
        )

        server.db.session.add(restaurant)

        add_default_tables(restaurant)

        yield restaurant


def add_admins(restaurants, super_amount=5):
    for idx, restaurant in enumerate(restaurants):
        print(f"    admin {idx}")
        admin = Admin(
            id=Admin.generate_new_id(),
            email=f"admin{idx}@gmail.com",
            restaurant_id=restaurant.id,
        )

        server.db.session.add(admin)

        yield admin

    for idx in range(super_amount):
        print(f"    super admin {idx}")
        admin = Admin(
            id=Admin.generate_new_id(),
            email=f"superadmin{idx}@gmail.com",
        )

        server.db.session.add(admin)

        yield admin

    email = input("custom super admin email? ")
    if email is not None and email != "":
        print(f"    super admin {email}")
        server.db.session.add(Admin(id=Admin.generate_new_id(), email=email))

    email = input("custom restaurant admin email? ")
    if email is not None and email != "":
        print(f"    restaurant admin {email}")
        server.db.session.add(
            Admin(
                id=Admin.generate_new_id(),
                email=email,
                restaurant_id=choice(restaurants).id,
            )
        )


def add_access_tokens(restaurants, admins, min_amount=0, max_amount=15):
    for admin in admins:
        for idx in range(randint(min_amount, max_amount)):
            restaurant_id = (
                admin.restaurant_id
                if admin.restaurant_id is not None
                else choice(restaurants).id
            )
            print(
                f"    access token {idx} for restaurant {restaurant_id} iss/{admin.id}"
            )
            access_token = AccessToken.new(
                restaurant_id, admin.id, f"this is the comment for token {idx}"
            )

            server.db.session.add(access_token)
            yield access_token


def add_all():
    create()

    print("adding restaurants... [3]")
    restaurants = list(add_restaurants())

    print("adding admins... [4]")
    admins = list(add_admins(restaurants))

    print("adding access tokens... [4]")
    access_tokens = list(add_access_tokens(restaurants, admins))

    print("committing... [5]")
    server.db.session.commit()


if __name__ == "__main__":
    app, socketio = server.init_app("config.DevelopmentConfig")
    with app.app_context():
        add_all()
