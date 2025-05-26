document.querySelector("#recoveryForm").addEventListener("submit", async (e) => {
    try {
        e.preventDefault()
        const email = document.querySelector("#email").value
        if (!email) {
            throw new Error("Datos incompletos!")
        }
        const url = "/api/auth/passwordRecovery/" + email
        let response = await fetch(url)
        if(response.status != 200) {
            const error = new Error(response.error)
            throw error
        } else {
            Swal.fire({
                icon: "success",
                title: "Exito!",
                text: "Se ha enviado un email con los datos para resetear la contraseña!"
            }).then(() => {
                location.replace("/login")
            })
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "No se encontro la cuenta!"
        })
    }
})