//Variables Globales
let tablaCarrito=document.querySelector('.cart-table tbody')

//agg evento al nav
document.addEventListener("DOMContentLoaded",  ()=>{
    cargarProductos();
})

// cargar pro guardados en localStorage
function cargarProductos(){
    let todosProductos = [];
    let productosPrevios = JSON.parse( localStorage.getItem("pro-carrito"))
    if (productosPrevios != null){
        todosProductos = Object.values(productosPrevios);
    } 
    //limpiar tabla
    tablaCarrito.innerHTML ="";
   //comprobar si hay productos en el local
   if(todosProductos!=0){
    todosProductos.forEach((producto, i)=>{
    // cargar tabla
    let fila = document.createElement("tr");
    fila.innerHTML = 
    `   <td class="d-flex justify-content-evenly align-items-center">  
            <span onclick="borrarProducto()" class="btn"> ❌ </span>
            <img src="${producto.imagen}" width="70px">  
            ${producto.nombre}  
        </td>
        <td>  
        $ <span>${producto.precio}</span>
        </td>
         <td> 
            <div class="quantity quantity-wrap">
                <div class="decrement" onclick="actualizarCantidad(${i},-1)"><i class="fa-solid fa-minus"></i></div>
                <input class="text " type="number" name="quantity" value="${producto.cantidad || 1}" maxlength="2" size="1" readonly>
                <div class="increment" onclick ="actualizarCantidad(${i},1)"><i class="fa-solid fa-plus"=></i></div>
            </div>
         </td>
          <td> ${producto.precio}</td>
    `;
        tablaCarrito.appendChild(fila);       
    })
}  else{
    let fila = document.createElement("tr");
    fila.innerHTML=`<td colspan="4"> <p class="text-center fs-3">No hay productos en el carrito</p></td>`
    tablaCarrito.appendChild(fila);  
}}

//funcion actu canti de producto
function actualizarCantidad(pos, cambio){
    let todosProductos = [];
    let productosPrevios = JSON.parse( localStorage.getItem("pro-carrito"))
    if (productosPrevios != null){
        todosProductos = Object.values(productosPrevios);
    } 
    if(todosProductos[pos]){
        //actu cantidad
        todosProductos[pos].cantidad = (todosProductos[pos].cantidad || 1)+cambio;
        //asegurarse que la cantidad no sea menro a 1
        if(todosProductos[pos].cantidad <1){
            todosProductos[pos].cantidad =1;
        }
}
//actualizar local storage 
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos))
    cargarProductos();
}
