from flask import Flask, render_template, jsonify, redirect, request, session
from flask_session import Session

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)