const formLogin = document.querySelector("#formLogin");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");
const toastLiveExample = document.getElementById('liveToast')

formLogin.addEventListener('submit', function(e){
    e.preventDefault();    

    fetch('/user')
        .then(data => data.json())
        .then(usuarios => {
            const resultado = usuarios.find( usuario => usuario.email == inputEmail.value);
            if(!resultado){
                return Toast.fire({
                    icon: 'error',
                    title: 'Error, este usuario no existe'
                })
            }

            if(resultado.password != btoa(inputPassword.value)){
                return Toast.fire({
                    icon: 'warning',
                    title: 'La contraseña esta incorrecta'
                })
            }            
            sessionStorage.setItem('user', JSON.stringify(resultado));
            window.location.href = `${dominio}/pages/inicio.html`
        })
})