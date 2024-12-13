import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalMonthlyRewards from '../components/TotalMonthlyRewards';

describe('TotalMonthlyRewards Component', () => {
  it('renders correctly with rewards data', () => {
    const mockRewardsByMonth = [
      {
        customerId: '12345',
        customerName: 'John Doe',
        month: 'December',
        year: 2024,
        monthNumber: 12,
        rewardPoints: 115,
      },
      {
        customerId: '67890',
        customerName: 'Jane Smith',
        month: 'December',
        year: 2024,
        monthNumber: 12,
        rewardPoints: 40,
      },
      {
        customerId: '12345',
        customerName: 'John Doe',
        month: 'November',
        year: 2024,
        monthNumber: 11,
        rewardPoints: 500,
      },
      {
        customerId: '67892',
        customerName: 'Chris Green',
        month: 'November',
        year: 2024,
        monthNumber: 11,
        rewardPoints: 210,
      },
      {
        customerId: '12346',
        customerName: 'Bob Brown',
        month: 'October',
        year: 2024,
        monthNumber: 10,
        rewardPoints: 180,
      },
      {
        customerId: '67890',
        customerName: 'Jane Smith',
        month: 'October',
        year: 2024,
        monthNumber: 10,
        rewardPoints: 200,
      },
      {
        customerId: '67892',
        customerName: 'Chris Green',
        month: 'October',
        year: 2024,
        monthNumber: 10,
        rewardPoints: 0,
      },
      {
        customerId: '12346',
        customerName: 'Bob Brown',
        month: 'September',
        year: 2024,
        monthNumber: 9,
        rewardPoints: 30,
      },
      {
        customerId: '67892',
        customerName: 'Chris Green',
        month: 'September',
        year: 2024,
        monthNumber: 9,
        rewardPoints: 1650,
      },
      {
        customerId: '12346',
        customerName: 'Bob Brown',
        month: 'June',
        year: 2024,
        monthNumber: 6,
        rewardPoints: 0,
      },
      {
        customerId: '67892',
        customerName: 'Chris Green',
        month: 'April',
        year: 2024,
        monthNumber: 4,
        rewardPoints: 25,
      },
      {
        customerId: '12346',
        customerName: 'Bob Brown',
        month: 'January',
        year: 2024,
        monthNumber: 1,
        rewardPoints: 90,
      },
      {
        customerId: '67890',
        customerName: 'Jane Smith',
        month: 'December',
        year: 2023,
        monthNumber: 12,
        rewardPoints: 0,
      },
      {
        customerId: '12348',
        customerName: 'Michael Scott',
        month: 'August',
        year: 2023,
        monthNumber: 8,
        rewardPoints: 350,
      },
      {
        customerId: '12345',
        customerName: 'John Doe',
        month: 'May',
        year: 2023,
        monthNumber: 5,
        rewardPoints: 0,
      },
      {
        customerId: '12348',
        customerName: 'Michael Scott',
        month: 'December',
        year: 2022,
        monthNumber: 12,
        rewardPoints: 90,
      },
    ];

    render(<TotalMonthlyRewards rewardsByMonth={mockRewardsByMonth} />);

    // Check if the table header rows are rendered
    expect(
      screen.getByText('Total Monthly Rewards (Customer Wise)'),
    ).toBeInTheDocument();
    expect(screen.getByText('Customer ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Reward Points')).toBeInTheDocument();

    // Check if the mock data is rendered correctly
    mockRewardsByMonth.forEach((transaction, index) => {
      expect(
        screen.getByTestId(`id-${transaction.customerId}${index}`),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`name-${transaction.customerId}${index}`),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`month-${transaction.customerId}${index}`),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`year-${transaction.customerId}${index}`),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`points-${transaction.customerId}${index}`),
      ).toBeInTheDocument();
    });
  });

  it('displays "No rewards data available" when rewardsByMonth is empty', () => {
    render(<TotalMonthlyRewards rewardsByMonth={[]} />);

    expect(screen.getByText('No rewards data available.')).toBeInTheDocument();
  });
});
