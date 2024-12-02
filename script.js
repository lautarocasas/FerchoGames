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
    codProd;
    nombre;
    precio;
    imgPath;

    constructor(codProd,nombre,precio,imgPath)
    {
        this.codProd = codProd;
        this.nombre = nombre;
        this.precio = precio;
        this.imgPath = imgPath;
    }

    generarDiv(carrito)
    {
        let div = document.createElement('div');
        div.className = 'videojuego';
        div.innerHTML = `<h3>${this.nombre}</h3> <img src = ${this.imgPath} alt = "Imagen de ${this.nombre}"> <h4>$${this.precio}ARS</h4> <button>Agregar al carrito</button>`;

        let botonCompra = div.querySelector('button');
        botonCompra.addEventListener('click',()=>{carrito.agregarProducto(this,1)});
        return div;
    }
}

const listaObjetosVideojuegos = listaVideojuegos.map((juego,index)=>{return new Producto(index,juego.nombre,juego.precio,juego.img)});

class LineaDeVenta
{
    producto;
    cantidad;

    constructor(producto,cantidad)
    {
        this.producto = producto;
        this.cantidad = cantidad;
    }

    calcularSubtotal()
    {
        return (this.producto.precio)*(this.cantidad);
    }
}

class Carrito
{
    lineasDeVenta = [];
    constructor(){}

    agregarProducto(producto,cantidad)
    {
        // Verificar si el producto ya está en el carrito
        let indiceLinea = this.lineasDeVenta.findIndex((elem)=>{return elem.producto.codProd === producto.codProd});
        
        if (indiceLinea != -1)
        {
            let cantActualizada = this.lineasDeVenta[indiceLinea].cantidad + cantidad;
            this.lineasDeVenta[indiceLinea].cantidad = cantActualizada;
        }
        else
        {
            const nuevaLineaVenta = new LineaDeVenta(producto,cantidad);
            this.lineasDeVenta.push(nuevaLineaVenta);
        }

        sessionStorage.setItem('carrito',JSON.stringify(this));
        actualizarHTMLCarrito(this);
    }

    calcularTotal()
    {
        let total = 0;
        this.lineasDeVenta.forEach(linea => {
            total += linea.calcularSubtotal();
        });
        return total;
    }

    static fromJSON(data) {
        let carrito = new Carrito();
        carrito.lineasDeVenta = data.lineasDeVenta.map(linea =>
            new LineaDeVenta(linea.producto, linea.cantidad)
        );
        return carrito;
    }
}

function actualizarHTMLCarrito(carrito) {
    let listaCarrito = document.getElementById('lista-carrito');
    
    // Limpiar el contenido del contenedor
    listaCarrito.innerHTML = '';

    // Generar el contenido dinámico del carrito
    carrito.lineasDeVenta.forEach(lineaVenta => {
        let div = document.createElement('div');
        div.className = 'juego-en-carrito';
        div.innerHTML = `<img src = ${lineaVenta.producto.imgPath} alt = "Imagen de ${lineaVenta.producto.nombre}">`;

        let divDatosJuego = document.createElement('div');
        divDatosJuego.className = 'datos-juego-carrito';
        divDatosJuego.innerHTML = `<h4 class = 'linea-producto'> ${lineaVenta.producto.nombre}</h4><h5 class = 'linea-precio'>$${lineaVenta.producto.precio}</h5><h5 class = 'linea-cantidad'>Cantidad: ${lineaVenta.cantidad}</h5> `;
        div.appendChild(divDatosJuego);
        listaCarrito.appendChild(div);
    });

    let totalCarritoHTML = document.getElementById('total-carrito');  
    totalCarritoHTML.innerText = `Total a pagar: $${carrito.calcularTotal()}`;
}

let carritoGuardado = JSON.parse(sessionStorage.getItem('carrito'));

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
const interfazCarrito = document.getElementById('carrito');

botonVaciarCarrito.addEventListener('click', () => {
    let confirmarLimpieza = confirm("¿Desea vaciar el carrito? (Esta accion no se puede deshacer)");
    if(confirmarLimpieza)
    {
        carrito.lineasDeVenta = [];
        actualizarHTMLCarrito(carrito);
    }
});

botonPagar.addEventListener('click', ()=> {
    let confirmarPago = confirm("¿Confirmar la compra y proceder al pago?");
    if(confirmarPago)
    {
        carrito.lineasDeVenta = [];
        actualizarHTMLCarrito(carrito);
        alert("¡Muchas gracias por su compra!");
    }
});

botonMostrarCarrito.addEventListener('click', () => {
    interfazCarrito.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', actualizarHTMLCarrito(carrito));
