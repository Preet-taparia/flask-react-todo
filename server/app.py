from flask import Flask
from flask_cors import CORS
from routes.auth import auth
from utils.auth import verify_token

app = Flask(__name__)
CORS(app)

PORT = 8000

@verify_token
@app.route('/')
def home():
    return "HI my name is preet"


app.register_blueprint(auth)



if __name__ == "__main__":
    app.run(debug=True, port=PORT)