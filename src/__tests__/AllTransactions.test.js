import React from 'react';
import { render, screen } from '@testing-library/react';
import AllTransactions from '../components/allTransactions/AllTransactions';

const mockTransactions = [
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
    customerId: 12340,
    transactionId: 1006,
    customerName: 'Bob Brown',
    purchaseDate: '2024-10-20',
    productPurchased: 'Tablet',
    price: 120.55,
    rewardPoints: 91,
  },
  {
    customerId: 12341,
    transactionId: 1506,
    customerName: 'Bob Brown',
    purchaseDate: '2024-10-10',
    productPurchased: 'Tablet',
    price: 9999999,
    rewardPoints: 199999848,
  },
  {
    customerId: 12346,
    transactionId: 1012,
    customerName: 'Bob Brown',
    purchaseDate: '2024-09-05',
    productPurchased: 'Router',
    price: 80,
    rewardPoints: 30,
  },
  {
    customerId: 12346,
    transactionId: 1034,
    customerName: 'Bob Brown',
    purchaseDate: '2024-06-30',
    productPurchased: 'Bluetooth Mouse',
    price: 30,
    rewardPoints: 0,
  },
  {
    customerId: 12352,
    transactionId: 1041,
    customerName: 'Mia Lee',
    purchaseDate: '2024-05-12',
    productPurchased: 'Tablet',
    price: 400,
    rewardPoints: 650,
  },
  {
    customerId: 67892,
    transactionId: 1028,
    customerName: 'Chris Green',
    purchaseDate: '2024-04-15',
    productPurchased: 'Portable Speaker',
    price: 75.75,
    rewardPoints: 25,
  },
  {
    customerId: 67891,
    transactionId: 1005,
    customerName: 'Alice Johnson',
    purchaseDate: '2024-02-10',
    productPurchased: 'Mouse',
    price: 30,
    rewardPoints: 0,
  },
  {
    customerId: 67893,
    transactionId: 1038,
    customerName: 'David Clark',
    purchaseDate: '2024-02-10',
    productPurchased: 'Keyboard',
    price: 50,
    rewardPoints: 0,
  },
  {
    customerId: 10349,
    transactionId: 1200,
    customerName: 'Bob Brown',
    purchaseDate: '2024-01-20',
    productPurchased: 'Tablet',
    price: 120.99,
    rewardPoints: 91,
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
      screen.getByTestId(`customerName-${transaction.transactionId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`purchaseDate-${transaction.transactionId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`productPurchased-${transaction.transactionId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`price-${transaction.transactionId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`rewardPoints-${transaction.transactionId}`),
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
    screen.getByTestId(`rewardPoints-${largeTransaction.transactionId}`),
  ).toBeInTheDocument();
});

test('renders correct number of rows including header row', () => {
  render(<AllTransactions transactions={mockTransactions} />);

  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(mockTransactions.length + 1);
});
