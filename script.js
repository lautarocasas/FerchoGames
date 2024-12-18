import { Carrito,actualizarHTMLCarrito,importarListadoJSON } from "./moduloCompra.js";

localStorage.setItem("user:admin","admin");

importarListadoJSON('./listadoVideojuegos.json').
    then(listaObjetosVideojuegos=>{
        listaObjetosVideojuegos.forEach((elem)=>{
            contenedorVideojuegos.appendChild(elem.generarDiv(carrito))
        })
    });


let carritoGuardado = JSON.parse(sessionStorage.getItem('carrito'));

let carrito;
if (carritoGuardado) {
    carrito = Carrito.fromJSON(carritoGuardado);
} else {
    carrito = new Carrito();
}

let contenedorVideojuegos = document.getElementById('container-videojuegos');
   //Generar un div por cada videojuego e insertarlo en el contenedor de videojuegos

// Elementos carrito
const botonMostrarCarrito = document.getElementById('ver-carrito');
const botonPagar = document.getElementById('boton-pagar');
const botonVaciarCarrito = document.getElementById('boton-vaciar-carrito');
const botonIngresar = document.getElementById('btn-ingresar');
const botonBienvenida = document.getElementById('boton-bienvenida');
const interfazCarrito = document.getElementById('carrito');
// Interfaces formularios
const interfazLogin = document.getElementById('interfaz-login');
const interfazRegistro = document.getElementById('interfaz-registro');
const interfazCheckout = document.getElementById('interfaz-checkout');
const formLogin = document.getElementById('form-login');
const formRegistro = document.getElementById('form-registro');
const cerrarLogin = document.getElementById('cerrar-login');
const cerrarRegistro = document.getElementById('cerrar-registro');
const cerrarCheckout = document.getElementById('cerrar-checkout');
const abrirRegistro = document.getElementById('abrir-registro');
const barraNavegacion = document.querySelector('.navbar-right');
const botonBuscar = document.getElementById('boton-buscar');
const inputBusqueda = document.getElementById('cuadro-busqueda');

function mostrarBienvenidaUsuario(usuario)
{
    botonBienvenida.innerText = `Bienvenido/a ${usuario}`;
    botonIngresar.classList.add('hidden');
    botonBienvenida.classList.remove('hidden');
}

let usuarioActual = sessionStorage.getItem('usuarioActual');
if(usuarioActual)
    mostrarBienvenidaUsuario(usuarioActual);



botonVaciarCarrito.addEventListener('click', () => {
    let confirmarLimpieza = confirm("¿Desea vaciar el carrito? (Esta accion no se puede deshacer)");
    if(confirmarLimpieza)
    {
        carrito.lineasDeVenta = [];
        sessionStorage.removeItem('carrito');
        actualizarHTMLCarrito(carrito);
    }
});

botonPagar.addEventListener('click', ()=> {

    if(!sessionStorage.getItem('usuarioActual'))
    {
        alert('Debes iniciar sesion');
        return;
    }

    interfazCheckout.classList.remove('hidden');
});

botonMostrarCarrito.addEventListener('click', () => {
    interfazCarrito.classList.toggle('hidden');
});


botonIngresar.addEventListener('click', (event) => {
    event.preventDefault();  
    interfazLogin.classList.remove('hidden');
    interfazCarrito.classList.add('hidden');
});

abrirRegistro.addEventListener('click',(event)=>{
    event.preventDefault();

    interfazLogin.classList.add('hidden');
    interfazRegistro.classList.remove('hidden');
})

cerrarLogin.addEventListener('click', () => {
    interfazLogin.classList.add('hidden');
});

cerrarRegistro.addEventListener('click', () => {
    interfazRegistro.classList.add('hidden');
});

cerrarCheckout.addEventListener('click', () => {
    interfazCheckout.classList.add('hidden');
});


formLogin.addEventListener('submit',(e)=>{
    e.preventDefault();

    const usuarioIngresado = formLogin.user.value;
    const passIngresada = formLogin.password.value;

    
    if(passIngresada === localStorage.getItem("user:"+usuarioIngresado))
    {
        sessionStorage.setItem("usuarioActual",usuarioIngresado);
        swal.fire("Inicio de sesion exitoso");
        interfazLogin.classList.add('hidden');
        botonIngresar.classList.add('hidden');
        mostrarBienvenidaUsuario(usuarioIngresado);
    }
});

formRegistro.addEventListener('submit',(e)=>
{
    e.preventDefault();

    const usuarioIngresado = formRegistro.user.value;
    const passIngresada = formRegistro.password.value;
    const passRepeatIngresada = formRegistro.passwordRepeat.value;

    if(localStorage.getItem('user:'+usuarioIngresado))
    {
        swal.fire('Ya existe un usuario con ese nombre');
        formRegistro.reset();
        return;
    }

    if(passIngresada!==passRepeatIngresada)
    {
        swal.fire('Las contraseñas no coinciden');
        formRegistro.reset();
        return;
    }    

    localStorage.setItem("user:"+usuarioIngresado,passIngresada);
    swal.fire("Registro exitoso");
    interfazRegistro.classList.add('hidden');
});

botonBuscar.addEventListener('click', () => {
    const textoBusqueda = inputBusqueda.value;
    const listaVideojuegos = contenedorVideojuegos.querySelectorAll(".videojuego");

    listaVideojuegos.forEach(videojuego => {
        const nombreVideojuego = videojuego.querySelector("h3").innerText.toLowerCase();
        
        // Verificar si el nombre coincide con el texto ingresado
        if (nombreVideojuego.includes(textoBusqueda)) {
            videojuego.classList.remove("hidden"); // Mostrar el elemento
        } else {
            videojuego.classList.add("hidden"); // Ocultar el elemento
        }
    });
});

document.addEventListener('DOMContentLoaded', actualizarHTMLCarrito(carrito));
