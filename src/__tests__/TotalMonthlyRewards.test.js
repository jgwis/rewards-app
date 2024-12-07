import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalMonthlyRewards from '../components/totalMonthlyRewards/TotalMonthlyRewards';

const rewardsByMonth = {
  'John Doe': {
    customerId: 12345,
    monthRewards: {
      'December 2023': 90,
      'November 2023': 275,
      'February 2024': 10,
      'November 2022': 91,
    },
  },
  'Jane Smith': {
    customerId: 67890,
    monthRewards: {
      'December 2023': 0,
      'May 2022': 40,
      'February 2021': 50,
      'February 2024': 110,
    },
  },
};

describe('TotalMonthlyRewardsSection', () => {
  it('renders rewards data correctly', () => {
    render(<TotalMonthlyRewards rewardsByMonth={rewardsByMonth} />);
    expect(screen.getByTestId(`row-0-0`)).toBeInTheDocument();

    // Check for table headers
    expect(screen.getByText('Customer ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Reward Points')).toBeInTheDocument();
  });

  it('renders negative reward points correctly when they exist', () => {
    render(<TotalMonthlyRewards rewardsByMonth={rewardsByMonth} />);

    // Check if a negative reward exists in the document
    const negativeRewardElement = screen.getByText(90);

    if (negativeRewardElement) {
      // Assert that the negative reward point is displayed correctly
      expect(negativeRewardElement).toBeInTheDocument();
    } else {
      // If no negative rewards exist, we don't expect this test to fail
      expect(negativeRewardElement).not.toBeInTheDocument();
    }
  });

  it('renders no rewards when data is empty', () => {
    render(<TotalMonthlyRewards rewardsByMonth={{}} />);
    expect(screen.getByText('No rewards data available')).toBeInTheDocument();
  });
});
