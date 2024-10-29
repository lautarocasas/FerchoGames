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

const listaNombreVideojuegos = [];

for(let i = 0;i<listaVideojuegos.length;i++)
{
    listaNombreVideojuegos.push('\n'+listaVideojuegos[i].nombre +' - Precio: '+listaVideojuegos[i].precio);
}

function buscarVideojuego(nombreJuego)
{
    for(let i=0;i<listaVideojuegos.length;i++)
    {
        if(listaVideojuegos[i].nombre == nombreJuego)
            return i;
    }
    return -1;
}


let carrito = [];

while(true)
{
    let opcionSeleccionada = Number(prompt("Ingrese el numero de la operacion que desee realizar:\n1) Agregar al carrito\n2) Ver catalogo\n3) Realizar pago"));
    let continuarCompra = true;
    switch(opcionSeleccionada)
    {
        case 1:
            while(continuarCompra)
            {
                let juegoSeleccionado = prompt("Ingrese el nombre del videojuego que desee agregar al carrito: ");
                let indJuego = buscarVideojuego(juegoSeleccionado);
                if(indJuego !== -1)
                {
                    carrito.push(listaVideojuegos[indJuego]);
                    continuarCompra = confirm("¡Juego agregado exitosamente! ¿Desea seguir agregando juegos al carrito?");
                }
                else
                    continuarCompra = confirm("Lamentablemente, no disponemos de dicho titulo en el catalogo. ¿Desea seguir agregando juegos al carrito?");                
            }
            break;
        case 2:
            alert(listaNombreVideojuegos);
            break;
        case 3:
            if(carrito.length !== 0)
            {
                let totalAPagar;
                for(let i = 0;i<carrito.length;i++)
                    totalAPagar+=carrito[i].precio;
                let confirmacionCompra = confirm("El total a pagar es de: "+totalAPagar+"\n¿Proceder al pago?");
                if(confirmacionCompra)
                    alert("¡Pago realizado! Muchas gracias por comprar.");
            }
            else
                alert("No hay videojuegos en el carrito, agregue juegos usando la opcion (1) del menu anterior")
            break;
    }
}
