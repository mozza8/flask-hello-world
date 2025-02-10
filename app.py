from flask import Flask, request, render_template_string
from flask_cors import CORS
import requests
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
CORS(app)
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import threading
import time

@app.route("/")
def hello_world():
    return render_template_string(open("login.html").read())

@app.route('/submit', methods=['POST'])
def submit_form():
    # Get form data and store in variables
    username = request.form['username']
    password: str = request.form['password']
    #schedule_function(username, password, interval=7200, repetitions=5)
    sendPickup(username, password)

def get_drvier():
  # Set options to make browsing easier
  options = webdriver.ChromeOptions()
  options.add_argument("disable-infobars")
  options.add_argument("start-maximized")
  options.add_argument("disable-dev-shm-usage")
  options.add_argument("no-sandbox")
  options.add_experimental_option("excludeSwitches", ["enable-automation"])
  options.add_argument("disable-blink-features=AutomationControlled")

  driver = webdriver.Chrome(options=options)
  driver.get("https://www.buzzerbeater.com/default.aspx?lang=sl-SI")
  return driver

def sendPickup(username, password):
  driver = get_drvier()
  driver.find_element(by="xpath", value="/html/body/form/div[3]/header/div/div/div[2]/div/div[1]/a").click()
  time.sleep(2)
  driver.find_element(by="id", value="txtLoginUserName").send_keys(username)
  time.sleep(2)
  driver.find_element(by="id", value="txtLoginPassword").send_keys(password + Keys.RETURN)
  time.sleep(5)
  driver.find_element(by="id", value="menuSearch").click()
  time.sleep(2)
  driver.find_element(by="id", value="cphContent_tbTeamname").send_keys('visokoleteči asi' + Keys.RETURN)
  time.sleep(3)
  driver.find_element(by="id", value="cphContent_teamResults_rptResults_linkResults_0").click()
  time.sleep(3)
  driver.find_element(by="id", value="cphContent_btnPickup").click()
  time.sleep(3)
  driver.find_element(by="id", value="btnLogout").click()

def acceptPickup(username, password):
  driver = get_drvier()
  driver.find_element(by="xpath", value="/html/body/form/div[3]/header/div/div/div[2]/div/div[1]/a").click()
  time.sleep(2)
  driver.find_element(by="id", value="txtLoginUserName").send_keys('moza8')
  time.sleep(2)
  driver.find_element(by="id", value="txtLoginPassword").send_keys('deeppurple8' + Keys.RETURN)
  time.sleep(5)
  driver.find_element(by="id", value="menuScrimmages").click()
  time.sleep(2)
  driver.find_element(by="id", value="cphContent_tbTeamname").send_keys('visokoleteči asi' + Keys.RETURN)
  time.sleep(3)
  driver.find_element(by="id", value="cphContent_teamResults_rptResults_linkResults_0").click()
  time.sleep(3)
  driver.find_element(by="id", value="cphContent_btnPickup").click()
  time.sleep(3)
  driver.find_element(by="id", value="btnLogout").click()

def schedule_function(username, password,interval, repetitions):
  count = 0

  def task():
    nonlocal count
    if count < repetitions:
      sendPickup(username, password)
      count += 1
      threading.Timer(interval, task).start()

  task()
