
const socketForProducts = io()

const productForm = document.getElementById("productForm")

productForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const productData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        price: parseInt(document.getElementById("price").value),
        stock: parseInt(document.getElementById("stock").value),
        category: document.getElementById("category").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    socketForProducts.emit("insert new product", productData)
    document.getElementById("title").value = ""
    document.getElementById("description").value = ""
    document.getElementById("code").value = ""
    document.getElementById("price").value = ""
    document.getElementById("stock").value = ""
    document.getElementById("category").value = ""
    document.getElementById("thumbnail").value = ""
})

socketForProducts.on("update products lists", (products) => {
    const productsContainer = document.getElementById("realTimeProductsContainer")
    document.getElementById("realTimeProductsContainer").innerHTML = ""
    products.reverse().forEach(({ pid, thumbnail, title, price, stock }) => {
        productsContainer.innerHTML += 
        `<article class="product-card">
          <div class="product-image-container">
          <img src="${ thumbnail }" alt="Imagen del producto" class="product-image">
          </div>
          <div class="product-info">
            <h3>${ title }</h3>
            <p>Precio: $${ price }<br>
            Stock: ${ stock }<br>
            <button id=${ pid } name="btnDeleteProduct">Eliminar</button>
            </p>
          </div>
        </article>`
    })

    const btnDeleteProducts = document.getElementsByName("btnDeleteProduct")
    btnDeleteProducts.forEach((product) => {
      product.addEventListener("click", (e) => {
        socketForProducts.emit("delete product", e.target.id)
      })
    })
})


socketForProducts.on("error insert products", (res) => {
  alert(res.message)
})

socketForProducts.on("error delete products", (res) => {
  alert(res.message)
})