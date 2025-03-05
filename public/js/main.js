const btnLogout = document.getElementById('btnLogOut')

btnLogout.addEventListener('click', () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('cartId')
    localStorage.removeItem('username')
    window.location.href = "/register"
})

const goToCart = document.getElementById('goToCart')
const url = window.location.origin + "/carts/" + localStorage.getItem('cartId')
goToCart.innerHTML = `<a class="nav-link" href="${url}">Ir al Carrito</a>`

