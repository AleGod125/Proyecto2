function redirigir() {
    window.location.href = "singUp.html";
  }

  axios.get('http://127.0.0.1:8000/getUser')
            .then(function (response) {
                // Manejar la respuesta
                const posts = response.data;
                const postListElement = document.getElementById('post-list');

                // Recorrer los posts y agregarlos a la lista en el HTML
                posts.forEach(function (post) {
                    const listItem = document.createElement('li');
                    listItem.textContent = post.Nombre;
                    postListElement.appendChild(listItem);
                });
            })
            .catch(function (error) {
                // Manejar errores
                console.error('Error al obtener la lista de posts:', error);
            });