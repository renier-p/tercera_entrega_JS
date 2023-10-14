const pintarProductos = (data) => {
  const contenedor = document.getElementById("contenedor-productos");

  data.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("card1");
    div.innerHTML += `<div class="card1-image">
                        <img class="img_carrito" src=${producto.imagen}>
                        <span class="card1-title">${producto.nombre.toUpperCase()}</span>
                        <a class="btn-floating halfway-fab wabes-effect waves-light black"><i id=${
                          producto.id
                        } class="fa fa-add agregar"></i></a>
                      </div>
                      <div class="card1-content">
                          <p>${producto.desc}</p>
                          <p>$${producto.precio.toLocaleString()} pesos</p>
                      </div>
                      `;
    contenedor.appendChild(div);
  });
};
