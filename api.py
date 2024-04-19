import mysql.connector
from fastapi import FastAPI , HTTPException
from pydantic import BaseModel

mysql_confi = {
    'user' : 'root',
    'password' : '1234',
    'host' : 'localhost',
    'database' : 'python',
    'auth_plugin' : 'mysql_native_password'
}

Connection = mysql.connector.connect(**mysql_confi)

def get_connection():
    return Connection

class UserApi(BaseModel):
    Email:str
    Password:str

app = FastAPI()


@app.get('/u')
async def get_User():
    cursor = Connection.cursor(dictionary=True)
    query = "SELECT * FROM usersapi"

    try:
        cursor.execute(query)
        return cursor.fetchall()
        return {'message' : 'se obtuvo los usuarios exitosamente'}
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener los usuarios {e}")

@app.post('/u')
async def create_users(userapi: UserApi):
    cursor = Connection.cursor()

    query = "INSERT INTO  usersapi (email, password) Value (%s , %s )"
    value = (userapi.Email, userapi.Password)


    try:
        cursor.execute("SELECT COUNT(*) FROM usersapi WHERE email = %s", (userapi.Email,))
        result = cursor.fetchone()
        cursor.execute(query,value)
        Connection.commit()
        return {'message' : 'Usuario se ha resgritrado Exitosamente'}
    except ValueError as e:
        raise HTTPException(status_code=403, detail=f"Error de campos {e}")
    except len(userapi.Password) <= 6:
        raise HTTPException(status_code=400, detail="La contraseña debe tener más de 6 caracteres")
    except result[0] > 0:
        raise HTTPException(status_code=400, detail="Ya existe un usuario con este correo electrónico")
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error a resgistrar el Usuario {e}")
    finally:
        cursor.close()

@app.put('/u/{email_user}')
async def update_user(userapi: UserApi, email_user: str):
    cursor = Connection.cursor()

    try:
        cursor.execute("SELECT COUNT(*) FROM usersapi WHERE email = %s", (userapi.Email,))
        result = cursor.fetchone()

        cursor.execute(
            "UPDATE usersapi SET email = %s, password = %s WHERE email = %s",(userapi.Email, userapi.Password, email_user)
            )
        Connection.commit()
        return {'message' : 'Los datos del Usuario se Han actualizado exitosamente'}
    except ValueError as e:
        raise HTTPException(status_code=403, detail=f"Error de campos {e}")
    except result[0] > 0:
        raise HTTPException(status_code=400, detail="Ya existe un usuario con este correo electrónico")
    except result[0] == 0:
        raise HTTPException(status_code=400, detail="El Usuario no existe ")
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error al actulizar el asuario {e}")
    finally:
        cursor.close()


@app.delete('/u/{email_user}')
async def delete_users(userapi: UserApi, email_user: str):
    cursor = Connection.cursor()

    try:
        cursor.execute("SELECT COUNT(*) FROM usersapi WHERE email = %s", (userapi.Email,))
        result = cursor.fetchone()

        cursor.execute("DELETE FROM usersapi WHERE email = %s", (email_user,))
        Connection.commit()
        return {'message' : 'El usuario ha sido eliminado exitosamente'}
   
    except result[0] == 0:
        raise HTTPException(status_code=400, detail="El Usuario no existe ")
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Error al actulizar el asuario {e}")
    finally:
        cursor.close()


