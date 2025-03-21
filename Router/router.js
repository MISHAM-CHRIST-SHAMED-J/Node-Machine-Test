const express = require("express")
const { addUser, getUser, editUser, deleteUser } = require("../Controller/userController")
const { addProduct, getProduct, editProduct, deleteProduct } = require("../Controller/productController")
const { getPurchase, addPurchase } = require("../Controller/purchaseController")

let router = express.Router()

//User
router.get("/getUser", getUser)
router.post("/addUser", addUser)
router.patch("/editUser", editUser)
router.patch("/deleteUser", deleteUser)

//Product
router.get("/getProduct", getProduct)
router.post("/addProduct", addProduct)
router.patch("/editProduct", editProduct)
router.patch("/deleteProduct", deleteProduct)

//Purchase
router.get("/getPurchase", getPurchase)
router.post("/addPurchase", addPurchase)


module.exports = { router }