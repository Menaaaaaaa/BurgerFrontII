//Variables globales
let btnProducts = document.querySelectorAll(".btn-product");
let  contadorCarrito = document.querySelector(".contar-pro")
let listadoCarrito = document.querySelector(".list-cart tbody")
let con = 0;

document.addEventListener("DOMContentLoaded", () =>{
    cargarPorLocalStorage();
})

btnProducts.forEach((btn, i)=>{
    btn.addEventListener("click", ()=>{
        // con de producto carrito
        con++;
        contadorCarrito.textContent = con;
        //agg producto al carrito
        infoProducto(i); 
    })
});

// agg producto al carrito
function agregarProducto(producto){
    let fila = document.createElement("tr");
    fila.innerHTML = // primer reto contador (hacer que la tabla cuenta cuantos productos tiene)
    //y cuando se le quitan que lo reste asignandole un id a cada producto
    `   <td>  ${con}  </td> 
        <td>  <img src="${producto.imagen}" width="70px">  </td>
        <td>  ${producto.nombre}  </td>
        <td>  $ ${producto.precio}  </td>
        <td>  <span onclick="borrarProducto(${con})" class="btn"> ❌ </span> </td>
    `;
    listadoCarrito.appendChild(fila); 
}

//fnc agg info del producto al carrito
function infoProducto(pos){
    let producto =  btnProducts[pos].parentElement.parentElement.parentElement;
    let infoPro ={
        //id: con,
        nombre: producto.querySelector("h3").textContent,
        imagen: producto.querySelector("img").src,
        precio: producto.querySelector("h5").textContent.split("$")[1],
        cantidad: 1
    }
    //console.log(infoPro );
    agregarProducto(infoPro);
    guardarProLocalStorage(infoPro);
}

//fnc para eliminar un producto del carrito
function borrarProducto(pos) {
    let producto= event.target;
    //console.log(producto.parentElement.parentElement);
    producto.parentElement.parentElement.remove();
    //disminuair cuado elimino
    if(con>0){
        con--;
        contadorCarrito.textContent = con;
        
    }
    eliminarProLocalStorage(pos)
} 

//guardar productos en localStorage
function guardarProLocalStorage(productos) {
    let todosProductos = [];
    let productosPrevios = JSON.parse( localStorage.getItem("pro-carrito"))
    if (productosPrevios != null){
        todosProductos = Object.values(productosPrevios);
    }   
    todosProductos.push(productos);
    localStorage.setItem("pro-carrito", JSON.stringify (todosProductos));
}

//borrar pro local
function eliminarProLocalStorage(pos){
    let todosProductos = [];
    let productosPrevios = JSON.parse( localStorage.getItem("pro-carrito"))
    if (productosPrevios != null){
        todosProductos = Object.values(productosPrevios);
    }   
    todosProductos.splice((pos-1), 1)
    localStorage.setItem("pro-carrito", JSON.stringify (todosProductos));
} 

// cargar pro en local
function cargarPorLocalStorage(){
    let todosProductos = [];
    let productosPrevios = JSON.parse( localStorage.getItem("pro-carrito"))
    if (productosPrevios != null){
        todosProductos = Object.values(productosPrevios);
    } 
    todosProductos.forEach((producto)=>
    {agregarProducto(producto);})
}

contadorCarrito.parentElement .addEventListener("click" , ()=> {
    listadoCarrito.parentElement.classList.toggle("ocultar");
})