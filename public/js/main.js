const btnCart = document.getElementById('btnCart')
const btnLogout = document.getElementById('btnLogOut')

async function getCart() {
    let route = "/api/auth/online"
    let response = await fetch(route, {
        method: "POST"
    })
    if (response.status != 200) {
        throw new Error("No autenticado!")
    }
    route = "/api/carts/getCart"
    response = await fetch(route, {
        method: "GET"
    })
    let data = await response.json()
    if (!data.response) {
        route = "/api/carts"
        response = await fetch(route, {
            method: "POST"
        })
        data = await response.json()
    }
    return data.response._id
}

let cart_id = 0

if (btnCart) {
    btnCart.addEventListener("click", async () => {
        getCart().then(response => {
            cart_id = response
        }).then(() => {
            location.replace("/carts/" + cart_id)
        })
    })
}

if (btnLogout) {
    btnLogout.addEventListener('click', async () => {
        try {
            const route = "/api/auth/signout"
            const response = await fetch(route, {
                method: "POST"
            })
            const data = await response.json()
            if (data?.error) {
                const error = new Error("No hay sesión activa!")
                error.statusCode = 404
                throw error
            }
            Swal.fire({
                icon: "success",
                title: "Exito!",
                text: "Se ha cerrado la sesión!"
            }).then(() => {
                location.replace("/")
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
