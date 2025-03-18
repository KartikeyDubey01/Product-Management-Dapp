# Blockchain-Based Supply Chain DApp - Hackathon Submission

## Overview

This is a decentralized application (DApp) built using Ethereum smart contracts, React.js for the frontend, and Web3.js for blockchain interactions. The project ensures transparency and security in the supply chain by leveraging blockchain technology.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Smart Contract Details](#smart-contract-details)
- [Testing the Application](#testing-the-application)
- [Demo](#demo)
- [Judging Criteria](#judging-criteria)
- [Final Submission Steps](#final-submission-steps)

---

## Project Structure

```
├── build/                # Truffle build files (generated after compilation)
├── contracts/            # Solidity smart contracts
│   ├── SupplyChain.sol
├── migrations/           # Truffle migration scripts
├── src/                  # React frontend source code
│   ├── components/       # Reusable UI components
│   ├── contracts/        # Auto-copied contract ABIs
│   ├── App.js            # Main React application file
│   ├── blockchain.js     # Web3 setup and contract integration
│   ├── index.js          # React entry point
│   ├── SupplyChainContract.js  # Contract interaction logic
├── test/                 # Truffle tests for smart contracts
├── package.json          # Dependencies and scripts
├── truffle-config.js     # Truffle configuration for blockchain network
└── README.md             # Project documentation
```

---

## Technologies Used

- **Ethereum Blockchain** - Smart contract execution
- **Solidity** - Smart contract programming language
- **React.js** - Frontend framework
- **Web3.js** - Ethereum blockchain communication
- **Truffle** - Development framework for Ethereum
- **Ganache** - Local Ethereum blockchain for testing

---

## Setup Instructions

### 1. Prerequisites

Ensure you have the following installed:

- Node.js (`v16+` recommended)
- Truffle (`npm install -g truffle`)
- Ganache (`Download from [Truffle Suite](https://trufflesuite.com/ganache/)`)
- Metamask (`Browser extension for Ethereum wallets`)

### 2. Clone the Repository

```sh
git clone https://github.com/KartikeyDubey01/Product-Management-Dapp.git
cd Product-Management-Dapp
```

### 3. Install Dependencies

```sh
npm install
```

### 4. Start Ganache

- Open Ganache and create a new workspace.
- Use the default RPC server: `http://127.0.0.1:7545`

### 5. Compile & Deploy Smart Contracts

```sh
truffle compile
truffle migrate --reset
```

### 6. Run the Frontend

```sh
cd supply-chain-frontend
npm install --save-dev cpy-cli  # Install dependency for copying contract JSON files
npm start
```

The application will be available at `http://localhost:3000/`.

---

## Smart Contract Details

### SupplyChain.sol

```solidity
pragma solidity ^0.8.0;
contract SupplyChain {
    struct Product {
        uint id;
        string name;
        address owner;
    }
    mapping(uint => Product) public products;
    uint public productCount;
    
    function addProduct(string memory _name) public {
        productCount++;
        products[productCount] = Product(productCount, _name, msg.sender);
    }
}
```

---

## Testing the Application

### Running Smart Contract Tests

```sh
truffle test
```

Expected Output: ✔ Contract deployment ✔ Product addition works correctly

---

## Demo

A demo video showcasing the working application can be found here https://drive.google.com/drive/u/0/folders/1iJDpS0Q9p33kM57Ba7hZjGPRssusrd_S

---


