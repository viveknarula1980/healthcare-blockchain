# Healthcare Blockchain - Bank Loan Contract

This is a  **Bank Loan Contract** built using **Solidity** that allows borrowers to request loans, and banks to approve or reject them. It also allows the borrower to repay loans with interest. The contract includes tracking of loan requests, approvals, repayments, and the interest calculation.

---

## Features

- **Loan Request**: Borrowers can request a loan by specifying the amount, interest rate, and loan term.
- **Loan Approval/Denial**: The bank can approve or reject loan requests.
- **Loan Repayment**: Borrowers can repay the loan once it is approved.
- **Interest Calculation**: Interest is calculated based on the loan amount, interest rate, and loan term.
- **Loan Tracking**: The contract keeps track of each loan's status, including approval and repayment.

---

## Contract Functions

### 1. `requestLoan(uint256 _amount, uint256 _interestRate, uint256 _loanTerm)`
- Allows a borrower to request a loan.
- **Parameters**:
  - `_amount`: The loan amount requested.
  - `_interestRate`: The annual interest rate (in percentage).
  - `_loanTerm`: The loan term in years.

### 2. `approveLoan(uint256 loanId)`
- Allows the bank (contract owner) to approve a loan.
- **Parameters**:
  - `loanId`: The ID of the loan to approve.

### 3. `rejectLoan(uint256 loanId)`
- Allows the bank (contract owner) to reject a loan.
- **Parameters**:
  - `loanId`: The ID of the loan to reject.

### 4. `calculateInterest(uint256 loanId)`
- Calculates the interest for a given loan.
- **Parameters**:
  - `loanId`: The ID of the loan.
- **Returns**: The interest amount for the loan.

### 5. `repayLoan(uint256 loanId)`
- Allows the borrower to repay the full loan.
- **Parameters**:
  - `loanId`: The ID of the loan being repaid.
- **Requires**: The repayment amount must match the outstanding loan balance.

### 6. `checkLoanBalance(uint256 loanId)`
- Allows anyone to check the remaining loan balance for a given loan.
- **Parameters**:
  - `loanId`: The ID of the loan.
- **Returns**: The outstanding balance on the loan.

### 7. `loanStatus(uint256 loanId)`
- Allows anyone to check the status of a loan (whether it is approved and repaid).
- **Parameters**:
  - `loanId`: The ID of the loan.
- **Returns**: Two boolean values indicating whether the loan is approved and repaid.



1.Clone the repository:
git clone https://github.com/viveknarula1980/healthcare-blockchain.git

2.Navigate into the project directory:
cd healthcare-blockchain

3.Install dependencies:
npm install



Requirements
To get started with the Bank Loan Contract built with Solidity, make sure you have the following tools installed on your local machine:

1. Node.js:
.Version: v12.x.x or higher
.Installation: Download Node.js
.Node.js is required to run the development environment and manage project dependencies.

3. npm (Node Package Manager):
.npm is bundled with Node.js and is used to install required dependencies for the project.

5. Truffle:
.Version: Latest stable version (v5.x.x or higher)
.Installation: Run the following command to install Truffle globally:
 bash
.npm install -g truffle
.Truffle is a popular development framework for Ethereum that helps compile, test, and deploy smart contracts.

7. Ganache (Optional):
.Version: Latest version
.Installation: Download Ganache
.Ganache is a personal Ethereum blockchain used to deploy contracts, develop, and run tests.

9. Metamask (Optional):
.Installation: Install Metamask
.Metamask is a browser extension wallet that allows you to interact with the Ethereum network. You can use it for deploying contracts to live networks or testnets like Rinkeby

11. Infura (Optional, for deploying to testnet or mainnet):
.Sign up: Create an account on Infura
.Infura allows you to connect to Ethereum networks without running a full node. You'll need an API key to interact with testnets and the main Ethereum network.



![image](https://github.com/user-attachments/assets/c118314c-a1c3-44f8-8cec-a791720bd1d0)


## Contributing:

Contributions are welcome! Please open an issue to discuss proposed changes or submit a pull request.


