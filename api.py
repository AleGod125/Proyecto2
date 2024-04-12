import mysql.connector
from fastapi import FastAPI
from pydantic import BaseModel

mysql_confi = {
    'user' : 'root',
    'password' : '1234',
    'host' : 'localhost',
     'database' : 'python',
     'auth_plugin' : 'mysql_native_password'
}

Connection = mysql.connector(**mysql_confi)

def get_connection():
    return Connection

class UserApi(BaseModel):
    Email:str
    password:str