const { default: mongoose } = require("mongoose")
const { User } = require("../Model/userModel")


const addUser = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body
        let findExist = await User.findOne({ email, status: true })
        if (findExist) {
            res.status(400).json({ message: "user exist" })
        } else {
            let adduser = {
                name, email, phone, address
            }
            let user = new User(adduser)
            await user.save()
            res.status(200).json({ message: "user added" })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const editUser = async (req, res) => {
    try {
        const { name, email, phone, address, id } = req.body
        const userID = new mongoose.Types.ObjectId(id);
        let updated = await User.findOneAndUpdate({ _id: userID, status: true }, {
            name, email, phone, address
        })
        if (updated) {
            res.status(200).json({ message: "User updated successfully" })
        } else {
            res.status(400).json({ message: "Something went wrong, try again...!" })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const getUser = async (req, res) => {
    try {
        let data = await User.find({ status: true }).lean()
        if (data.length > 0) {
            res.status(200).json({ message: "User Fetched Successfully", data: data })
        } else {
            res.status(400).json({ message: "No Data Found...", data: [] })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body
        const userID = new mongoose.Types.ObjectId(id);
        let updated = await User.findOneAndUpdate({ _id: userID, status: true }, {
            status: false
        })
        if (updated) {
            res.status(200).json({ message: "User deleted successfully" })
        } else {
            res.status(400).json({ message: "user not found, try again...!" })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}


module.exports = { addUser, editUser, getUser, deleteUser }