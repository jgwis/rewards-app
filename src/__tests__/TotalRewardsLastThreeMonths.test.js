import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalRewardsLastThreeMonths from '../components/TotalRewardsLastThreeMonths';

const mockTotalRewards = [
  {
    customerId: '12345',
    customerName: 'John Doe',
    totalRewardPoints: 615,
  },
  {
    customerId: '12346',
    customerName: 'Bob Brown',
    totalRewardPoints: 180,
  },
  {
    customerId: '12348',
    customerName: 'Michael Scott',
    totalRewardPoints: 0,
  },
  {
    customerId: '67890',
    customerName: 'Jane Smith',
    totalRewardPoints: 240,
  },
  {
    customerId: '67892',
    customerName: 'Chris Green',
    totalRewardPoints: 210,
  },
];

test('renders TotalRewardsLastThreeMonths correctly with data', () => {
  render(<TotalRewardsLastThreeMonths totalRewards={mockTotalRewards} />);

  // Check if the table rows are rendered correctly
  mockTotalRewards.forEach((item) => {
    expect(screen.getByText(item.customerName)).toBeInTheDocument();
    expect(screen.getByText(item.totalRewardPoints)).toBeInTheDocument();
  });

  // Ensure the table is displayed
  expect(
    screen.getByText('Total Rewards for Last Three Consecutive Months'),
  ).toBeInTheDocument();
});

test('renders TotalRewardsLastThreeMonths correctly without data', () => {
  render(<TotalRewardsLastThreeMonths totalRewards={[]} />);

  // Check for the message when no data is available
  const noDataMessage = screen.getByText('No data available');
  expect(noDataMessage).toBeInTheDocument();
});
