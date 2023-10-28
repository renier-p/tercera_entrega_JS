const iniciarCarrito = (productos) => {
  let carrito = [];

  const productoContenedor = document.getElementById("contenedor-productos");

  productoContenedor.addEventListener("click", (e) => {
    if (e.target.classList.contains("agregar")) {
      validarProductoCarrito(e.target.id);
    }
  });

  const validarProductoCarrito = (productoId) => {
    const estaRepetido = carrito.some((producto) => producto.id == productoId);

    if (estaRepetido) {
      Toastify({
        text: "Este producto ya se encuentra en el carrito",
        duration: 1500,
        gravity: "top",
        close: false,
        backgroundColor: "red",
        style: {
          borderRadius: "10px",
          top: "70px",
        },
      }).showToast();
    } else {
      const producto = productos.find((producto) => producto.id == productoId);
      carrito.push(producto);
      pintarProductoCarrito(producto);
      actualizarTotalesCarrito(carrito);
    }
  };

  const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById("carrito-contenedor");
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${
      producto.nombre
    }" width="30" height="40">
      <p>${producto.nombre}(s)</p>
      <p>Precio: $ <span id="precio-item">${producto.precio.toLocaleString()}</span></p>
      <div class="cantidad-control">
        <button class="cantidad-control-buton btn waves-effect waves-ligth boton-disminuir" data-producto-id="${
          producto.id
        }">-</button>
        <p id="cantidad${producto.id}">${producto.cantidad}</p>
        <button class="cantidad-control-buton btn waves-effect waves-ligth boton-aumentar" data-producto-id="${
          producto.id
        }">+</button>
      </div>
      <button class="btn waves-effect waves-ligth boton-eliminar" value="${
        producto.id
      }">X</button>
    `;
    contenedor.appendChild(div);
    const botonDisminuir = div.querySelector(".boton-disminuir");
    const botonAumentar = div.querySelector(".boton-aumentar");
    botonDisminuir.addEventListener("click", () => {
      disminuirCantidad(producto.id);
    });

    botonAumentar.addEventListener("click", () => {
      aumentarCantidad(producto.id);
    });

    Toastify({
      text: `${producto.nombre} se ha añadido al carrito`,
      duration: 1500,
      gravity: "top",
      close: false,
      backgroundColor: "black",
      style: {
        borderRadius: "10px",
        top: "70px",
      },
    }).showToast();
  };

  const disminuirCantidad = (productoId) => {
    const cantidadElement = document.getElementById(`cantidad${productoId}`);
    const cantidad = parseInt(cantidadElement.textContent);

    if (cantidad > 0) {
      const nuevaCantidad = cantidad - 1;
      let totalProductos = JSON.parse(localStorage.getItem("carrito"));

      const producto = totalProductos.find(
        (producto) => producto.id === productoId
      );

      if (producto) {
        const productoActualizado = { ...producto, cantidad: nuevaCantidad };

        const index = totalProductos.findIndex((p) => p.id === productoId);

        totalProductos[index] = productoActualizado;
      }

      cantidadElement.textContent = nuevaCantidad;

      const totalCompra = totalProductos.reduce((acc, producto) => {
        return acc + producto.precio * producto.cantidad;
      }, 0);

      localStorage.setItem("carrito", JSON.stringify(totalProductos));

      const precioTotalElement = document.getElementById("precioTotal");
      precioTotalElement.innerText = `Total: $${totalCompra.toLocaleString()} pesos`;
    }
  };

  const aumentarCantidad = (productoId) => {
    const cantidadElement = document.getElementById(`cantidad${productoId}`);
    const cantidad = parseInt(cantidadElement.textContent);

    const nuevaCantidad = cantidad + 1;
    let totalProductos = JSON.parse(localStorage.getItem("carrito"));

    const producto = totalProductos.find(
      (producto) => producto.id === productoId
    );

    if (producto) {
      const productoActualizado = { ...producto, cantidad: nuevaCantidad };
      const index = totalProductos.findIndex((p) => p.id === productoId);
      totalProductos[index] = productoActualizado;
    }

    cantidadElement.textContent = nuevaCantidad;
    console.log(producto.precio);
    console.log(producto.cantidad);
    console.log(totalProductos);

    const totalCompra = totalProductos.reduce((acc, producto) => {
      return acc + producto.precio * producto.cantidad;
    }, 0);
    console.log(totalCompra);
    localStorage.setItem("carrito", JSON.stringify(totalProductos));

    const precioTotalElement = document.getElementById("precioTotal");
    precioTotalElement.innerText = `Total: $${totalCompra.toLocaleString()} pesos`;
  };

  const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );

    pintarTotalesCarrito(totalCantidad, totalCompra);
    guardarCarritoStorage(carrito);
    const precioTotalElement = document.getElementById("precioTotal");
    precioTotalElement.innerText = `Total: $${totalCompra.toLocaleString()} pesos`;
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
      <img src="${producto.imagen}" alt="${
        producto.nombre
      }" width="30" height="40">
            <p>${producto.nombre}(s)</p>
            <p>Precio: $${producto.precio.toLocaleString()}</p>
            <div class="cantidad-control">
            <button class="cantidad-control cantidad-control-buton btn waves-effect waves-ligth boton-disminuir" value="${
              producto.id
            }">-</button>
            <p id=cantidad${producto.id}>${producto.cantidad}</p>
            <button class="cantidad-control cantidad-control-buton btn waves-effect waves-ligth boton-aumentar" value="${
              producto.id
            }">+</button>
        </div>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${
              producto.id
            }">x</button>
        `;
      contenedor.appendChild(div);
      const botonDisminuir = div.querySelector(".boton-disminuir");
      const botonAumentar = div.querySelector(".boton-aumentar");

      botonDisminuir.addEventListener("click", () => {
        disminuirCantidad(producto.id);
      });

      botonAumentar.addEventListener("click", () => {
        aumentarCantidad(producto.id);
      });
    });
  };

  const eliminarProductoCarrito = (productoId) => {
    const productoIndex = carrito.findIndex(
      (producto) => producto.id == productoId
    );

    if (productoIndex !== -1) {
      carrito.splice(productoIndex, 1);
    }

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

  cargarCarritoDeCompras();

  const abrirCarrito = document.getElementById("cesta-carrito");
  const cerrarCarrito = document.getElementById("btn-cerrar-carrito");
  const modalContenedor = document.querySelector(".modal-contenedor");
  const modalCarrito = document.querySelector(".modal-carrito");

  abrirCarrito.addEventListener("click", () => {
    modalContenedor.classList.toggle("modal-active");
  });

  cerrarCarrito.addEventListener("click", () => {
    modalContenedor.classList.toggle("modal-active");
  });

  modalContenedor.addEventListener("click", () => {
    cerrarCarrito.click();
  });

  modalCarrito.addEventListener("click", (e) => {
    e.stopPropagation();

    if (e.target.classList.contains("boton-eliminar")) {
      eliminarProductoCarrito(e.target.value);
    }
  });
};
