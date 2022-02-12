function showHideNavBar(){
    const tipoUsuario = JSON.parse(sessionStorage.getItem('user')).rol    
    if(tipoUsuario == 'invitado') document.querySelector('.nav-usuarios').style.display = 'none'
}

function cargarEventos(){
    const { usuario, rol } = JSON.parse(sessionStorage.getItem('user'));    
    document.querySelector(".user-name").innerHTML = `${usuario} | ${rol}`

    showHideNavBar();

    const btnCerrarSesion = document.querySelector(".btnCerrarSesion");
    btnCerrarSesion.addEventListener("click", () => {
        window.location.href = `${dominio}`
        sessionStorage.clear();
    })
}

function chequearSesion(){
    const user = sessionStorage.getItem('user')
    if(user){
        fetch('./template/navbar.html')
        .then(res => res.text())
        .then(navbar =>{
            document.querySelector('.navegacion').innerHTML = navbar;
                    
            cargarEventos();
        })
    
    }else{
        window.location.href = `${dominio}/`
    }
}