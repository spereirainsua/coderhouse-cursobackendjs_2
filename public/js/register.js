// const registerForm = document.getElementById("registerForm")
// registerForm.addEventListener("submit", async (event) => {
//     event.preventDefault()
//     try {
//         const user = document.getElementById("username").value
//         const response = await fetch("/register", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ user: user })
//         })
//         const data = await response.json()
//         localStorage.setItem("userId", data._id)
//         localStorage.setItem("cartId", data.cartId)
//         localStorage.setItem("username", data.username)
//         window.location.href = "/"
//     } catch (error) {
//         console.log(error)
//         alert("Error al registrar el usuario")
//     }
// })


document.querySelector("#registerForm").addEventListener("submit", async (e) => {
    try {
        e.preventDefault()

        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value
        const photo = document.querySelector("#photo").value

        if (!email || email == '' || !password || password == '') {
            const error = new Error("Datos invalidos!")
            throw error
        }

        const params = {
            ...(email && { email }),
            ...(password && { password }),
            ...(photo && photo.trim() !== '' && { photo })
        }
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        }
        const url = "/api/auth/register"
        let response = await fetch(url, opts)
        const data = await response.json()
        if(data?.error) {
            const error = new Error(data.error)
            throw error
        } else {
            Swal.fire({
                icon: "success",
                title: "Exito!",
                text: "Registro exitoso!"
            }).then(() => {
                location.replace("/login")
            })  
        }
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Error al registrar usuario: " + error.message
        })
    }
})