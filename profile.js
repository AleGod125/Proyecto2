const banner = document.getElementById('myBanner');
banner.style.backgroundImage = "url('https://media.giphy.com/media/DEyAFp5KzCXte/giphy.gif')";
const fotoperfil = document.getElementById('fotoperfil');
fotoperfil.style.backgroundImage = "url('https://th.bing.com/th/id/R.4d5c667ef575a390211f2ab1a958cb46?rik=TAhnrKaqjWmOGA&pid=ImgRaw&r=0')";

const textinfo = document.getElementById('textinfo');

function barra(){
    const bar = document.getElementById('barra');
    const blockInfo = document.getElementById('blockInfo');

            if (bar.style.display === 'none' || bar.style.display === '') {
                bar.style.display = 'block';
                blockInfo.style.display = 'block';
                textinfo.style.color = 'blue'
            } else {
                bar.style.display = 'none';
                blockInfo.style.display = 'none';

                textinfo.style.color = ''

            }
}


window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    if (userId) {
        axios.get(`http://127.0.0.1:8000/getUserInfo?id=${userId}`)
            .then(function (response) {
                console.log(response.data);
                if (response.data.length > 0) {  // Asegúrate de que haya datos
                    const userData = response.data[0];
                    document.getElementById('Nonmbre').textContent = userData.Nombre + " " + userData.Apellido;
                    document.getElementById('Nonmbre2').textContent = userData.Nombre + " " + userData.Apellido;
                    document.getElementById('Telefono').textContent = userData.PhoneNumber;
                    document.getElementById('COrreo').textContent = userData.Email;
                    document.getElementById('brd').textContent = userData.Brd;




                } else {
                    document.getElementById('Nombre').textContent = 'Usuario no encontrado.';
                }
            })
            .catch(function (error) {
                console.error('Error al obtener el ID del usuario:', error);
                document.getElementById('Nombre').textContent = 'Error al obtener la información del usuario.';
            });
    } else {
        document.getElementById('Nombre').textContent = 'User ID not found.';
    }
};
