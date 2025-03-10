from flask import Blueprint, render_template, current_app
from flask_socketio import  emit
from ext import socketio

bp = Blueprint('main', __name__)  # Create a Blueprint



@bp.route('/')
def home():
    print("blueprint loaded!")
    return render_template("index.html")


@bp.route('/test', methods = ["POST"])
def testFunc():  
    return current_app.a

@bp.route('/buttonPress/<var>', methods = ["POST"])
def buttonPress(var):
    current_app.a.append(var)
    socketio.emit("data_added")
    return [f"Button Pressed {var}",]