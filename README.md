# Bassoon
A demo EDI clearinghouse for processing EDIFACT transactions built with AWS CDK &amp; TS

> **_NOTE:_** Might rewrite with [winglang](https://www.winglang.io/)

## Requirements

1. Document Management
Storage in S3
Search in DynamoDB

2. EDI Protocols and Standards
EDIFACT: Initial implementation will support EDIFACT protocol (X12, you will forever be the propietary bane of my existence).
Transaction Type: Starting with purchase orders (ORDERS).

3. EDI Transaction and Community Management
Document Tracking and Searching
Duplicate Checking
Trading Partner Group/Label
Trading Partner Lookup
Trading Partner Setup: Configurable setup for trading partners with fields such as name, ID, transaction version, transaction type, and status.

4. EDI Translation and Mapping
Automated Acknowledgment Generation
Bulk/Batch Data Loading
Enveloping and De-enveloping Message Services
Message Parser
Rules-Based Routing
Validation Rules

5. Integrations and Extensibility
Extensibility
Future Integrations

6. Platform Capabilities and Security
Audit Logs
Dashboards
Data Masking: Mask sensitive data in transit and at rest, particularly fields considered PHI.
Encryption: Encrypt data in transit and at rest using AWS KMS.
Compliance: Ensure compliance with FIPS 140-2, GDPR, ISO, and SOC.
MIC Algorithms: Support for SHA1 and MD5.
Pre-Built Reports: Reports for the number of transactions, the number of transactions rejected, and the number of transactions processed over the day, week, and month.
Role-Based Access Control: Implement role-based access control using AWS IAM. Roles include Guest (view report URLs), Users (configure trading partners), and Admins (configure everything).
Single Sign-On (SSO)
System Notifications and Alerts: Real-time notifications and alerts using email.


# links

https://www.selecthub.com/electronic-data-interchange/edi-requirements/#3_EDI_Transaction_and_Community_Management
https://www.edi-plus.com/resources/message-formats/edifact/
https://github.com/RovoMe/ts-edifact
https://service.unece.org/trade/untdid/d00a/trmd/impdef_c.htm
