self.addEventListener("push", (e) => {
    const notification = e.data.json()
    registration.showNotification(notification.title, notification)
})
