from os import error
from flask import (
    Flask,
    json,
    render_template,
    url_for,
    jsonify,
    redirect,
    request,
    session,
)
from flask_session import Session
import datetime
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import ssl, uuid, re, datetime


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

    regex = r"[1-2][1-9][a-z][0-9]{3}@psgtech.ac.in"
    if re.fullmatch(regex, email):
        return True
    else:
        return False


def check_roll(roll):
    roll = roll.lower()

    # if result == 3:
    #     regex = r"[a-z]{3}.it@psgtech.ac.in"
    #     if re.fullmatch(regex, email):
    #         return True
    #     else:
    #         return False

    # else:

    regex = r"[1-2][1-9][a-z][0-9]{3}"
    if re.fullmatch(regex, roll):
        return True
    else:
        return False


now = datetime.datetime.now()
today = now.strftime("%A").lower()


app = Flask(__name__)
app.secret_key = b"Z\xba)\xe62\xa5`\xda\xb3p+N,A|^"
app.permanent_session_lifetime = datetime.timedelta(days=21)

cluster = MongoClient(
    "mongodb+srv://emesspsgct:emesspsgct2021@e-messpsgct.4q1dp.mongodb.net/myFirstDatabase?ssl=true&ssl_cert_reqs=CERT_NONE"
)
if cluster:
    print("Connected")

breakfast, lunch, snack, dinner, chicken, gobi, egg = (
    [],
    [],
    [],
    [],
    False,
    False,
    False,
)


@app.route("/")
def index():
    db = cluster["mess_db"]
    collection = db["mess_schedule"]
    global breakfast, lunch, snack, dinner, chicken, gobi, egg

    for i in collection.find({"_id": today}):
        breakfast = [j.title() for j in i["breakfast"]]
        lunch = [j.title() for j in i["lunch"]]
        snack = [j.title() for j in i["snack"]]
        dinner = [j.title() for j in i["dinner"]]
        chicken = i["chicken"]
        egg = i["egg"]
        gobi = i["gobi"]

    if not session.get("user"):
        return render_template(
            "index.html", main=[breakfast[0], lunch[1], snack[0], dinner[0]], user=""
        )

    user = session.get("user")
    collection = db["users"]
    user = collection.find({"email": user})
    for x in user:
        user = x["name"]

    return render_template(
        "index.html",
        main=[breakfast[0], lunch[1], snack[0], dinner[0]],
        user=user,
    )


@app.route("/home")
def home():
    db = cluster["mess_db"]
    collection = db["mess_schedule"]
    global breakfast, lunch, snack, dinner, chicken, gobi, egg

    for i in collection.find({"_id": today}):
        breakfast = [j.title() for j in i["breakfast"]]
        lunch = [j.title() for j in i["lunch"]]
        snack = [j.title() for j in i["snack"]]
        dinner = [j.title() for j in i["dinner"]]
        chicken = i["chicken"]
        egg = i["egg"]
        gobi = i["gobi"]

    collection = db["mess_details"]
    status = False

    for x in collection.find({"type": "status"}):
        status = x["mess_status"]

    if not session.get("user"):
        return render_template(
            "index.html",
            main=[breakfast[0], lunch[1], snack[0], dinner[0]],
            user="",
        )

    user = session.get("user")
    collection = db["users"]
    user = collection.find_one({"email": user})

    return jsonify({"user": True, "status": status})


@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect("/")


@app.route("/register", methods=["POST", "GET"])
def register():

    roll_no = str(request.form.get("rollno-input")).lower()
    email = str(request.form.get("email-input")).lower()

    if email_check(email):
        if check_roll(roll_no):
            if roll_no == email.split("@")[0]:
                db = cluster["mess_db"]
                collection = db["users"]

                if collection.find_one({"email": email}):
                    return (
                        jsonify({"message": "User already registered"}),
                        500,
                    )
                elif collection.find_one({"roll-no": roll_no}):
                    return (
                        jsonify({"message": "User already registered"}),
                        500,
                    )
                else:
                    user = {
                        "_id": uuid.uuid4().hex,
                        "email": email,
                        "name": str(request.form.get("name-input")).title(),
                        "roll-no": roll_no,
                        "room-no": request.form.get("room-no-input"),
                        "department": request.form.get("department"),
                        "hostel": request.form.get("hostel-category"),
                        "password": generate_password_hash(
                            request.form.get("password-input"), method="sha256"
                        ),
                        "date": datetime.datetime.now().strftime("%Y-%m-%d"),
                    }

                    collection.insert_one(user)
                    session.permanent = True
                    session["user"] = user["email"]
                    return redirect("/")
            else:
                return (
                    jsonify({"message": "Roll Number and Email Doesn't Match"}),
                    500,
                )
        else:
            return (
                jsonify({"message": "Invalid roll number"}),
                500,
            )
    else:
        return (
            jsonify({"message": "Invalid email id"}),
            500,
        )


@app.route("/login", methods=["POST", "GET"])
def login():

    db = cluster["mess_db"]
    collection = db["users"]

    if request.method == "POST":
        print("Hello")
        email = str(request.form.get("l-email-input").lower())
        password = str(request.form.get("l-password-input").lower())
        if email_check(email):
            session.permanent = True

            if collection.find_one({"email": email}):
                for i in collection.find({"email": email}):
                    if check_password_hash(i["password"], password):
                        session["user"] = i["email"]
                        return redirect("/")
                    else:
                        return (
                            jsonify({"message": "Invalid password"}),
                            500,
                        )
            else:
                return (
                    jsonify({"message": "No such registered E-Mail. Try registering"}),
                    500,
                )
            return redirect(url_for("/"))
        else:
            return (
                jsonify({"message": "Invalid email id"}),
                500,
            )
    else:
        return render_template("login.html")


@app.route("/menu", methods=["GET"])
def getMenu():
    menu = str(request.get_data().lower())
    try:
        return jsonify(
            {
                "breakfast": breakfast,
                "lunch": lunch,
                "snack": snack,
                "dinner": dinner,
                "chicken": chicken,
                "egg": egg,
                "gobi": gobi,
            }
        )
    except Exception as e:
        return jsonify({"error": "Something Unexpected Happened"})


@app.route("/schedule", methods=["GET"])
def getSchedule():
    try:
        db = cluster["mess_db"]
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
        db = cluster["mess_db"]
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
