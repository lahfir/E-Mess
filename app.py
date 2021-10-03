from os import error
from flask import Flask, render_template, url_for, jsonify, redirect, request, session
from flask_session import Session
import datetime
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import ssl, uuid, re


def email_check(email):
    email = email.lower()
    result = email.find(".")

    # if result == 3:
    #     regex = r"[a-z]{3}.it@psgtech.ac.in"
    #     if re.fullmatch(regex, email):
    #         return True
    #     else:
    #         return False

    # else:

    regex = r"[18-22]{1}[a-z][0-9]{3}@psgtech.ac.in"
    if re.fullmatch(regex, email):
        return True
    else:
        return False


now = datetime.datetime.now()
today = now.strftime("%A").lower()


app = Flask(__name__)

cluster = MongoClient(
    "mongodb+srv://emesspsgct:emesspsgct2021@e-messpsgct.4q1dp.mongodb.net/myFirstDatabase?ssl=true&ssl_cert_reqs=CERT_NONE"
)
if cluster:
    print("Connected")

db = cluster["mess_db"]

breakfast, lunch, snack, dinner = [], [], [], []


@app.route("/")
def index():
    collection = db["mess_schedule"]
    global breakfast, lunch, snack, dinner
    for i in collection.find({"_id": today}):
        breakfast = [j.title() for j in i["breakfast"]]
        lunch = [j.title() for j in i["lunch"]]
        snack = [j.title() for j in i["snack"]]
        dinner = [j.title() for j in i["dinner"]]

    return render_template(
        "index.html", main=[breakfast[0], lunch[1], snack[0], dinner[0]]
    )


@app.route("/register", methods=["POST", "GET"])
def login():
    if email_check(str(request.form.get("email-input"))):
        user = {
            "_id": uuid.uuid4().hex,
            "email": request.form.get("email-input"),
            "name": request.form.get("name-input"),
            "roll-no": request.form.get("rollno-input"),
            "room-no": request.form.get("room-no-input"),
            "department": request.form.get("department"),
            "hostel": request.form.get("hostel-category"),
            "password": generate_password_hash(
                request.form.get("password-input"), method="sha256"
            ),
        }
    else:
        return (
            jsonify(
                {
                    "success": "false",
                    "error": {"type": "E-Mail", "message": "Invalid email address"},
                }
            ),
            500,
        )

    return render_template("login.html")


@app.route("/login", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        user = request.form["email"]
        return redirect(url_for("user", usr=user))
    else:
        return render_template("login.html")


@app.route("/user", methods=["GET", "POST"])
def user(usr):
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


@app.route("/schedule", methods=["GET"])
def getSchedule():
    try:
        collection = db["mess_schedule"]
        schedule = {}
        for j in [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ]:
            for i in collection.find({"_id": j}):
                schedule[j] = {
                    "breakfast": i.get("breakfast"),
                    "lunch": i.get("lunch"),
                    "snack": i.get("snack"),
                    "dinner": i.get("dinner"),
                }
        return jsonify({"schedule": schedule})
    except Exception as e:
        return jsonify({"error": "Something Unexpected Happened"})


@app.route("/timings", methods=["GET"])
def getTimings():
    morning, afternoon, evening, night = [], [], [], []
    try:
        collection = db["mess_timings"]
        for i in collection.find({"_id": "timings"}):
            morning = i["morning"]
            afternoon = i["afternoon"]
            evening = i["evening"]
            night = i["night"]

        return jsonify(
            {
                "morning": morning,
                "afternoon": afternoon,
                "evening": evening,
                "night": night,
            }
        )
    except Exception as e:
        return jsonify({"error": "Something Unexpected Happened"})


if __name__ == "__main__":
    app.run(debug=True)
