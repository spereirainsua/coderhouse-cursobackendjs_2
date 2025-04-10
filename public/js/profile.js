const findUser = async () => {
    try {
        // const token = obtener de local storage
        const opts = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        }
        const url = "/api/auth/me"
        let response = await fetch(url, opts)
        response = await response.json()

    } catch (error) {
        console.log(error)
    }
}