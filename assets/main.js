const mobileMenu = document.querySelector('.navbar-section-mobile');
const mobileMenuButton = document.querySelector('.button-mobile-menu');
const btnRegistrarUsuario = document.querySelector('#submit-registro');
const btnIngresarPerfil = document.querySelector('#submit-entrar');
const btnCerrarSesion = document.querySelector('#cerrar-sesion-profile');
const btnEnviarRelato = document.querySelector('#enviar-relato');
const contenedorRelatos = document.querySelector('.relatos-container');
const contenedorRelatoCompleto = document.querySelector('.relato-container');
const btnEscribirRelato = document.querySelector('#escribir-relato');
const rightNavbar = document.querySelector('.navbar-right');
const userNavbar = document.querySelector('.navbar-right-user');
const bottomNavbar = document.querySelector('.navbar-bottom');
const userBottomNavbar = document.querySelector('.navbar-bottom-profile');

const cardTemplate = `<div class="relato-preview-card">
<div class="relato-card-top">
    <img src="../assets/iconos/user.png" alt="" id="foto-perfil">
    <div class="titulo-user">
        <h2 class="titulo-relato">TITULO</h2>
        <h3 class="escito-por">ESCRITOR</h3>
    </div>
</div>

<div class="relato-card-bottom">
    <p class="contenido-relato">CONTENIDO...</p>
    <a href="relato_completo.html?idrelato=IDRELATO" id="leer-mas">leer más</a>
</div>
</div>`;

userNavbar.classList.remove('inactive');
rightNavbar.classList.remove('inactive');
bottomNavbar.classList.remove('inactive');
userBottomNavbar.classList.remove('inactive');

if (sessionStorage.getItem("correo") && sessionStorage.getItem("correo") != "") {
    console.log('logueado');
    rightNavbar.classList.add('inactive');
    bottomNavbar.classList.add('inactive');
    

} else {
    console.log('no')
    userNavbar.classList.add('inactive');
    userBottomNavbar.classList.add('inactive');
}

if (contenedorRelatoCompleto) {

    let url = new URL(window.location.href);
    let idrelato = url.searchParams.get("idrelato");

    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        let r = JSON.parse(this.responseText)[0];

        document.querySelector('.titulo').innerHTML=r.titulo_relato;
        document.querySelector('.autor').innerHTML=r.nombre_usuario;
        document.querySelector('.contenido-relato').innerHTML=r.contenido_relato;

    }
    });

    xhr.open("GET", "http://localhost/viernesxiii_webpage/api_viernesxiii/api.php?action=relatocompleto&idrelato="+idrelato);

    xhr.send(data);
}

if(contenedorRelatos) {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        let r = JSON.parse(this.responseText);
        for (let i = 0; i<r.length; i++) {
            contenedorRelatos.innerHTML += cardTemplate.replace("TITULO", r[i].titulo_relato).replace("ESCRITOR",r[i].nombre_usuario).replace("CONTENIDO",r[i].contenido_relato).replace("IDRELATO",r[i].id_relato);
        }
    }
    });

    xhr.open("GET", "http://localhost/viernesxiii_webpage/api_viernesxiii/api.php?action=listarelatos");

    xhr.send(data);
}

if (btnEnviarRelato) {
    btnEnviarRelato.addEventListener('click', enviarRelato);
}

if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', cerrarSesion);
} 

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
}

if (btnRegistrarUsuario) {
    btnRegistrarUsuario.addEventListener ('click', registrarUsuario);
}

if (btnIngresarPerfil) {
    btnIngresarPerfil.addEventListener('click', ingresarPerfil);
}

if (btnEscribirRelato) {
    btnEscribirRelato.addEventListener('click', crearRelato);
}

if (sessionStorage.getItem("nombreusuario") && sessionStorage.getItem("nombreusuario") != "" && document.querySelector('#nombre-profile')) {
    document.querySelector('#nombre-profile').innerHTML = sessionStorage.getItem("nombreusuario");
}

if (sessionStorage.getItem("correo") && sessionStorage.getItem("correo") != "" && document.querySelector('#email-profile')) {
    document.querySelector('#email-profile').innerHTML = sessionStorage.getItem("correo");
}

function toggleMobileMenu() {
    mobileMenu.classList.toggle('inactive');
    console.log("gjiugjhbgij");
}

function crearRelato() {
    console.log("correo: "+sessionStorage.getItem("correo")+(sessionStorage.getItem("correo") === null).toString());
    if (sessionStorage.getItem("correo") && sessionStorage.getItem("correo") != "" && sessionStorage.getItem("correo") !== null) {
        window.location.href = "escribir_relato.html";
    } else {
        window.location.href = "crear_cuenta.html"
    }
}

function ingresarPerfil() {
    const data = new FormData();
    data.append("correo", document.querySelector('#login-user').value);
    data.append("password", document.querySelector('#login-password').value);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
        if (this.responseText.includes('failed login')){
            document.querySelector('.mensaje').innerHTML="fallo en el ingreso";
        } else {
            let u = JSON.parse(this.responseText)[0];
            document.querySelector('.mensaje').innerHTML="ingreso exitoso";
            sessionStorage.setItem("usuarioid", u.id_usuario);
            sessionStorage.setItem("correo", u.correo_usuario);
            sessionStorage.setItem("nombreusuario", u.nombre_usuario);

            window.location.href = "profile.html";
        }
    }
    });

    xhr.open("POST", "http://localhost/viernesxiii_webpage/api_viernesxiii/api.php?action=loginusuario");

    xhr.send(data);
}

function registrarUsuario() {
    const data = new FormData();
    data.append("nombre", document.querySelector('#create-name').value);
    data.append("correo", document.querySelector('#create-email').value);
    data.append("password", document.querySelector('#create-password').value);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
        if(this.responseText.includes("registro exitoso")) {
            document.querySelector('#mensaje').innerHTML="Registro exitoso puedes ingresar en <a href='iniciar_sesion.html'>este enlace</a>";
            document.querySelector('#create-name').value="";
            document.querySelector('#create-email').value="";
            document.querySelector('#create-password').value="";
        } else {
            document.querySelector('#mensaje').innerHTML="fallo en el registro";
        }
    }
    });

    xhr.open("POST", "http://localhost/viernesxiii_webpage/api_viernesxiii/api.php?action=registrousuario");

    xhr.send(data);
}

function cerrarSesion() {
    sessionStorage.setItem("usuarioid", null);
    sessionStorage.setItem("correo", null);
    sessionStorage.setItem("nombreusuario", null);
    sessionStorage.clear();
    window.location.href = "iniciar_sesion.html";
}


function enviarRelato() {
    const data = new FormData();
    console.log("idusuarui:"+ sessionStorage.getItem("usuarioid"));
    data.append("idusuario", sessionStorage.getItem("usuarioid"));
    data.append("titulo", document.querySelector('#titulo-relato').value);
    data.append("contenido", document.querySelector('#contenido-relato').value);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
        if(this.responseText.includes("registro exitoso")) {
            document.querySelector('.mensaje').innerHTML="Relato enviado con exito";
            document.querySelector('#titulo-relato').value="";
            document.querySelector('#contenido-relato').value="";
        } else {
            document.querySelector('.mensaje').innerHTML="ocurrió un error"
        }
    }
    });

    xhr.open("POST", "http://localhost/viernesxiii_webpage/api_viernesxiii/api.php?action=registrorelato");

    xhr.send(data);
}

