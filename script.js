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


class Producto
{
    nombre;
    precio;
    imgPath;

    constructor(nombre,precio,imgPath)
    {
        this.nombre = nombre;
        this.precio = precio;
        this.imgPath = imgPath;
    }

    generarDiv()
    {
        let div = document.createElement('div');
        div.className = 'videojuego';
        div.innerHTML = `<h3>${this.nombre}</h3> <img src = ${this.imgPath} alt = "Imagen de ${this.nombre}"> <h4>$${this.precio}ARS</h4> <button>Agregar al carrito</button>`;

        let botonCompra = div.querySelector('button');
        botonCompra.addEventListener('click',()=>{carrito.agregarProducto(this);});
        return div;
    }
}

const listaObjetosVideojuegos = listaVideojuegos.map((juego)=>{return new Producto(juego.nombre,juego.precio,juego.img)});

class Carrito
{
    productos = [];
    constructor(){}

    agregarProducto(producto)
    {
        this.productos.push(producto);
        //Crear el div correspondiente dentro del carrito
        let divJuegoEnCarrito = document.createElement('div');
        divJuegoEnCarrito.className = 'juego-en-carrito';
        divJuegoEnCarrito.innerHTML = ` <img src = ${producto.imgPath} alt = "Imagen de ${this.nombre}">`;

        //Crea el div con los datos del juego en el carrito
        let divDatosJuego = document.createElement('div');
        divDatosJuego.className = 'datos-juego-carrito';
        divDatosJuego.innerHTML = `<h4> ${producto.nombre}</h4><h5>$${producto.precio}</h5>`;
        divJuegoEnCarrito.appendChild(divDatosJuego);

        let divJuegosEnCarrito = document.getElementById('lista-carrito');
        divJuegosEnCarrito.appendChild(divJuegoEnCarrito);
    }

    calcularTotal()
    {
        let total = this.productos.reduce((costoTotal,producto)=>{return costoTotal+producto.precio},0);
        return total;
    }

    mostrarProductos()
    {
        return this.productos.reduce(listarVideojuegos,"Nombre - Precio\n");
    }
}

let carrito = new Carrito();

let contenedorVideojuegos = document.getElementById('container-videojuegos');
listaObjetosVideojuegos.forEach((elem)=>{contenedorVideojuegos.appendChild(elem.generarDiv())});    //Generar un div por cada videojuego e insertarlo en el contenedor de videojuegos

const botonCarrito = document.getElementById('ver-carrito');
const interfazCarrito = document.getElementById('carrito');


botonCarrito.addEventListener('click', () => {
    interfazCarrito.classList.toggle('hidden');
});

