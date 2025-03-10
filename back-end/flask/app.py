from flask import Flask, render_template, request
from ext import socketio
from routes import main
import webbrowser

app = Flask(__name__)
app.config['SECRET_KEY'] = 'comp4020'
socketio.init_app(app)

app.a = ["apple","orange"];


# Register blueprints
app.register_blueprint(main.bp)


if __name__ == '__main__':
    socketio.run(app,debug=True, port=4020, host = '0.0.0.0')


