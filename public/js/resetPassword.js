document.querySelector("#resetForm").addEventListener("submit", async (e) => {
    try {
        e.preventDefault()

        const newPassword = document.querySelector("#newPassword").value
        const confirmPassword = document.querySelector("#confirmPassword").value

        if (!newPassword || newPassword == '' || !confirmPassword || confirmPassword == '' || newPassword !== confirmPassword) {
            const error = new Error("Datos invalidos!")
            throw error
        }
        const path = window.location.pathname;
        const verifyCode = path.substring(path.lastIndexOf('/') + 1)
        const params = {
            newPassword,
            verifyCode
        }
        const opts = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        }
        const url = "/api/auth/changePassword"
        let response = await fetch(url, opts)
        const data = await response.json()
        console.log()
        if(response.status !== 200) {
            const error = new Error(data.error)
            throw error
        } else {
            Swal.fire({
                icon: "success",
                title: "Exito!",
                text: "Se reinicio correctamente la contraseña!"
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