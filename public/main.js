let subscription
const subscribe = async () => {
    console.log("Registrando Service Worker")
    const register = await navigator.serviceWorker.register("/sw.js", { scope: "/" })
    console.log("Service worker registrado")
    subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BPR4un9eXIGsXcVekEmxCRIZ9g5glwDXT209pxgjh-uS-D_bYa-ZX_T6L46xNJss6R2QJqdpwz9EyJE43pG9evk",
    })
}

const notification = async (subscription) => {
    try {
        console.log("enviando peticion")
        await fetch("/push", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (error) {
        console.log(error)
    }
}

const $button = document.querySelector("#button")
$button.addEventListener("click", async () => {
    notification(subscription)
})

subscribe()
