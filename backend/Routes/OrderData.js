const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        data.unshift({ Order_date: req.body.order_date });

        let existingOrder = await Order.findOne({ email: req.body.email });

        if (!existingOrder) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

router.post('/myOrder', async (req, res) => {
    try {
        const email = req.body.email;
        console.log("Received email for query:", email);
        
        let myData = await Order.findOne({ email });
        console.log("Query result:", myData);

        if (!myData) {
            console.log("No data found for email:", email);
        }

        res.json({ orderData: myData ? myData.order_data : null });
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});








module.exports = router;
