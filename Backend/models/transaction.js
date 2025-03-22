const AWS = require("aws-sdk");
const keys = require("../config/keys");

// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: keys.awsRegion,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = keys.dynamoDBTable;

// Save payment to DynamoDB
const saveTransaction = async (transaction) => {
    const params = {
        TableName: TABLE_NAME,
        Item: transaction,
    };

    try {
        await dynamoDB.put(params).promise();
        console.log("Transaction saved successfully.");
    } catch (err) {
        console.error("Error saving transaction:", err);
    }
};

module.exports = { saveTransaction };
