const mongoose = require("mongoose");
const { Product } = require("./productModel");
const { User } = require("./userModel");

const purchaseSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: Product },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: User },
    status: { type: Boolean, default: true }
}, { timestamps: true })

let Purchase = mongoose.model("Nodepurchase", purchaseSchema);

module.exports = { Purchase }
