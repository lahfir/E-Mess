import re


def check(email):

    result = email.find('.')

    if(result == 3):
        regex = r'[a-z]{3}.it@psgtech.ac.in'
        if(re.fullmatch(regex, email)):
            print("Valid Email")
        else:
            print("Invalid Email")

    else:
        regex = r'[18-22]{1}[a-z][0-9]{3}@psgtech.ac.in'
        if(re.fullmatch(regex, email)):
            print("Valid Email")
        else:
            print("Invalid Email")


email = input()

email = email.lower()

check(email)
