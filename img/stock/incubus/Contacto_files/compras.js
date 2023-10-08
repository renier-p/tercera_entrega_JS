let carrito = [];

const productoContenedor = document.getElementById("producto-contenedor");

// Event delegation - delegación de eventos
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
        <p>${producto.nombre}</p>
        <p>Precio: $${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
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
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
  const contadorCarrito = document.getElementById("contador-carrito");
  const precioTotal = document.getElementById("precioTotal");

  contadorCarrito.innerText = totalCantidad;
  precioTotal.innerText = totalCompra;
};
