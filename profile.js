const banner = document.getElementById('myBanner');
banner.style.backgroundImage = "url('https://media.giphy.com/media/DEyAFp5KzCXte/giphy.gif')";

const fotoperfil = document.getElementById('fotoperfil');
fotoperfil.style.backgroundImage = "url('https://th.bing.com/th/id/R.4d5c667ef575a390211f2ab1a958cb46?rik=TAhnrKaqjWmOGA&pid=ImgRaw&r=0')";

const textinfo = document.getElementById('textinfo');

function barra() {
    const bar = document.getElementById('barra');
    const blockInfo = document.getElementById('blockInfo');
    const isHidden = bar.style.display === 'none' || bar.style.display === '';

    bar.style.display = isHidden ? 'block' : 'none';
    blockInfo.style.display = isHidden ? 'block' : 'none';
    textinfo.style.color = isHidden ? 'blue' : '';
}

function Eliminar() {
    const userId = new URLSearchParams(window.location.search).get('id');
    if (userId) {
        axios.delete(`http://127.0.0.1:8000/deleteUser?id=${userId}`)
            .then(response => {
                console.log(response.data);
                alert("Usuario eliminado exitosamente");
                window.location.href = "login.html";
            })
            .catch(error => {
                console.error('Error al eliminar el usuario:', error);
                showMessage('Error al eliminar el usuario.');
            });
    } else {
        showMessage('User ID not found.');
    }
}

function showMessage(message) {
    const messageElement = document.getElementById('Nombre');
    messageElement.textContent = message;
}

window.onload = function() {
    const userId = new URLSearchParams(window.location.search).get('id');
    if (userId) {
        axios.get(`http://127.0.0.1:8000/getUserInfo?id=${userId}`)
            .then(response => {
                console.log(response.data);
                if (response.data.length > 0) {
                    const userData = response.data[0];
                    document.getElementById('Nonmbre').textContent = userData.Nombre + " " + userData.Apellido;
                    document.getElementById('Nonmbre2').textContent = userData.Nombre + " " + userData.Apellido;
                    document.getElementById('Telefono').textContent = userData.PhoneNumber;
                    document.getElementById('COrreo').textContent = userData.Email;
                    document.getElementById('brd').textContent = userData.Brd;
                } else {
                    showMessage('Usuario no encontrado.');
                }
            })
            .catch(error => {
                console.error('Error al obtener la información del usuario:', error);
                showMessage('Error al obtener la información del usuario.');
            });
    } else {
        showMessage('User ID not found.');
    }
};
