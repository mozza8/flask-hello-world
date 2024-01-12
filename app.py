from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Running my first app here in pycharm'

if __name__ == "__main__":
    app.run()