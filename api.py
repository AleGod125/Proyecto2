import mysql.connector
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

mysql_config = {
    'user': 'root',
    'password': '1234',
    'host': 'localhost',
    'database': 'python',
    'auth_plugin': 'mysql_native_password'
}

Connection = mysql.connector.connect(**mysql_config)

def get_connection():
    return Connection

class UserApi(BaseModel):
    Nombre: str
    Apellido: str  
    PhoneNumber: int
    Email: str
    Password: str

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

def usuario_existe(email):
    cursor = Connection.cursor()
    query = "SELECT COUNT(*) FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    result = cursor.fetchone()[0]
    cursor.close()
    return result > 0

@app.get('/getUser')
async def get_User():
    cursor = Connection.cursor(dictionary=True)
    query = "SELECT * FROM users"

    try:
        cursor.execute(query)
        return cursor.fetchall()
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener los usuarios {e}")
    finally:
        cursor.close()

@app.post('/createUser')
async def create_user(user: UserApi):
    if usuario_existe(user.Email):
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    
    if len(user.Password) <= 6:
        raise HTTPException(status_code=400, detail="La contraseña debe tener más de 6 caracteres")
    
    try:
        cursor = Connection.cursor()
        query = "INSERT INTO users (nombre, apellido, PhoneNumber, email, password) VALUES (%s, %s, %s, %s, %s)"
        values = (user.Nombre, user.Apellido, user.PhoneNumber, user.Email, user.Password)
        cursor.execute(query, values)
        Connection.commit()

        user_id = cursor.lastrowid

        return {'message': 'Usuario registrado exitosamente', 'user_id': user_id}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Error al registrar el usuario ({err})")
    finally:
        cursor.close()
        
@app.post('/login')
async def login_user(email: str, password: str):
    cursor = Connection.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE Email = %s AND Password = %s"
    cursor.execute(query, (email, password))
    user = cursor.fetchone()
    cursor.close()

    if user:
        return {'message': 'Inicio de sesión exitoso'}
    else:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
