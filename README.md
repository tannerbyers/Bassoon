## Bassoon - A fun cloud based EDI clearinghouse 

<p align="center">
  <img src="./readme-assets/instrument-cornemuse_optimized.png" />
</p>

---

## Table of Contents
- [FAQ](#faq)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Useful Links](#useful-links)

## FAQ

Q: What makes it fun? 

A: It's fast, open source and doesn't use X12 (because mandated healthcare standards that are paywalled behind insane licensing fees are not fun)

Q: Should I use this at work? 

A: Bassoon is a great starting point for processing EDIFACT files in the cloud but it is nowhere near production ready. Sev-1's are not fun.

## Features

### 1. Document Management
- [ ] **Storage**: S3
- [ ] **Search**: DynamoDB

### 2. EDI Protocols and Standards
- [ ] **Supported Protocol**: EDIFACT (initial implementation)
  - [ ] Note: X12 will not be supported due to proprietary constraints.
- [ ] **Transaction Type**: Starting with purchase orders (ORDERS)

### 3. EDI Transaction and Community Management
- [ ] **Document Tracking and Searching**
- [ ] **Duplicate Checking**
- [ ] **Trading Partner Management**
  - [ ] Group/Label
  - [ ] Lookup
  - [ ] Configurable Setup: Fields include name, ID, transaction version, transaction type, and status.

### 4. EDI Translation and Mapping
- [ ] **Automated Acknowledgment Generation**
- [ ] **Bulk/Batch Data Loading**
- [ ] **Enveloping and De-enveloping Message Services**
- [ ] **Message Parser**
- [ ] **Rules-Based Routing**
- [ ] **Validation Rules**

### 5. Integrations and Extensibility
- [ ] **Extensibility**
- [ ] **Future Integrations**

### 6. Platform Capabilities and Security
- [ ] **Audit Logs**
- [ ] **Dashboards**
- [ ] **Data Masking**: Mask sensitive data in transit and at rest, especially PHI fields.
- [ ] **Encryption**: Encrypt data in transit and at rest using AWS KMS.
- [ ] **Compliance**: Ensure compliance with FIPS 140-2, GDPR, ISO, and SOC standards.
- [ ] **MIC Algorithms**: Support for SHA1 and MD5.
- [ ] **Pre-Built Reports**: 
  - [ ] Number of transactions
  - [ ] Number of transactions rejected
  - [ ] Number of transactions processed (daily, weekly, monthly)
- [ ] **Role-Based Access Control**: Using AWS IAM
  - [ ] Roles: Guest (view report URLs), Users (configure trading partners), Admins (configure everything)
- [ ] **Single Sign-On (SSO)**
- [ ] **System Notifications and Alerts**: Real-time notifications and alerts via email.

## Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/yourusername/bassoon.git
   cd bassoon
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Deploy the Infrastructure**
   ```sh
   npx cdk deploy
   ```

## Usage

1. **Configure Trading Partners**
   - Set up trading partners with necessary fields such as name, ID, transaction version, transaction type, and status.

2. **Process Transactions**
   - Upload EDIFACT transactions to the configured S3 bucket.
   - Monitor transaction processing via dashboards and audit logs.

3. **Access Reports**
   - View pre-built reports on the number of transactions, rejected transactions, and processed transactions over various periods.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
2. **Create a Branch**
   ```sh
   git checkout -b feature/your-feature
   ```

3. **Commit Your Changes**
   ```sh
   git commit -m 'Add some feature'
   ```

4. **Push to the Branch**
   ```sh
   git push origin feature/your-feature
   ```

5. **Open a Pull Request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Useful Links
- [EDI Requirements](https://www.selecthub.com/electronic-data-interchange/edi-requirements/#3_EDI_Transaction_and_Community_Management)
- [EDIFACT Message Formats](https://www.edi-plus.com/resources/message-formats/edifact/)
- [ts-edifact GitHub Repository](https://github.com/RovoMe/ts-edifact)
- [UNECE EDIFACT Standard](https://service.unece.org/trade/untdid/d00a/trmd/impdef_c.htm)

