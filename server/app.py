from flask import Flask
from routes.auth import auth


app = Flask(__name__)

PORT = 8000


app.register_blueprint(auth)



if __name__ == "__maim__":
    app.run(debug=True, port=PORT)