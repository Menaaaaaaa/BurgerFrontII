  //variable global
  let Metodo = document.querySelector(".payment-method")
  //carga de 
  document.addEventListener("DOMContentLoaded", () => {
    cargarResumen();
    actualizacionTotalMetodoPago();
  });
  
  function cargarResumen() {
    let resumen = JSON.parse(localStorage.getItem("pro-resumen") || []);
    if (resumen) {
      document.querySelector(".res-sub-total").textContent = resumen.subtotal;
      document.querySelector(".promo").textContent = resumen.descuento;
      document.querySelector(".destino").textContent = resumen.destino;
      document.querySelector(".valor-domi").textContent = resumen.domicilio;
      document.querySelector(".total").textContent = resumen.totalApagar;
  
      let todosProductos = document.querySelector(".productos");
      todosProductos.innerHTML = "";
      resumen.productos.forEach(producto => {
        let Producto = document.createElement("div");
        Producto.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-24");
        Producto.innerHTML = `
          <p class="lead color-black">${producto.nombre}</p>
          <p class="lead color-black">$${producto.precio}</p>
        `;
        todosProductos.appendChild(productoElement);
      });
    }
  }
  
  function actualizacionTotalMetodoPago() {

      Metodo.addEventListener("change", () => {  
        let pago=0;
        switch (Metodo.value) {
          case "Contraentrga": // Contraentrega +(5%)
            pago += resumen.totalApagar * 0.05;
            alert("Recuerde que se agregará un 5% a la cuenta total");
            break;
          case "PSE": // PSE +(3%)
            pago += resumen.totalApagar * 0.03;
            alert("Recuerde que se agregará un 3% a la cuenta total");
            break;
          case "Transferencia": 
            break;
        }
  
        document.querySelector(".total").textContent = total.toFixed(2);
      });
    };
  
  document.querySelector(".btn-checkout").addEventListener("click", (event) => {
    let nombres = document.getElementById("nombres-input").value;
    let apellidos = document.getElementById("apellidos-input").value;
    let email = document.getElementById("email-input").value;
    let celular = document.getElementById("celular-input").value;
    let direccion = document.getElementById("direccion-input").value;
    let direccion2 = document.getElementById("direccion-2-input").value;
    let notas = document.getElementById("additiona-note").value;
  
    if (!nombres || !apellidos || !email || !celular || !direccion) {
      alert("Por favor, complete todos los campos. \n Son obligatorios para garantizar la entrega.");
      event.preventDefault();
      return;
    }
  
    let resumen = JSON.parse(localStorage.getItem("pro-resumen"));
    if (resumen) {
      resumen.usuario = {
        nombres,
        apellidos,
        email,
        celular,
        direccion,
        direccion2,
        notas
      };
      localStorage.setItem("pro-resumen", JSON.stringify(resumen));
    }
  });