let carrito = [];

const productoContenedor = document.getElementById("contenedor-productos");

productoContenedor.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar")) {
    validarProductoCarrito(e.target.id);
  }
});

const validarProductoCarrito = (productoId) => {
  const estaRepetido = carrito.some((producto) => producto.id == productoId);

  if (!estaRepetido) {
    const producto = productos.find((producto) => producto.id == productoId);
    carrito.push(producto);
    pintarProductoCarrito(producto);
    actualizarTotalesCarrito(carrito);
  } else {
    const producto = carrito.find((producto) => producto.id == productoId);
    const cantidad = document.getElementById(`cantidad${producto.id}`);
    producto.cantidad++;
    cantidad.innerText = `Cantidad: ${producto.cantidad}`;
    actualizarTotalesCarrito(carrito);
  }
};

const pintarProductoCarrito = (producto) => {
  const contenedor = document.getElementById("carrito-contenedor");
  const div = document.createElement("div");
  div.classList.add("productoEnCarrito");
  div.innerHTML = `
        <p>${producto.nombre}(s)</p>
        <p>Precio: $${producto.precio.toLocaleString()}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${
          producto.id
        }">X</button>
    `;
  contenedor.appendChild(div);
};

const actualizarTotalesCarrito = (carrito) => {
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalCompra = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  pintarTotalesCarrito(totalCantidad, totalCompra);
  guardarCarritoStorage(carrito);
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
  const contadorCarrito = document.getElementById("contador-carrito");
  const precioTotal = document.getElementById("precioTotal");

  contadorCarrito.innerText = totalCantidad;
  precioTotal.innerText = totalCompra.toLocaleString() + " pesos";
};

const pintarCarrito = (carrito) => {
  const contenedor = document.getElementById("carrito-contenedor");

  contenedor.innerHTML = "";

  carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `
            <p>${producto.nombre}(s)</p>
            <p>Precio: $${producto.precio.toLocaleString()}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${
              producto.id
            }">x</button>
        `;
    contenedor.appendChild(div);
  });
};

const eliminarProductoCarrito = (productoId) => {
  const productoIndex = carrito.findIndex(
    (producto) => producto.id == productoId
  );
  carrito.splice(productoIndex, 1);
  pintarCarrito(carrito);
  actualizarTotalesCarrito(carrito);
};

const guardarCarritoStorage = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const obtenerCarritoStorage = () => {
  return JSON.parse(localStorage.getItem("carrito"));
};

const cargarCarritoDeCompras = () => {
  if (localStorage.getItem("carrito")) {
    carrito = obtenerCarritoStorage();
    pintarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
  }
};
