import server


def create():
    print("dropping... [1]")
    server.db.drop_all()  # drop previous schemas
    print("creating... [2]")
    server.db.create_all()  # load new schemas


if __name__ == "__main__":
    app = server.init_app("config.DevelopmentConfig")
    with app.app_context():
        create()
