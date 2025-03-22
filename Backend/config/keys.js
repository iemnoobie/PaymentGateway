require("dotenv").config();

module.exports = {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    awsRegion: process.env.AWS_REGION,
    dynamoDBTable: process.env.DYNAMO_DB_TABLE,
};
