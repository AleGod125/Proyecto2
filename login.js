function redirigir() {
    window.location.href = "singUp.html";
}

function processUserList(posts) {
    const postListElement = document.getElementById('post-list');
    postListElement.innerHTML = ''; 

    posts.forEach(function (post) {
        const listItem = document.createElement('li');
        listItem.textContent = post.Nombre;
        postListElement.appendChild(listItem);
    });
}

function fetchUserList() {
    axios.get('http://127.0.0.1:8000/getUser')
        .then(function (response) {
            processUserList(response.data);
        })
        .catch(function (error) {
            console.error('Error al obtener la lista de posts:', error);
        });
}

fetchUserList();

function login() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailValue = email.value;
    const passwordValue = password.value;

axios.post(`http://127.0.0.1:8000/login?email=${emailValue}&password=${passwordValue}`)
        .then(function (response) {
            console.log(response.data);
            if (response.data.message === 'Usuario Iniciado exitosamente') {
                getUserIDAndRedirect(emailValue, passwordValue);
            } else {
                handleLoginError();
            }
        })
        .catch(function (error) {
            console.error('Error al iniciar sesión:', error);
            handleLoginError();
        });
}

function getUserIDAndRedirect(email, password) {
    axios.get(`http://127.0.0.1:8000/getID`, {
            params: {
                email: email,
                password: password
            }
        })
        .then(function (response) {
            console.log(response.data);
            const userData = response.data[0];
            const id = userData.UserID;
            window.location.href = `profile.html?id=${id}`;
        })
        .catch(function (error) {
            console.error('Error al obtener el ID del usuario:', error);
        });
}

function handleLoginError() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    email.style.border = "2px solid red";
    password.style.border = "2px solid red";
    document.getElementById("error").style.display = "block";
}
