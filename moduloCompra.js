const Toast = Swal.mixin({
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#ffffff",
    color: "#000000"
  });


export class Producto
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
        div.innerHTML = `<h3>${this.nombre}</h3> <img src = ${this.imgPath} alt = "Imagen de ${this.nombre}"> <h4>$${this.precio}ARS</h4> <button>Agregar al carrito</button> `;

        let botonCompra = div.querySelector('button');
        botonCompra.addEventListener('click',()=>{
            carrito.agregarProducto(this,1);
            Toast.fire({
                icon: "success",
                title: `${this.nombre} agregado al carrito`
              });

        });
        return div;
    }
}

export class LineaDeVenta
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

export class Carrito
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

    obtenerCantidadTotal()
    {
        return this.lineasDeVenta.reduce((cantTotal,linea)=>{return cantTotal+linea.cantidad},0);
    }

    calcularTotal()
    {
        return this.lineasDeVenta.reduce((costoTotal,linea)=>{return costoTotal+linea.calcularSubtotal()},0);
    }

    static fromJSON(data) {
        let carrito = new Carrito();
        carrito.lineasDeVenta = data.lineasDeVenta.map(linea =>
            new LineaDeVenta(linea.producto, linea.cantidad)
        );
        return carrito;
    }
}

export function actualizarHTMLCarrito(carrito) {
    let listaCarrito = document.getElementById('lista-carrito');
    let cantElemCarritoElement = document.getElementById('cant-elem-carrito');
    let cantElemCarrito = carrito.obtenerCantidadTotal();

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

    if(cantElemCarrito!=0)
        cantElemCarritoElement.innerText = cantElemCarrito;
    else
        cantElemCarritoElement.innerText = '';
}

export async function importarListadoJSON(archivoJSON) {
    const response = await fetch(archivoJSON);
    const listaVideojuegos = await response.json();
    
    return listaVideojuegos.map((juego, index) => new Producto(index, juego.nombre, juego.precio, juego.img));
}