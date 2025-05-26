document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    try {
        e.preventDefault()
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
        }
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        const url = "/api/auth/login"
        let response = await fetch(url, opts)
        if(response.status != 200) {
            const data = await response.json()
            const error = new Error(data.error)
            throw error
        } else {
            Swal.fire({
                icon: "success",
                title: "Exito!",
                text: "Se ha iniciado sesión correctamente!"
            }).then(() => {
                location.replace("/")
            })
        }
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: error.message
        })
    }
})

document.querySelector("#btnLoginGoogle").addEventListener("click", async () => {
    location.replace("/api/auth/google")
})
document.querySelector("#btnVerifyAccount").addEventListener("click", async () => {
    location.replace("/verify")
})
