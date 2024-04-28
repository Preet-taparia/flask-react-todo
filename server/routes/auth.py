from flask import Blueprint, redirect

auth = Blueprint("auth",__name__)

@auth.route("/login")
def login():
    pass

@auth.route("/signin")
def signin():
    pass

@auth.route("/logout")
def logout():
    pass