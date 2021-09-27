from flask import Flask, render_template, jsonify, redirect, request, session
from flask_session import Session
import datetime
from pymongo import MongoClient


now = datetime.datetime.now()
today = now.strftime("%A").lower()


app = Flask(__name__)

cluster = MongoClient(
    "mongodb+srv://emesspsgct:emesspsgct2021@e-messpsgct.4q1dp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
)
if cluster:
    print("Connected")

db = cluster["mess_db"]
collection = db["mess_schedule"]

breakfast, lunch, snack, dinner = [], [], [], []


@app.route("/")
def index():
    global breakfast, lunch, snack, dinner
    for i in collection.find({"_id": today}):
        breakfast = [j.title() for j in i["breakfast"]]
        lunch = [j.title() for j in i["lunch"]]
        snack = [j.title() for j in i["snack"]]
        dinner = [j.title() for j in i["dinner"]]

    return render_template(
        "index.html", main=[breakfast[0], lunch[1], snack[0], dinner[0]]
    )


@app.route("/menu", methods=["GET"])
def getMenu():
    menu = str(request.get_data().lower())
    try:
        return jsonify(
            {"breakfast": breakfast, "lunch": lunch, "snack": snack, "dinner": dinner}
        )
    except Exception as e:
        return jsonify({"error": "Something Unexpected Happened"})


if __name__ == "__main__":
    app.run(debug=True)