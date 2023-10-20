const pintarProductos = (stock) => {
  const contenedor = document.getElementById("contenedor-productos");

  fetch("../stock/stock.json")
    .then((response) => response.json())
    .then((stock) => {
      stock.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("card1");
        div.innerHTML += `<div class="card1-image">
                            <img class="img_carrito" src=${item.imagen}>
                            </div>
                            <div class="card1-content">
                            <div class="product-name">
                            <span class="card1-title">${item.nombre.toUpperCase()}</span>
                            <a class="plus-icon"><i id=${
                              item.id
                            } class="fa fa-add agregar"></i></a>
                            </div>
                              <p>${item.desc}</p>
                              <p>$${item.precio.toLocaleString()} pesos</p>
                          </div>
                          `;
        contenedor.appendChild(div);
      });
      iniciarCarrito(stock);
    });
};
