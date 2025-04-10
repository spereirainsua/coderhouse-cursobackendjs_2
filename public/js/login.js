document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    try {
        e.preventDefault()
        
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
        }
        console.log("dio clic en login "+ data)
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        const url = "/api/auth/login"
        let response = await fetch(url, opts)
        if(response?.error) {
            const error = new Error(response.error)
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
    }
})

document.querySelector("#btnLoginGoogle").addEventListener("click", async () => {
    location.replace("/api/auth/google")
})