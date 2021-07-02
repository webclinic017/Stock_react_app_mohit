from celery.decorators import task
from .kite_token import KiteConnectScraper

@task
def get_token_task():
    print("---Getting Access Token---")
    kite = KiteConnectScraper()
    access_token = kite.get_token()
    print("access_token : ",access_token)
