# Bassoon IaaC

## Overview

The Bassoon project is a demo EDI (Electronic Data Interchange) clearinghouse designed to process EDIFACT transactions using AWS CDK and TypeScript. This serverless architecture leverages AWS services such as S3 for document storage, DynamoDB for transaction metadata, Lambda for processing transactions, API Gateway for API access, Cognito for user authentication, and CloudWatch for monitoring and logging. The goal of the project is to provide a scalable and flexible solution for managing EDI transactions efficiently.


## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## Notes

- **Document Storage**: EDI documents are stored in an S3 bucket that is versioned and configured to allow deletion during stack destruction.
- **Transaction Metadata**: A DynamoDB table is used to store transaction metadata, with a primary key on `transactionId`.
- **Lambda Function**: The main processing logic for EDI transactions is implemented in a Lambda function, which is triggered via API Gateway.
- **User Authentication**: The project uses AWS Cognito for user authentication, allowing for user sign-up and sign-in.
- **Monitoring**: CloudWatch dashboards are set up to monitor Lambda function invocations and errors.
- **Future Enhancements**: The architecture is designed to be extensible, allowing for the integration of additional EDI transaction types and features as needed.

---
