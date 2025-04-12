const btnDeleteProductToCart = document.querySelectorAll('button[name="deleteFromCart"]')
btnDeleteProductToCart.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        try {
            const productId = event.currentTarget.id
            cart_id = await getCart()
            const route = "/api/carts/" + cart_id + "/product/" + productId
            const response = await fetch(route, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            if (data?.error) {
                const error = new Error("Error al quitar el producto: " + data.error.message)
                error.statusCode = 404
                throw error
            }
            Swal.fire({
                icon: "success",
                title: "Exito!",
                text: "Producto quitado correctamente!"
            }).then(() => {
                window.location.href = window.location.href
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Error al quitar el producto: " + error.message
            })
        }
    })
})