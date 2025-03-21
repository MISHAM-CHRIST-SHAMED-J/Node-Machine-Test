const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    address: { type: String },
    status: { type: Boolean, default: true }
}, { timestamps: true })

let User = mongoose.model("Nodeuser", userSchema);

module.exports = { User }
