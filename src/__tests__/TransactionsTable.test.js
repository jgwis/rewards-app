import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionsTable from '../components/TransactionsTable'; // Adjust the path as needed

// Example mock data for testing
const mockTransactions = [
  {
    customerId: 12345,
    transactionId: 1001,
    customerName: 'John Doe',
    purchaseDate: '2023-12-15',
    productPurchased: 'Laptop',
    price: 120,
    rewardPoints: 90,
  },
  {
    customerId: 67890,
    transactionId: 1002,
    customerName: 'Jane Smith',
    purchaseDate: '2023-12-20',
    productPurchased: 'Phone',
    price: 50,
    rewardPoints: 0,
  },
];

test('renders transactions table with data', () => {
  render(<TransactionsTable transactions={mockTransactions} />);

  // Check if table headers are rendered
  expect(screen.getByText(/Transaction ID/i)).toBeInTheDocument();
  expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Purchase Date/i)).toBeInTheDocument();
  expect(screen.getByText(/Product Purchased/i)).toBeInTheDocument();
  expect(screen.getByText(/Price/i)).toBeInTheDocument();
  expect(screen.getByText(/Reward Points/i)).toBeInTheDocument();

  // Assert table row elements for each transaction
  mockTransactions.forEach((transaction) => {
    expect(screen.getByText(transaction.transactionId)).toBeInTheDocument();
    expect(screen.getByText(transaction.customerName)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(transaction.purchaseDate).toLocaleDateString()),
    ).toBeInTheDocument();
    expect(screen.getByText(transaction.productPurchased)).toBeInTheDocument();
    expect(
      screen.getByText(`$${transaction.price.toFixed(2)}`),
    ).toBeInTheDocument(); // Format price with two decimals
    expect(screen.getByText(transaction.rewardPoints)).toBeInTheDocument();
  });
});
