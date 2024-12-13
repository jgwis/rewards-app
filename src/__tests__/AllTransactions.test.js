import React from 'react';
import { render, screen } from '@testing-library/react';
import AllTransactions from '../components/AllTransactions';

const mockTransactions = [
  {
    customerId: 12345,
    transactionId: 1001,
    customerName: 'John Doe',
    purchaseDate: '2024-12-10',
    productPurchased: 'Laptop',
    price: 120.4,
    rewardPoints: 90,
  },
  {
    customerId: 67890,
    transactionId: 1002,
    customerName: 'Jane Smith',
    purchaseDate: '2024-12-10',
    productPurchased: 'Phone',
    price: 50,
    rewardPoints: 0,
  },
  {
    customerId: 12345,
    transactionId: 1103,
    customerName: 'John Doe',
    purchaseDate: '2024-12-08',
    productPurchased: 'Tablet',
    price: 40,
    rewardPoints: 0,
  },
  {
    customerId: 67890,
    transactionId: 1004,
    customerName: 'Jane Smith',
    purchaseDate: '2024-12-06',
    productPurchased: 'Headphones',
    price: 90,
    rewardPoints: 40,
  },
  {
    customerId: 12345,
    transactionId: 1003,
    customerName: 'John Doe',
    purchaseDate: '2024-12-05',
    productPurchased: 'Tablet',
    price: 75,
    rewardPoints: 25,
  },
  {
    customerId: 12345,
    transactionId: 1104,
    customerName: 'John Doe',
    purchaseDate: '2024-11-25',
    productPurchased: 'Phone',
    price: 200,
    rewardPoints: 250,
  },
  {
    customerId: 67892,
    transactionId: 1037,
    customerName: 'Chris Green',
    purchaseDate: '2024-11-25',
    productPurchased: 'Electric Heater',
    price: 180,
    rewardPoints: 210,
  },
  {
    customerId: 12345,
    transactionId: 1013,
    customerName: 'John Doe',
    purchaseDate: '2024-11-20',
    productPurchased: 'Smart Watch',
    price: 200,
    rewardPoints: 250,
  },
  {
    customerId: 12346,
    transactionId: 1026,
    customerName: 'Bob Brown',
    purchaseDate: '2024-10-25',
    productPurchased: 'Tablet',
    price: 120,
    rewardPoints: 90,
  },
  {
    customerId: 67890,
    transactionId: 1007,
    customerName: 'Jane Smith',
    purchaseDate: '2024-10-25',
    productPurchased: 'Keyboard',
    price: 100.2,
    rewardPoints: 50,
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
    expect(
      screen.getByTestId(`id-${transaction.transactionId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`name-${transaction.transactionId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`date-${transaction.transactionId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`pname-${transaction.transactionId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`price-${transaction.transactionId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`points-${transaction.transactionId}`),
    ).toBeInTheDocument();
  });
});

// Test case for decimal values
test('calculates price correctly for decimal values', () => {
  render(<AllTransactions transactions={mockTransactions} />);

  const transaction = mockTransactions[5];
  expect(
    screen.getByTestId(`price-${transaction.transactionId}`),
  ).toBeInTheDocument();
});

// Test case for large numbers (large transactions)
test('handles large numbers correctly', () => {
  render(<AllTransactions transactions={mockTransactions} />);

  const largeTransaction = mockTransactions[2];
  expect(
    screen.getByTestId(`price-${largeTransaction.transactionId}`),
  ).toBeInTheDocument();
  expect(
    screen.getByTestId(`points-${largeTransaction.transactionId}`),
  ).toBeInTheDocument();
});

test('renders correct number of rows including header row', () => {
  render(<AllTransactions transactions={mockTransactions} />);

  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(mockTransactions.length + 1);
});
