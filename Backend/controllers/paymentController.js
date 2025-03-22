const Stripe = require("stripe");
const keys = require("../config/keys");
const { saveTransaction } = require("../models/transaction");

const stripe = Stripe(keys.stripeSecretKey);

// Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
    const { amount, currency, phoneNumber } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects amount in cents
            currency,
            metadata: {
                phoneNumber: phoneNumber,
            },
        });

        // Save transaction to DynamoDB
        const transaction = {
            paymentId: paymentIntent.id,
            amount: amount,
            currency: currency,
            phoneNumber: phoneNumber,
            status: "Pending",
            createdAt: new Date().toISOString(),
        };
        await saveTransaction(transaction);

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(400).send({
            error: error.message,
        });
    }
};

// Update Payment Status after Payment
exports.updatePaymentStatus = async (paymentId, status) => {
    const params = {
        TableName: keys.dynamoDBTable,
        Key: { paymentId: paymentId },
        UpdateExpression: "set #st = :s",
        ExpressionAttributeNames: {
            "#st": "status",
        },
        ExpressionAttributeValues: {
            ":s": status,
        },
    };

    try {
        await dynamoDB.update(params).promise();
        console.log(`Payment status updated to ${status}`);
    } catch (err) {
        console.error("Error updating payment status:", err);
    }
};
