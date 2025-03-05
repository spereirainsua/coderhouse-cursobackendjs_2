const cartId = localStorage.getItem('cartId')

if (!cartId) {
    window.location.href = "/register"
}

const btnDeleteProductToCart = document.querySelectorAll('button[name="deleteFromCart"]')
btnDeleteProductToCart.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        try {
            const productId = event.currentTarget.id
            const route = "/api/carts/" + localStorage.getItem('cartId') + "/product/" + productId
            const response = await fetch(route, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            console.log(data)
            if (data.status == "success") {
                Swal.fire({
                    icon: "success",
                    title: "Exito!",
                    text: "Producto quitado correctamente!"
                }).then(() => {
                    window.location.href = window.location.href
                })
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Error al quitar el producto: " + error.message
            })
        }
    })
})