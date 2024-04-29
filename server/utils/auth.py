from flask import request, jsonify
import requests
import jwt
import functools


def register_user():
    pass

class TokenAuthentication:
    def __init__(self, token):
        self.access_token = token
        self.public_key = self._get_keycloak_public_key()

    def _get_keycloak_public_key(self):
        keycloak_url = 'http://localhost:8080/auth/realms/flask-react-todo'
        response = requests.get(keycloak_url).json()
        return f'-----BEGIN PUBLIC KEY-----\n{response["public_key"]}\n-----END PUBLIC KEY-----'

    def is_valid_token(self):
        if self.access_token:
            try:
                tokenData = jwt.decode(self.access_token, self.public_key, algorithms=["RS256"])
                return True
            except jwt.ExpiredSignatureError:
                return False
            except jwt.InvalidTokenError:
                return False
        else:
            return False

def verify_token(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        access_token = request.headers.get('Authorization', '').replace('Bearer ', '')
        given_auth = TokenAuthentication(access_token)
        if given_auth.is_valid_token():
            return func(*args, **kwargs)
        else:
            return jsonify({"error": "Unauthorized"}), 403
    return wrapper
