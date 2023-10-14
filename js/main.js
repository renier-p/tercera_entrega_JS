const pintarProductos = (data) => {
  const contenedor = document.getElementById("contenedor-productos");

  data.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("card1");
    div.innerHTML += `<div class="card1-image">
                        <img class="img_carrito" src=${producto.imagen}>
                        </div>
                        <div class="card1-content">
                        <div class="product-name">
                        <span class="card1-title">${producto.nombre.toUpperCase()}</span>
                        <a class="plus-icon"><i id=${
                          producto.id
                        } class="fa fa-add agregar"></i></a>
                        </div>
                          <p>${producto.desc}</p>
                          <p>$${producto.precio.toLocaleString()} pesos</p>
                      </div>
                      `;
    contenedor.appendChild(div);
  });
};
