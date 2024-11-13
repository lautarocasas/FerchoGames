const listaVideojuegos = [  {nombre:"Monkey Island 4",precio:800},
                            {nombre:"Doom Eternal",precio:2800},
                            {nombre:"The Binding of Isaac",precio:2000},
                            {nombre:"Devil May Cry 5",precio:3600},
                            {nombre:"Minecraft",precio:4000},
                            {nombre:"Dead by Daylight",precio:2600},
                            {nombre:"Fall Guys",precio:2600},
                            {nombre:"Overcooked 2",precio:2200},
                            {nombre:"Mortal Kombat 1",precio:8200},
                            {nombre:"Grand Theft Auto V",precio:4200},
                            {nombre:"Overwatch 2",precio:6800},
                            {nombre:"Hollow Knight",precio:2800},
                            {nombre:"Dragon Ball: Sparking! Zero",precio:80000},
                            {nombre:"Resident Evil 3",precio:46000}
];


class Producto
{
    nombre;
    precio;

    constructor(nombre,precio)
    {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const listaObjetosVideojuegos = listaVideojuegos.map((juego)=>{return new Producto(juego.nombre,juego.precio)})

class Carrito
{
    productos = [];
    constructor(){}

    agregarProducto(producto)
    {
        this.productos.push(producto);
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


function listarVideojuegos(listadoActual,videojuego)
{
    return listadoActual+videojuego.nombre+' - $'+videojuego.precio+'\n';
}

const listaNombreVideojuegos = listaVideojuegos.reduce(listarVideojuegos,"Nombre - Precio\n");

let carrito = new Carrito();
let continuarOperando = true;
while(continuarOperando)
{
    let opcionSeleccionada = Number(prompt("Ingrese el numero de la operacion que desee realizar:\n1) Ver catalogo\n2) Agregar al carrito\n3) Ver costo del carrito\n4) Realizar pago\n5) Salir del menu"));
    let continuarCompra = true;
    switch(opcionSeleccionada)
    {
        case 1:
            alert(listaNombreVideojuegos);
            break;
        case 2:
            while(continuarCompra)
            {
                let juegoSeleccionado = prompt("Ingrese el nombre del videojuego que desee agregar al carrito: ");
                if(juegoSeleccionado === null)      //El usuario cancelo la entrada de datos
                    break;
                let juegoAComprar = listaVideojuegos.find(videojuego => videojuego.nombre == juegoSeleccionado);
                if(juegoAComprar !== undefined) //En caso de que exista el juego, se agrega al carrito
                {
                    carrito.agregarProducto(juegoAComprar);
                    continuarCompra = confirm("¡Juego agregado exitosamente! ¿Desea seguir agregando juegos al carrito?");
                }
                else
                    continuarCompra = confirm("Lamentablemente, no disponemos de dicho titulo en el catalogo. ¿Desea seguir agregando juegos al carrito?");                
            }
            break;
        case 3:
            let juegosEnCarrito = carrito.mostrarProductos();
            let totalAPagar = carrito.calcularTotal();
            alert("Juegos en el carrito:\n"+juegosEnCarrito+"\nEl monto total es de: $"+totalAPagar);
            break;
        case 4:
            if(carrito.productos.length !== 0)
            {       
                let totalAPagar = carrito.calcularTotal();
                let confirmacionCompra = confirm("El total a pagar es de: "+totalAPagar+"\n¿Proceder al pago?");
                if(confirmacionCompra)
                {
                    alert("¡Pago realizado! Muchas gracias por comprar.");
                    continuarOperando = false;
                }                    
                break;
            }
            else
                alert("No hay videojuegos en el carrito, agregue juegos usando la opcion (2) del menu anterior")
            break;
        case 5:
            continuarOperando = !confirm("¿Esta seguro que desea salir? (Una vez cerrado el menu, no podra volver a el)");
            break;
        default:
            alert("La opcion ingresada no es valida, por favor, ingrese una operacion valida.");
            break;
    }
}
