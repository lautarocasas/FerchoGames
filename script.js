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

const listaUsuarios = new Map();
listaUsuarios.set("admin","admin");

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
const cerrarLogin = document.getElementById('cerrar-login');
const cerrarRegistro = document.getElementById('cerrar-registro');
const botonRegistro = document.getElementById('boton-registro');


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
    event.preventDefault(); // Evitar el comportamiento por defecto del enlace
    interfazLogin.classList.remove('hidden');
    interfazCarrito.classList.add('hidden');
});

botonRegistro.addEventListener('click',(event)=>{
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

    const usarioIngresado = formLogin.user.value;
    const passIngresada = formLogin.password.value;

    
    if(passIngresada === listaUsuarios.get(usarioIngresado))
    {
        sessionStorage.setItem("usuarioActual",usarioIngresado);
    }

});

document.addEventListener('DOMContentLoaded', actualizarHTMLCarrito(carrito));
