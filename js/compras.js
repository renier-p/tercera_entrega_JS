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

    // Obtener los botones de disminuir y aumentar
    const botonDisminuir = div.querySelector(".boton-disminuir");
    const botonAumentar = div.querySelector(".boton-aumentar");

    // Manejadores de eventos para disminuir y aumentar
    botonDisminuir.addEventListener("click", () => {
      disminuirCantidad(producto.id);
    });

    botonAumentar.addEventListener("click", () => {
      aumentarCantidad(producto.id);
    });

    // Mostrar la notificación
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

  // Función para disminuir la cantidad
  // const disminuirCantidad = (productoId) => {
  //   const cantidadElement = document.getElementById(`cantidad${productoId}`);
  //   const cantidad = parseInt(cantidadElement.textContent);

  //   if (cantidad > 0) {
  //     // Disminuir la cantidad y actualizar el elemento
  //     cantidadElement.textContent = cantidad - 1;
  //   }
  // };

  const reducirCantidad = (productoId) => {
    const cantidadElement = document.getElementById(`cantidad${productoId}`);
    const cantidad = parseInt(cantidadElement.textContent);

    const nuevaCantidad = cantidad - 1;
    const totalProductos = JSON.parse(localStorage.getItem("carrito"));

    // Encuentra el objeto con el productoId en el array productos
    const producto = totalProductos.find(
      (producto) => producto.id === productoId
    );

    if (producto) {
      // Actualiza la cantidad en el objeto del array
      producto.cantidad = nuevaCantidad;
    }

    cantidadElement.textContent = nuevaCantidad;
    console.log(producto.precio);

    const totalCompra = totalProductos.reduce((acc, producto) => {
      return acc + producto.precio * producto.cantidad;
    }, 0);

    const precioTotalElement = document.getElementById("precioTotal");
    precioTotalElement.innerText = `Total: $${totalCompra.toFixed(2)}`;
  };

  // Función para aumentar la cantidad
  // const aumentarCantidad = (productoId) => {
  //   const cantidadElement = document.getElementById(`cantidad${productoId}`);
  //   const cantidad = parseInt(cantidadElement.textContent);

  //   // Aumentar la cantidad y actualizar el elemento
  //   cantidadElement.textContent = cantidad + 1;
  //   let precioItem = document.getElementById("#precio-item");

  //   console.log(precioItem);
  //   console.log(cantidad);
  // };

  // const aumentarCantidad = (productoId) => {
  //   const cantidadElement = document.getElementById(`cantidad${productoId}`);
  //   const cantidad = parseInt(cantidadElement.textContent);

  //   // Aumentar la cantidad y actualizar el elemento
  //   cantidadElement.textContent = cantidad + 1;
  //   actualizarPrecioTotal(); // Llama a la función para actualizar el precio total
  // };

  //________________________________________________________________________
  // const totalProductos = JSON.parse(localStorage.getItem("carrito"));
  // console.log(totalProductos);
  // let totalCantidad = 0;

  // for (const producto of totalProductos) {
  //   totalCantidad += producto.cantidad;
  // }

  // console.log("La cantidad total es:", totalCantidad);

  const aumentarCantidad = (productoId) => {
    const cantidadElement = document.getElementById(`cantidad${productoId}`);
    const cantidad = parseInt(cantidadElement.textContent);

    const nuevaCantidad = cantidad + 1;
    const totalProductos = JSON.parse(localStorage.getItem("carrito"));

    // Encuentra el objeto con el productoId en el array productos
    const producto = totalProductos.find(
      (producto) => producto.id === productoId
    );

    if (producto) {
      // Actualiza la cantidad en el objeto del array
      producto.cantidad = nuevaCantidad;
    }

    cantidadElement.textContent = nuevaCantidad;
    console.log(producto.precio);

    const totalCompra = totalProductos.reduce((acc, producto) => {
      return acc + producto.precio * producto.cantidad;
    }, 0);

    const precioTotalElement = document.getElementById("precioTotal");
    precioTotalElement.innerText = `Total: $${totalCompra.toFixed(2)}`;
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
    precioTotalElement.innerText = `Total: $${totalCompra.toLocaleString()}`;
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
            <p id="precioTotal">Total: $0.00</p>
        `;
      contenedor.appendChild(div);

      // Obtener los botones de disminuir y aumentar
      const botonDisminuir = div.querySelector(".boton-disminuir");
      const botonAumentar = div.querySelector(".boton-aumentar");

      // Manejadores de eventos para disminuir y aumentar
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
