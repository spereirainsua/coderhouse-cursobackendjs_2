document.querySelector("#verifyForm").addEventListener("submit", async (e) => {
    try {
        e.preventDefault()
        const email = document.querySelector("#email").value
        const verifyCode = document.querySelector("#verifyCode").value
        if (!email || !verifyCode) {
            throw new Error("Datos incompletos!")
        }
        const url = "/api/auth/verify/" + email + "/code/" + verifyCode
        let response = await fetch(url)
        if(response.status != 200) {
            const error = new Error(response.error)
            throw error
        } else {
            Swal.fire({
                icon: "success",
                title: "Exito!",
                text: "Se ha verificado correctamente!"
            }).then(() => {
                location.replace("/login")
            })
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "No se pudo verificar la cuenta!"
        })
    }
})

document.querySelector("#btnLoginGoogle").addEventListener("click", async () => {
    location.replace("/api/auth/google")
})