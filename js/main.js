const pintarProductos = () => {
  const contenedor = document.getElementById("contenedor-productos");

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      fetch("../stock/stock.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((stock) => {
          resolve(stock);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  fetchData()
    .then((stock) => {
      const elements = stock.map((item) => {
        const div = document.createElement("div");
        div.classList.add("card1");
        div.innerHTML = `<div class="card1-image">
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
                          </div>`;
        contenedor.appendChild(div);
        return div;
      });

      iniciarCarrito(stock);
    })
    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });
};
