const contenedor = document.getElementById('Contenedor');
const nombreInput = document.getElementById('Nombre');
const apellidoInput = document.getElementById('Apellido');
const phoneNumberInput = document.getElementById('PhoneNumber');
const emailInput = document.getElementById('email');
const contraseñaInput = document.getElementById('Contraseña');
const cContraseñaInput = document.getElementById('CContraseña');
const brdInput = document.getElementById('Brd');
const errorC = document.getElementById("errorC");
const errorT = document.getElementById("errorT");

function showError(input, message, errorElement) {
    input.style.border = "2px solid red";
    errorElement.style.display = "block";
    errorElement.textContent = message;
}

function resetFieldStyles() {
    const inputs = [nombreInput, apellidoInput, phoneNumberInput, emailInput, contraseñaInput, cContraseñaInput, brdInput];
    inputs.forEach(input => input.style.border = "");
    errorC.style.display = "none";
    errorT.style.display = "none";
}

function validateFields() {
    if (contraseñaInput.value !== cContraseñaInput.value) {
        showError(contraseñaInput, "Por favor verifique que la Contraseña sean iguales", errorC);
        showError(cContraseñaInput, "Por favor verifique que la Contraseña sean iguales", errorC);
        return false;
    }
    return true;
}

contenedor.addEventListener('submit', function(event) {
    event.preventDefault(); 
    resetFieldStyles(); 

    if (!validateFields()) {
        return; 
    }

    const postData = {
        Nombre: nombreInput.value,
        Apellido: apellidoInput.value,
        PhoneNumber: phoneNumberInput.value,
        Email: emailInput.value,
        Password: contraseñaInput.value,
        Brd: brdInput.value
    };

    axios.post('http://127.0.0.1:8000/createUser', postData)
        .then(function(response) {
            console.log(response.data);
            alert('Nuevo usuario creado exitosamente');
            window.location.href = "login.html";
        })
        .catch(function(error) {
            console.error('Error al crear el nuevo usuario:', error);
            if (error.response) {
                if (error.response.status === 422) {
                    showError(nombreInput, "", errorT);
                    showError(apellidoInput, "", errorT);
                    showError(phoneNumberInput, "", errorT);
                    showError(emailInput, "", errorT);
                    showError(contraseñaInput, "", errorT);
                    showError(cContraseñaInput, "", errorT);
                    showError(brdInput, "Por favor verifique llenar todos los campos correctamente", errorT);
                } else if (error.response.status === 400) {
                    if (error.response.data.detail === 'El usuario ya existe') {
                        showError(emailInput, "El email ya fue registrado anteriormente, use uno nuevo", errorT);
                    } else if (error.response.data.detail === 'La contraseña debe tener más de 6 caracteres') {
                        showError(contraseñaInput, "La contraseña debe tener más de 6 caracteres", errorC);
                        showError(cContraseñaInput, "La contraseña debe tener más de 6 caracteres", errorC);
                    }
                } else {
                    alert('Ocurrió un error al procesar su solicitud.');
                }
            } else {
                alert('Ocurrió un error al procesar su solicitud.');
            }
        });
});
