const express = require("express")
const app = express()
const morgan = require("morgan")
const webPush = require("web-push")

const keys = {
    publicKey: "BPR4un9eXIGsXcVekEmxCRIZ9g5glwDXT209pxgjh-uS-D_bYa-ZX_T6L46xNJss6R2QJqdpwz9EyJE43pG9evk",
    privateKey: "RL01Uz9lmJ1USxwUu_Mccl4OFBMTIiEJasoCocVQW7A",
}

webPush.setVapidDetails("mailto:XXXXXXXXXXXXXXXXXXXXXX", keys.publicKey, keys.privateKey)

app.use(morgan("dev"))
app.use(express.static("public"))
app.use(express.json())

app.post("/push", (req, res) => {
    const subscription = req.body
    webPush.sendNotification(subscription, JSON.stringify({ body: "Hola, este es el mensaje", title: "TITULO" }))
    res.send(200)
})

const port = 4000
app.listen(port, () => {
    console.log("Listening on port:", port)
})
