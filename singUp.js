const Contenedor = document.getElementById('Contenedor'); 

Contenedor.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const Nombre = document.getElementById('Nombre').value;
    const Apellido = document.getElementById('Apellido').value;
    const PhoneNumber = document.getElementById('PhoneNumber').value;
    const email = document.getElementById('email').value;
    const Contraseña = document.getElementById('Contraseña').value;

    const postData = {
        Nombre: Nombre, 
        Apellido: Apellido,
        PhoneNumber: PhoneNumber,
        Email: email,
        Password: Contraseña 
    };

    axios.post('http://127.0.0.1:8000/createUser', postData) 
        .then(function (response) {
            console.log(response.data)
            alert('Nuevo usuario creado exitosamente');
        })
        .catch(function (error) {
            console.error('Error al crear el nuevo usuario:', error);
        });
});