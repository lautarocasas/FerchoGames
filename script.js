import { Carrito,Producto,actualizarHTMLCarrito } from "./moduloCompra.js";


const listaVideojuegos = [  {nombre:"Monkey Island 4",precio:800,img:'Portadas/monkey4.jpg'},
                            {nombre:"Doom Eternal",precio:2800,img:'Portadas/doomEternal.webp'},
                            {nombre:"The Binding of Isaac",precio:2000,img:'Portadas/tboi.jpg'},
                            {nombre:"Devil May Cry 5",precio:3600,img:'Portadas/devilMayCry5.avif'},
                            {nombre:"Minecraft",precio:4000,img:'Portadas/minecraft.png'},
                            {nombre:"Dead by Daylight",precio:2600,img:'Portadas/deadByDaylight.png'},
                            {nombre:"Fall Guys",precio:2600,img:'Portadas/fallGuys.jpg'},
                            {nombre:"Overcooked 2",precio:2200,img:'Portadas/overcooked2.jpg'},
                            {nombre:"Mortal Kombat 1",precio:8200,img:'Portadas/mortalKombat1.webp'},
                            {nombre:"Grand Theft Auto V",precio:4200,img:'Portadas/gtaV.webp'},
                            {nombre:"Overwatch 2",precio:6800,img:'Portadas/overwatch2.webp'},
                            {nombre:"Hollow Knight",precio:2800,img:'Portadas/hollowKnight.webp'},
                            {nombre:"Dragon Ball: Sparking! Zero",precio:80000,img:'Portadas/dragonBall.jpg'},
                            {nombre:"Resident Evil 3",precio:46000,img:'Portadas/residentEvil3.webp'}
];

localStorage.setItem("user:admin","admin");

const listaObjetosVideojuegos = listaVideojuegos.map((juego,index)=>{return new Producto(index,juego.nombre,juego.precio,juego.img)});


let carritoGuardado = JSON.parse(sessionStorage.getItem('carrito'));
let usuarioActual = sessionStorage.getItem('usuarioActual');

console.log(usuarioActual);

let carrito;
if (carritoGuardado) {
    carrito = Carrito.fromJSON(carritoGuardado);
} else {
    carrito = new Carrito();
}

let contenedorVideojuegos = document.getElementById('container-videojuegos');
listaObjetosVideojuegos.forEach((elem)=>{contenedorVideojuegos.appendChild(elem.generarDiv(carrito))});    //Generar un div por cada videojuego e insertarlo en el contenedor de videojuegos

const botonMostrarCarrito = document.getElementById('ver-carrito');
const botonPagar = document.getElementById('boton-pagar');
const botonVaciarCarrito = document.getElementById('boton-vaciar-carrito');
const botonIngresar = document.getElementById('btn-ingresar');
const interfazCarrito = document.getElementById('carrito');
const interfazLogin = document.getElementById('interfaz-login');
const interfazRegistro = document.getElementById('interfaz-registro');
const formLogin = document.getElementById('form-login');
const formRegistro = document.getElementById('form-registro');
const cerrarLogin = document.getElementById('cerrar-login');
const cerrarRegistro = document.getElementById('cerrar-registro');
const abrirRegistro = document.getElementById('abrir-registro');
const barraNavegacion = document.querySelector('.navbar-right');
const botonBuscar = document.getElementById('boton-buscar');
const inputBusqueda = document.getElementById('cuadro-busqueda');

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

    if(!usuarioActual)
    {
        alert('Debes iniciar sesion');
        return;
    }

    let confirmarPago = confirm("¿Confirmar la compra y proceder al pago?");
    if(confirmarPago)
    {
        carrito.lineasDeVenta = [];
        sessionStorage.removeItem('carrito');
        actualizarHTMLCarrito(carrito);
        Swal.fire("¡Muchas gracias por su compra!");
    }
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
        const botonBienvenida = document.createElement('a');
        botonBienvenida.innerText = `Bienvenido/a ${usuarioIngresado}`;
        barraNavegacion.appendChild(botonBienvenida);
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
