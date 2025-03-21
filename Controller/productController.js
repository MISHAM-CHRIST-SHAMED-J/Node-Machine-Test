const { default: mongoose } = require("mongoose")
const { Product } = require("../Model/productModel")

const addProduct = async (req, res) => {
    try {
        const { id, name, description, price, available_qty } = req.body
        let findExist = await Product.findOne({ id, status: true })
        if (findExist) {
            res.status(400).json({ message: "product exist" })
        } else {
            let addprod = {
                id, name, description, price, available_qty
            }
            let Products = new Product(addprod)
            await Products.save()
            res.status(200).json({ message: "product added" })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const editProduct = async (req, res) => {
    try {
        const { id, name, description, price, available_qty, _id } = req.body
        const ProdID = new mongoose.Types.ObjectId(_id);
        let updated = await Product.findOneAndUpdate({ _id: ProdID, status: true }, {
            id, name, description, price, available_qty
        })
        if (updated) {
            res.status(200).json({ message: "Product updated successfully" })
        } else {
            res.status(400).json({ message: "Something went wrong, try again...!" })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const getProduct = async (req, res) => {
    try {
        let data = await Product.find({ status: true }).lean()
        if (data.length > 0) {
            res.status(200).json({ message: "Product Fetched Successfully", data: data })
        } else {
            res.status(400).json({ message: "No Data Found...", data: [] })
        }
    } catch (error) {
        res.status(400).json({ message: error })

    }
}

const deleteProduct = async (req, res) => {
    try {
        const { _id } = req.body
        const ProdID = new mongoose.Types.ObjectId(_id);
        let updated = await Product.findOneAndUpdate({ _id: ProdID, status: true }, {
            status: false
        })
        if (updated) {
            res.status(200).json({ message: "Product deleted successfully" })
        } else {
            res.status(400).json({ message: "Product not found, try again...!" })
        }
    } catch (error) {
        res.status(400).json({ message: error })

    }
}


module.exports = { addProduct, editProduct, getProduct, deleteProduct }