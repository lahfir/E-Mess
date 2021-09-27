from flask import Flask, render_template, jsonify, redirect, request, session
from flask_session import Session
import datetime
from pymongo import MongoClient


now = datetime.datetime.now()
today = now.strftime("%A").lower()

cluster = MongoClient(
    "mongodb+srv://emesspsgct:emesspsgct2021@e-messpsgct.4q1dp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
)
if cluster:
    print("Connected")

db = cluster["mess_db"]
collection = db["mess_schedule"]

for i in collection.find({"_id": today}):
    breakfast = [j.title() for j in i["breakfast"]]
    lunch = [j.title() for j in i["lunch"]]
    snack = [j.title() for j in i["snack"]]
    dinner = [j.title() for j in i["dinner"]]

print(breakfast, lunch, snack, dinner)