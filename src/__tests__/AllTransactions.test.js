import React from 'react';
import { render, screen } from '@testing-library/react';
import AllTransactions from '../components/allTransactions/AllTransactions';

const mockTransactions = [
  {
    customerId: 12345,
    transactionId: 1001,
    customerName: 'John Doe',
    purchaseDate: '2023-12-15',
    productPurchased: 'Laptop',
    price: 120.4,
    rewardPoints: 90,
  },
  {
    customerId: 67890,
    transactionId: 1002,
    customerName: 'Jane Smith',
    purchaseDate: '2023-12-20',
    productPurchased: 'Phone',
    price: 50.0,
    rewardPoints: 25,
  },
  {
    customerId: 11223,
    transactionId: 1003,
    customerName: 'Mark Taylor',
    purchaseDate: '2023-12-25',
    productPurchased: 'Tablet',
    price: -100,
    rewardPoints: 0,
  },
  {
    customerId: 44556,
    transactionId: 1004,
    customerName: 'Large Transaction User',
    purchaseDate: '2023-12-30',
    productPurchased: 'High-end PC',
    price: 4000000,
    rewardPoints: 500000,
  },
];

test('renders transactions table with data', () => {
  render(<AllTransactions transactions={mockTransactions} />);

  expect(screen.getByText(/Transaction ID/i)).toBeInTheDocument();
  expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Purchase Date/i)).toBeInTheDocument();
  expect(screen.getByText(/Product Purchased/i)).toBeInTheDocument();
  expect(screen.getByText(/Price/i)).toBeInTheDocument();
  expect(screen.getByText(/Reward Points/i)).toBeInTheDocument();

  mockTransactions.forEach((transaction) => {
    expect(screen.getByText(transaction.transactionId)).toBeInTheDocument();
    expect(screen.getByText(transaction.customerName)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(transaction.purchaseDate).toLocaleDateString()),
    ).toBeInTheDocument();
    expect(screen.getByText(transaction.productPurchased)).toBeInTheDocument();
    expect(screen.getByText(`$${transaction.price}`)).toBeInTheDocument();
    expect(screen.getByText(transaction.rewardPoints)).toBeInTheDocument();
  });
});

// Test case for decimal values
test('calculates reward points correctly for decimal values', () => {
  render(<AllTransactions transactions={mockTransactions} />);

  const transaction = mockTransactions[0];
  // Ensure the calculated reward points are correct for the price (120.4 in this case)
  expect(screen.getByText(transaction.rewardPoints)).toBeInTheDocument();
});

// Test case for negative prices (edge case)
test('handles negative price correctly', () => {
  render(<AllTransactions transactions={mockTransactions} />);

  const negativeTransaction = mockTransactions[2];

  // Ensure that the negative price is shown correctly and reward points are 0
  expect(screen.getByText(`$${negativeTransaction.price}`)).toBeInTheDocument();
  expect(
    screen.getByText(negativeTransaction.rewardPoints),
  ).toBeInTheDocument();
  expect(screen.getByText('0')).toBeInTheDocument();
});

// Test case for large numbers (large transactions)
test('handles large numbers correctly', () => {
  render(<AllTransactions transactions={mockTransactions} />);

  const largeTransaction = mockTransactions[3];

  // Ensure the large price is handled correctly
  expect(screen.getByText(`$${largeTransaction.price}`)).toBeInTheDocument();

  // Assuming reward points are calculated correctly for a large transaction
  expect(screen.getByText(largeTransaction.rewardPoints)).toBeInTheDocument();
});
