from flask import Flask, render_template, jsonify, redirect, request, session
from flask_session import Session
import datetime, os
from pymongo import MongoClient


now = datetime.datetime.now()
today = now.strftime("%A").lower()
schedule = {}

cluster = MongoClient(
    "mongodb+srv://emesspsgct:emesspsgct2021@e-messpsgct.4q1dp.mongodb.net/myFirstDatabase?ssl=true&ssl_cert_reqs=CERT_NONE"
)
if cluster:
    print("Connected")

db = cluster["mess_db"]
# collection = db["mess_schedule"]
# for j in ["monday", "tuesday", "wednesday", "thursday", "saturday", "sunday"]:
#     for i in collection.find({"_id": j}):
#         schedule[j] = {
#             "breakfast": i.get("breakfast"),
#             "lunch": i.get("lunch"),
#             "snack": i.get("snack"),
#             "dinner": i.get("dinner"),
#         }

# for i in schedule:
#     for j in schedule[i]:
#         for k in range(len(schedule[i][j])):
#             print(schedule[i][j][k])

# from werkzeug.security import generate_password_hash, check_password_hash

# hashed = generate_password_hash("lahfir", method="sha256")
# print(check_password_hash(hashed, input("Enter PD")))

# print(os.urandom(16))
