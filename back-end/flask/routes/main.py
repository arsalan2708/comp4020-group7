from flask import Blueprint, render_template, current_app
from flask_socketio import  emit
from ext import socketio

bp = Blueprint('main', __name__)  # Create a Blueprint
a = list()

@bp.route('/test')
def testFunc():  
    return current_app.a

@socketio.on("openList")
def openList(data):
    print("data recieved")
    emit('server_response',{'status': 'success'})

@bp.route('/buttonPress/<var>')
def buttonPress(var):
    current_app.a.append(var)
    socketio.emit("data_added")
    return [f"Button Pressed {var}",]