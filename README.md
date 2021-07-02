# kitelogin
# This branch is implements a way to update access token from kite zerodha login and update it on Firebase to deploy the same on local machine please follow below the steps
- Step 1 : Install Docker and docker-compose 
- Step 2 : Git Clone the repo branch with the following URL : https://github.com/Sabertoothtech/Stock_react_app_mohit/tree/kite_access_token
- Step 3 : Open the Cloned Folder in Command Prompt or Shell
- Step 4 : type docker-compose up -d in the terminal/shell
- Step 5 : This will deploy the Kite login container which comprises of reddis, celery Task scheduler and the will update the token on firebase repectively

