const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

let Database = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected....");
    } catch (error) {
        console.log("Problem with connecting Database....");

    }
}

module.exports = { Database }
