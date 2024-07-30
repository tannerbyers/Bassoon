const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const bucketName = process.env.BUCKET_NAME;
    const tableName = process.env.TABLE_NAME;

    // Process EDI transactions (placeholder code)
    const transactionId = '12345'; // Example transaction ID. This should be segmented by tradingpartner, date, transaction type, and a unique identifier for each request.
    const transactionData = {
        transactionId: transactionId,
        status: 'processed',
    };

    // Store transaction in S3
    await s3.putObject({
        Bucket: bucketName,
        Key: `${transactionId}.json`,
        Body: JSON.stringify(transactionData),
    }).promise();

    // Store transaction metadata in DynamoDB
    await dynamodb.put({
        TableName: tableName,
        Item: transactionData,
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Transaction processed successfully' }),
    };
};
