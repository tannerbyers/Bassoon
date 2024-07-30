import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';

export class BassoonInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket for document storage
    const bucket = new s3.Bucket(this, 'BassoonBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // DynamoDB table for transaction metadata
    const table = new dynamodb.Table(this, 'BassoonTable', {
      partitionKey: { name: 'transactionId', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // IAM role for Lambda functions
    const lambdaRole = new iam.Role(this, 'BassoonLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });
    lambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));

    // Lambda function for processing EDI transactions
    const processEDILambda = new lambda.Function(this, 'ProcessEDILambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
      role: lambdaRole,
      environment: {
        BUCKET_NAME: bucket.bucketName,
        TABLE_NAME: table.tableName,
      },
    });

    bucket.grantReadWrite(processEDILambda);
    table.grantReadWriteData(processEDILambda);

    // API Gateway for accessing the Lambda function
    const api = new apigateway.RestApi(this, 'BassoonAPI', {
      restApiName: 'Bassoon Service',
      description: 'This service handles EDI transactions.',
    });

    const getTransactionsIntegration = new apigateway.LambdaIntegration(processEDILambda);
    api.root.addMethod('GET', getTransactionsIntegration);

    // Cognito User Pool for authentication
    const userPool = new cognito.UserPool(this, 'BassoonUserPool', {
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      userPoolName: 'BassoonUserPool',
    });

    const userPoolClient = new cognito.UserPoolClient(this, 'BassoonUserPoolClient', {
      userPool,
    });

    // CloudWatch dashboard for monitoring
    const dashboard = new cloudwatch.Dashboard(this, 'BassoonDashboard', {
      dashboardName: 'BassoonDashboard',
    });

    // Add Lambda metrics to the dashboard
    dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'Lambda Invocations',
        left: [processEDILambda.metricInvocations()],
      }),
      new cloudwatch.GraphWidget({
        title: 'Lambda Errors',
        left: [processEDILambda.metricErrors()],
      })
    );
  }
}
