import pymysql.cursors
from flask import Flask, jsonify, request

app = Flask(__name__)

def conectdb():
  connection = pymysql.connect(host='localhost',
                                user='root',
                                password='1234',
                                database='python',
                                cursorclass=pymysql.cursors.DictCursor)
  return connection

#crea
@app.route('/usuarios', methods=["POST"])  
def create():

    data = request.get_json()
    connection = conectdb()

    with connection:
        with connection.cursor() as cursor:

            sql = "INSERT INTO users (email, password) VALUES (%s, %s)"
            cursor.execute(sql, (data['email'], data['password']))

        connection.commit()

    return jsonify({
        'message': 'Creacion exitosa'
    }), 201

#elimina
@app.route('/usuarios/<int:id>', methods=['DELETE'])  
def delete(id):

    connection = conectdb()  
    with connection:
       with connection.cursor() as cursor:
           sql = "DELETE FROM users WHERE id = %s" 
           cursor.execute(sql, (id,))  
           connection.commit()  

    return jsonify({'message': 'Eliminacion exitosa'}), 204  

#actualiza
@app.route('/usuarios/<int:id>', methods=['PUT'])
def update(id):

    data = request.get_json()
    connection = conectdb()

    with connection:
        with connection.cursor() as cursor:
            sql = "UPDATE users SET email = %s, password = %s WHERE id = %s"
            cursor.execute(sql, (data['email'], data['password'], id))
            connection.commit()

    return jsonify({'message': 'Actualizacion exitosa'}), 200

#muestra
@app.route('/usuarios', methods=['GET'])
def list():

    connection = conectdb()

    with connection.cursor() as cursor:

        sql = 'SELECT id, email, password FROM users'
        cursor.execute(sql)

        result = cursor.fetchall()

        return jsonify({

            'data': result
        }), 200


if __name__ == '__main__':
    app.run(debug=True)
