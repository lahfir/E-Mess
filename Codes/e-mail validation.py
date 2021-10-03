import re


def check(email):
    email = email.lower()
    result = email.find(".")

    if result == 3:
        regex = r"[a-z]{3}.it@psgtech.ac.in"
        if re.fullmatch(regex, email):
            print("Valid Email")
        else:
            print("Invalid Email")

    else:
        regex = r"[1-2][1-9][a-z][0-9]{3}@psgtech.ac.in"
        if re.fullmatch(regex, email):
            print("Valid Email")
        else:
            print("Invalid Email")


check("19i234@psgtech.ac.in")