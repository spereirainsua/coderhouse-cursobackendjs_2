fetch('http://localhost:8080/api/products')
  .then(response => response.json())
  .then(data => {
    if (data.status == "success") {
      const displayProducts = document.getElementById("product-container")
      for (let product of data.payload) {
        displayProducts.innerHTML +=
          `<article class="product-card">
          <div class="product-image-container">
          <img src="${product.thumbnail}" alt="Imagen del producto" class="product-image">
          </div>
          <div class="product-info">
            <h3>${product.title}</h3>
            <p>Precio: $${product.price}<br>
            Stock: ${product.stock}<br>
            <a href="/">Ver mas...</a></p>
          </div>
        </article>`
      }
    }
  }).catch(error => console.log("Error de conexión con el servidor " + error.message))