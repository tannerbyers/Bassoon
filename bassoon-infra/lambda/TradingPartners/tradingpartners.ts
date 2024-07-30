import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (event: any) => {
  const { httpMethod } = event;

  switch (httpMethod) {
    case 'POST':
      return addTradingPartner(event);
    case 'PUT':
      return updateTradingPartner(event);
    case 'GET':
      return getTradingPartners();
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
  }
};

const addTradingPartner = async (event: any) => {
  const { id, name, version, type, status } = JSON.parse(event.body);
  const params = {
    TableName: process.env.TRADING_PARTNERS_TABLE!,
    Item: { id, name, version, type, status },
  };

  await dynamoDb.put(params).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Trading partner added successfully.' }),
  };
};

const updateTradingPartner = async (event: any) => {
  const { id, name, version, type, status } = JSON.parse(event.body);
  const params = {
    TableName: process.env.TRADING_PARTNERS_TABLE!,
    Key: { id },
    UpdateExpression: 'SET #name = :name, version = :version, type = :type, status = :status',
    ExpressionAttributeNames: {
      '#name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': name,
      ':version': version,
      ':type': type,
      ':status': status,
    },
  };

  await dynamoDb.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Trading partner updated successfully.' }),
  };
};

const getTradingPartners = async () => {
  const params = {
    TableName: process.env.TRADING_PARTNERS_TABLE!,
  };

  const data = await dynamoDb.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(data.Items),
  };
};
