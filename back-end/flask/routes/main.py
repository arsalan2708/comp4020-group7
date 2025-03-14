from flask import Blueprint, render_template, current_app
from flask_socketio import  emit
from ext import socketio

bp = Blueprint('main', __name__)  # Create a Blueprint
a = list()

@bp.route('/test')
def testFunc():  
    return current_app.a

@socketio.on("addList")
def addList(data):
    a.append(data)
    print(data, "length of array: ",len(a))


@socketio.on("getAllLists")
def getAllList():
    if(len(a)>0):
        print("number of lists: ",len(a))
        socketio.emit(f"all_lists_response", a)


@socketio.on("getList")
def getList(id):
    print(id)
    for lst in a:
        if(lst['listID'] == id):
            print(f"{id}_response")
            socketio.emit(f"{id}_list_response", lst)

    
    



@bp.route('/buttonPress/<var>')
def buttonPress(var):
    current_app.a.append(var)
    socketio.emit("data_added")
    return [f"Button Pressed {var}",]