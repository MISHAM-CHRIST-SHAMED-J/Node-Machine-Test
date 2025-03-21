const express = require("express")
const { json } = require("express")
const cors = require("cors")
const { router } = require("./Router/router")
const { Database } = require("./database/database")

let PORT = 5500
const app = express()
app.use(json())
app.use(cors({ origin: "*" }));
app.use("/api", router)


Database()

app.listen(PORT, () => {
    console.log(`Server Running in PORT ${PORT}`);
})