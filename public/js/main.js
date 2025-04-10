const btnLogout = document.getElementById('btnLogOut')

if (btnLogout) {
    btnLogout.addEventListener('click', async () => {
        try {
            const route = "/api/auth/signout"
            const response = await fetch(route, {
                method: "POST"
            })
            const data = await response.json()
            if (data?.error) {
                const error = new Error("Error del servidor!")
                error.statusCode = 500
                throw error
            }
            Swal.fire({
                icon: "success",
                title: "Exito!",
                text: "Se ha cerrado la sesión!"
            }).then(() => {
                location.reload()
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Error: " + error.message
            })
        }
    })
}


// const goToCart = document.getElementById('goToCart')
// const url = window.location.origin + "/carts/" + localStorage.getItem('cartId')
// goToCart.innerHTML = `<a class="nav-link" href="${url}">Ir al Carrito</a>`
