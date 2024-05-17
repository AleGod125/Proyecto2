function redirigir() {
    window.location.href = "singUp.html";
  }

  axios.get('http://127.0.0.1:8000/getUser')
            .then(function (response) {
                const posts = response.data;
                const postListElement = document.getElementById('post-list');

                posts.forEach(function (post) {
                    const listItem = document.createElement('li');
                    listItem.textContent = post.Nombre;
                    postListElement.appendChild(listItem);
                });
            })
            .catch(function (error) {
                console.error('Error al obtener la lista de posts:', error);
            });

            function login() {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
            
                axios.post(`http://127.0.0.1:8000/login?email=${email}&password=${password}`)
                    .then(function (response) {
                        console.log(response.data);
                        if (response.data.message === 'Usuario Iniciado exitosamente') {
                            axios.get(`http://127.0.0.1:8000/getID?email=${email}&password=${password}`)
                                .then(function (response) {
                                    console.log(response.data);
                                    const userData = response.data[0];
                                    const id = userData.UserID
                                    window.location.href = `profile.html?id=${id}`;
                                })
                                .catch(function (error) {
                                    console.error('Error al obtener el ID del usuario:', error);
                                });
                        } else {
                            alert('Credenciales inválidas');
                        }
                    })
                    .catch(function (error) {
                        console.error('Error al iniciar sesión:', error);
                        alert('Credenciales inválidas');
                    });
            }    