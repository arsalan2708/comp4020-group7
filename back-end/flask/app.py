from flask import Flask, render_template, request
from ext import socketio
from routes import main


app = Flask(__name__)
app.config['SECRET_KEY'] = 'comp4020'
socketio.init_app(app)


from ds import Item, List

# REMOVE WHEN lists are implemented here AND in the backend logic 
app.a = ["apple","egg","orange"] #initial demo list for testing collab 


app.users = ("Joe","Stu","Dent") 

#populate initial lists
#app.lists =





# Register blueprints
app.register_blueprint(main.bp)


if __name__ == '__main__':
    socketio.run(app,debug=True, port=4020, host = '0.0.0.0')


