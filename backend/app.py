import time
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return  {'home':0}

@app.route('/time')
def get_time():
    return {'time': time.time()}