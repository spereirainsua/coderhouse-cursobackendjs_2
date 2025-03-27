const registerForm = document.getElementById("registerForm")
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    try {
        const user = document.getElementById("username").value
        const response = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: user })
        })
        const data = await response.json()
        localStorage.setItem("userId", data._id)
        localStorage.setItem("cartId", data.cartId)
        localStorage.setItem("username", data.username)
        window.location.href = "/"
    } catch (error) {
        console.log(error)
        alert("Error al registrar el usuario")
    }
})