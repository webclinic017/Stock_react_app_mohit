import os
import time
import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import urllib.parse as urlparse
from selenium.webdriver.chrome.options import Options
from kiteconnect import KiteConnect
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By

import os
import pyrebase

api_key='0yvny102khsjlnpr'
api_seceret='0zp3tp2bhxzamg8ph4q2s1ys7l5paunv'
accountUserName = "ZB8746"
accountPassword = "@KKR357"
securityPin = "050991"

kite=KiteConnect(api_key,api_seceret)

config = {
    "apiKey": "AIzaSyCU9JP2yixeKjw3NE30Pb0I0D0UQjV94gA",
    "authDomain": "kiteconnect-stock.firebaseapp.com",
    "databaseURL": "https://kiteconnect-stock-default-rtdb.firebaseio.com",
    "projectId": "kiteconnect-stock",
    "storageBucket": "kiteconnect-stock.appspot.com",
    "messagingSenderId": "981866107803",
    "appId": "1:981866107803:web:568ffc6b464656a6f4c73e",
    "measurementId": "G-9BRWTZYS5C"
}

firebase = pyrebase.initialize_app(config)

database = firebase.database()


class KiteConnectScraper():

    def __init__(self, *args, **kwargs):
        self.url = kite.login_url()

    def open_driver(self, url):
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--no-sandbox')
        browser = webdriver.Remote("http://selenium:4444/wd/hub", options=chrome_options)
        browser.get(url)
        time.sleep(5)
        return browser

    def get_token(self, **kwargs):
        print("--Started--")
        link = kite.login_url()
        browser=self.open_driver(link)

        print("--Running--")
        wait = WebDriverWait(browser, 10)
        wait.until(EC.presence_of_element_located((By.XPATH, '//input[@type="text"]')))\
                        .send_keys(accountUserName)

        wait.until(EC.presence_of_element_located((By.XPATH, '//input[@type="password"]')))\
            .send_keys(accountPassword)

        wait.until(EC.element_to_be_clickable((By.XPATH, '//button[@type="submit"]')))\
            .submit()

        wait.until(EC.presence_of_element_located((By.XPATH, '//input[@type="password"]'))).click()
        time.sleep(5)
        browser.find_element_by_xpath('//input[@type="password"]').send_keys(securityPin)

        wait.until(EC.element_to_be_clickable((By.XPATH, '//button[@type="submit"]'))).submit()
        wait.until(EC.url_contains('status=success'))

        tokenurl = browser.current_url
        parsed = urlparse.urlparse(tokenurl)
        request_token=urlparse.parse_qs(parsed.query)['request_token'][0]
        print("--Closed--")
        browser.close()

        data = kite.generate_session(request_token, api_secret=api_seceret)
        access_token = data["access_token"]
        kite.set_access_token(access_token)

        last_updated = datetime.datetime.now()
        database.update({"last_updated": str(last_updated)})
        database.update({"access_token": access_token})

        return access_token
