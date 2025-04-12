const btnAddProductToCart = document.querySelectorAll('button[name="addToCart"]')
btnAddProductToCart.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        try {
            const productId = event.currentTarget.id
            cart_id = await getCart()
            const route = "/api/carts/" + cart_id + "/product/" + productId
            const response = await fetch(route, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            if (data?.error) {
                const error = new Error("Se requiere iniciar sesión!")
                error.statusCode = 401
                throw error
            }
            Swal.fire({
                icon: "success",
                title: "Exito!",
                text: "Producto agregado al carrito!"
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "No se pudo agregar producto: " + error.message
            })
        }
    })
})