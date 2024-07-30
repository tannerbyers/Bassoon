// lib/trading-partner-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class TradingPartnerStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const tradingPartnersTable = new dynamodb.Table(this, 'TradingPartnersTable', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            removalPolicy: cdk.RemovalPolicy.DESTROY, // Change to RETAIN in production
        });

        const tradingPartnerLambda = new lambda.Function(this, 'TradingPartnerFunction', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'tradingpartners.handler',
            code: lambda.Code.fromAsset('lambda/TradingPartners'),
            environment: {
                TRADING_PARTNERS_TABLE: tradingPartnersTable.tableName,
            },
        });

        // Grant Lambda permissions to read/write to the DynamoDB table
        tradingPartnersTable.grantReadWriteData(tradingPartnerLambda);

        // Create an API Gateway
        const api = new apigateway.RestApi(this, 'TradingPartnerApi', {
            restApiName: 'Trading Partner Service',
            description: 'API for managing trading partners.',
        });

        // Add routes for trading partner operations
        const partners = api.root.addResource('trading-partners');
        partners.addMethod('POST', new apigateway.LambdaIntegration(tradingPartnerLambda)); // Add partner
        partners.addMethod('PUT', new apigateway.LambdaIntegration(tradingPartnerLambda)); // Update partner
        partners.addMethod('GET', new apigateway.LambdaIntegration(tradingPartnerLambda)); // Get partners
    }
}
