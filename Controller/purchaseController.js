const mongoose = require("mongoose");
const { Purchase } = require("../Model/purchaseModel")

const addPurchase = async (req, res) => {
    try {
        const { product_id, user_id } = req.body
        const userID = new mongoose.Types.ObjectId(user_id);
        const ProdID = new mongoose.Types.ObjectId(product_id);
        let findExist = await Purchase.findOne({ product_id: ProdID, user_id: userID, status: true })
        if (findExist) {
            res.status(400).json({ message: "Transaction exist!" })
        } else {
            let addTrans = {
                product_id, user_id
            }
            let Transactions = new Purchase(addTrans)
            await Transactions.save()
            res.status(200).json({ message: "Transaction completed." })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error })
    }
}

const getPurchase = async (req, res) => {
    try {
        let data = await Purchase.aggregate(
            [
                {
                    $lookup: {
                        from: 'nodeuproducts',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'productDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'nodeusers',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                }
            ])

        if (data.length > 0) {
            res.status(200).json({ message: "Data Fetched Successfully", data: data })
        } else {
            res.status(400).json({ message: "No Data Found...", data: [] })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error })
    }
}



module.exports = { addPurchase, getPurchase }