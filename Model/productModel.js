const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    available_qty: { type: Number },
    status: { type: Boolean, default: true }
}, { timestamps: true })

let Product = mongoose.model("Nodeuproduct", productSchema);

module.exports = { Product }
