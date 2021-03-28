import time
from flask import Flask, request

app = Flask(__name__)


@app.route('/')
def index():
    return {'home': 0}


@app.route('/time')
def get_time():
    return {'time': time.time()}


@app.route('/ssh', methods=["POST"])
def create_ssh():
    print(request.method)
    print(request.json())
    return "ok", 200