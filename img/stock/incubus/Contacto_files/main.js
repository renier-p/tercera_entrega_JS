const pintarProductos = (data) => {
  const contenedor = document.getElementById("contenedor-productos");

  data.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("card1");
    div.innerHTML += `<div class="card1-image">
                        <img class="img_carrito" src=${producto.imagen}>
                        <span class="card1-title">${producto.nombre}</span>
                        <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${
                          producto.id
                        } class="material-icons agregar">agregar_al_carrito</i></a>
                      </div>
                      <div class="card1-content">
                          <p>${producto.desc}</p>
                          <p>$${producto.precio.toLocaleString()}</p>
                      </div>
                      `;
    contenedor.appendChild(div);
  });
};
