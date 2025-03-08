//Variables Globales
let tablaCarrito=document.querySelector('.cart-table tbody')
let resumenSubTotal= document.querySelector(".res-sub-total")
let resumenDescuento = document.querySelector(".promo")
let resumenTotal =document.querySelector(".total")
let destino = document.querySelector(".destino")
let resumenDomicilio = document.querySelector(".valor-domi")
let btnResumen= document.querySelector(".btn-resumen")
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
            <span onclick="borrarProducto(${i})" class="btn"> ❌ </span>
            <img src="${producto.imagen}" width="70px">  
            ${producto.nombre}  
        </td>
        <td>  
        $ <span>${producto.precio}</span>
        </td>
         <td> 
            <div class="quantity quantity-wrap">
                <div class="decrement" onclick="actualizarCantidad(${i},-1)"><i class="fa-solid fa-minus"></i></div>
                <input class="number" type="text " name="quantity" value="${producto.cantidad || 1}" maxlength="2" size="1" readonly>
                <div class="increment" onclick ="actualizarCantidad(${i},1)"><i class="fa-solid fa-plus"=></i></div>
            </div>
         </td>
          <td> $${(producto.precio* producto.cantidad).toFixed(3)}</td>
    `;
        tablaCarrito.appendChild(fila);       
    })
}  else{
    let fila = document.createElement("tr");
    fila.innerHTML=`<td colspan="4"> <p class="text-center fs-3">No hay productos en el carrito</p></td>`
    tablaCarrito.appendChild(fila);  
}
        //ejecutar el resumen de la compra
        resumenCompra()
}

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
    //calcular subtotal
    // let subtotal = todosProductos[pos].precio * todosProductos[pos].cantidad
}
//actualizar local storage 
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos))
    cargarProductos();
}

//funcion para borrar pro
function borrarProducto(pos){
    let todosProductos = [];
    let productosPrevios = JSON.parse( localStorage.getItem("pro-carrito"))
    if (productosPrevios != null){
        todosProductos = Object.values(productosPrevios);
    } 
    //eliminar producto
    todosProductos.splice(pos, 1)
    localStorage.setItem("pro-carrito", JSON.stringify(todosProductos));
    //recargar tabla
    cargarProductos();
}

//fnc resumen compra
function resumenCompra(){
    let todosProductos=JSON.parse(localStorage.getItem("pro-carrito") || []);
    let subtotal=0; //acumular el subtotal de los productos
    //recorrer cada producto y acumulamos 
    todosProductos.forEach((producto)=>{
        subtotal+= producto.precio * producto.cantidad;
    });
    //calcular valor del domicilio
    let domicilio=0;
    switch (destino.value) {
        case "Medellin": default : domicilio; break;
        case "Bello": domicilio = 10.000; break;
        case "Copacabana": case "Caldas" : case "La Estrella" : domicilio= 20.000; break;
        case "Envigado" : case "Itagui": case " Sabaneta" : domicilio=15.000; break;
        
    }
    // calcular descuento del 10% si la compra es > a 100.000
    let descuento= (subtotal > 100.000)?subtotal *0.1 : 0;
    //calcular total a pagar 
    let totalApagar = subtotal - descuento + domicilio;
    //mostrar los calculos de resumen de compra 
    resumenSubTotal.textContent = subtotal.toFixed(3);
    resumenDescuento.textContent = descuento.toFixed(3);
    
    resumenTotal.textContent= totalApagar.toFixed(3);
    resumenDomicilio.textContent = domicilio.toFixed(3);
}

// agg evento para el domicilio y calcular su valor
document.addEventListener("change", ()=> {
    //actualizar resumen de la compra
    resumenCompra();
})

//evento al boton pagar para guardar el reumen en el local 
btnResumen.addEventListener("click", ()=>{
    //extraer los productos de local
    let Productos=JSON.parse(localStorage.getItem("pro-carrito") || []);
    let resumen = {
        //copia de todos los productos
        "productos" : Productos,
    }
    //llenar la variable resumen con la info de la compra
    resumen.subtotal = resumenSubTotal.textContent;
    resumen.descuento = resumenDescuento.textContent;
    resumen.destino = destino.value;
    resumen.domicilio = resumenDomicilio.textContent;
    resumen.totalApagar = resumenTotal.textContent;
    //agg info en local
    localStorage.setItem("pro-resumen", JSON.stringify(resumen));
    //redirigir el usuario a la pagina de pago 
    location.href="checkout.html";
})