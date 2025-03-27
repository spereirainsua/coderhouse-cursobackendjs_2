const cartId = localStorage.getItem('cartId')

if (!cartId) {
    window.location.href = "/register"
}

const btnAddProductToCart = document.querySelectorAll('button[name="addToCart"]')
btnAddProductToCart.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        try {
            const productId = event.currentTarget.id
            const route = "/api/carts/" + localStorage.getItem('cartId') + "/product/" + productId
            const response = await fetch(route, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            Swal.fire({
                icon: "success",
                title: "Exito!",
                text: "Producto agregado al carrito!"
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Error al agregar producto al carrito: " + error.message
            })
        }
    })
})