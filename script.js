let listaProductos = [{nombre:"Monkey Island 4",precio:800},
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

let productosAComprar = [];
let totalCompra = 0;
let continuarCompra = true;
let stringListadoProductos = "Ingrese el numero del juego que desea comprar: \n";

for(let i=0;i<listaProductos.length;i++)
{
  stringListadoProductos+= i+'. '+listaProductos[i].nombre+' - Precio: '+listaProductos[i].precio+'\n';       
} 

while(continuarCompra)
{
    let indJuegoAComprar = prompt(stringListadoProductos+"Total de compra: "+totalCompra+"\n");

    if(indJuegoAComprar>=0 && indJuegoAComprar<=listaProductos.length)
    {
        productosAComprar.push(listaProductos[indJuegoAComprar]);
        totalCompra+= listaProductos[indJuegoAComprar].precio;
        continuarCompra = confirm("¡Juego añadido al carrito! ¿Desea seguir agregando juegos al carrito?");
    }
    else
    {
        continuarCompra = confirm("¿Desea continuar comprando?");
    }
}
