# Rewards App

A web application built using React.js that calculates and displays rewards points for transactions. It takes in a list of customer transactions, calculates reward points based on transaction data, and displays them in a table format. The app also supports displaying monthly rewards and total rewards for each customer.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Approach](#approach)
- [Directory Structure](#directory-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Testing](#Test)
- [Errors and Troubleshooting](#errors-and-troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Rewards App is designed to help track customer transactions and calculate rewards points based on product purchases. The main features include:

1. **User Monthly Rewards Table**: Displays details of User Monthly Rewards, such as Customer ID, customer name, month, year, and reward points.

2. **Transaction Table**: Displays details of transactions, such as transaction ID, customer name, product purchased, price, and reward points.
3. **Rewards Table**: Shows the total rewards accumulated by each customer and the breakdown by month.
4. **Dynamic Calculations**: The app dynamically calculates rewards points for customers as new transactions are added.

This project uses modern JavaScript features and React 18 for building the user interface, and integrates with ESLint and Prettier for code linting and formatting.

## Technologies Used

- **React.js** for building the user interface.
- **ESLint** for linting JavaScript code to maintain code quality.
- **Prettier** for automatic code formatting.
- **Babel** for transpiling modern JavaScript and JSX syntax.
- **PropTypes** for type-checking React props.
- **JavaScript (ES6+)** for writing clean and modern JavaScript code.

## Approach

1. **Data Structure**: Transaction data is organized by customer, and each customer has multiple monthly transactions. Reward points are associated with each transaction.
2. **Calculating Total Rewards**: The total rewards for a customer are calculated by summing the reward points from each transaction.
3. **Rendering Data**: Data is displayed in three main tables:
   - The **User Monthly Rewards Table** lists individual for User Monthly Rewards.
   - The **Transactions Table** lists individual transactions.
   - The **Rewards Table** aggregates the total rewards for each customer.
4. **Sorting and Filtering**: The tables support sorting by transaction date and filtering by customer or product name.

## Directory Structure

rewards-app/
├── node_modules/           # Node.js dependencies
├── public/
│   ├── index.html          # Main HTML file
│   └── ...                 # Static files (images, icons, etc.)
├── src/
│   ├── components/         # React components like Tables and Loader
│   │   ├── UserMonthlyRewardsTable.js  # Table displaying User Monthly Rewards
│   │   ├── TransactionsTable.js  # Table displaying transactions
│   │   ├── TotalRewardsTable.js # Table displaying rewards summary
│   │   └── Loader.js            # Loading Loader component
│   ├── /__tests__
│   │   ├── UserMonthlyRewardsTable.test.js
│   │   ├── TransactionsTable.test.js
│   │   ├── TotalRewardsTable.test.js
│   ├── utils/              # Utility functions
│   │   └── calculateRewardPoints.js # Function to calculate rewards
│   │   └── aggregateRewards.js # Function to calculate rewards Monthly/Yearly
│   │   └── data.js             # Custom json data
│   ├── App.js              # Main component rendering the app structure
│   ├── index.js            # Entry point for React application
│   ├── setupTests.js       # For Test
│   └── index.css           # Global styles
├── .eslintrc.js            # ESLint configuration
├── babel.config.js         # Babel configuration
├── package.json            # Project dependencies and scripts
└── README.md               # This README file

## Key Components
src/index.js: Entry point of the React application.
src/App.js: Main component where the structure of the app is defined. It includes the User Monthly Rewards Table, Transactions Table and Total Rewards Table.
src/components/UserMonthlyRewardsTable.js: Component to display user monthly rewards.
src/components/TransactionsTable.js: Displays a table of individual transactions with relevant details.
src/components/TotalRewardsTable.js: Displays the total rewards points for each customer and aggregates monthly data.
src/utils/calculateRewardPoints.js: A utility function to calculate the total rewards points for a customer based on their monthly transactions.
src/utils/aggregateRewards.js: A utility function to logic the total rewards points for a customer based on their monthly/yearly transactions.
setupTests.js: Jest setup for running tests with React Testing Library.

## Features

User Rewards Monthly, Transaction and Reward Tables: The app displays three main tables — one for User Rewards Monthly, - second for Transactions  and other for the rewards summary.

Sorting and Filtering: The transaction table supports sorting by date and filtering by customer name and product.

Clean and Formatted Code: ESLint and Prettier ensure that the code is clean, consistent, and easy to maintain.

## Installation 

1. Clone the repository:
git clone https://github.com/jgwis/rewards-app.git
cd rewards-app

2. Install dependencies:
npm install

3. Start the application:
npm start
This will start the development server, and the app will be available at http://localhost:3000.

## Usage
Once the app is running:

User Monthly Rewards Table: The table displays User Monthly Rewards details like Customer ID, Customer name, Month, Year, and reward points.

Transactions Table: The table displays transaction details like transaction ID, customer name, purchase date, product purchased, price, and reward points.

Rewards Table: This table shows the total rewards for each customer, calculated based on their monthly transaction data.

## Screenshots

1. Main Page - User Monthly Rewards Table
![image](https://github.com/user-attachments/assets/47ea4040-c6d4-4543-9a36-afcd1432c005)


2. Main Page - Transactions Table
![image](https://github.com/user-attachments/assets/92eab8cf-fa50-46fd-9e79-d0284498d15a)

2. Main Page - Rewards Table
![image](https://github.com/user-attachments/assets/01ca1e1d-aaf7-4108-9556-6bcd7b8f776a)

## Testing
This project includes unit tests for each component using Jest and React Testing Library.
Running Tests
To run the tests, execute the following command in the terminal:
npm test

## Errors and Troubleshooting

Error: Parsing error: This experimental syntax requires enabling one of the following parser plugin(s): "jsx", "flow", "typescript"
Solution:
Make sure the correct ESLint parser configured to support JSX. Add this to .eslintrc.js file:

js
module.exports = {
  parser: 'babel-eslint', // Ensure Babel parser is used for JSX
  ...
};

Error: "React version not specified in eslint-plugin-react settings"
Solution:
If using React 17 or later, specify the React version in .eslintrc.js file:

js
module.exports = {
  settings: {
    react: {
      version: 'detect', // Automatically detects the installed React version
    },
  },
  ...
};

Error: "Insert ␍ or Insert ," (Prettier Issues)
Solution:
Ensure code adheres to the Prettier format. You can run Prettier manually on files:

npx prettier --write .
Or, if using VSCode, ensure the Prettier extension is installed and configured to format on save.
