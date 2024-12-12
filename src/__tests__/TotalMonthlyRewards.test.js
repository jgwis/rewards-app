import { render, screen, within } from '@testing-library/react';
import TotalMonthlyRewards from '../components/totalMonthlyRewards/TotalMonthlyRewards';

test('renders rewards table with correct data', async () => {
  const mockRewardsByMonth = {
    'Bob Brown': {
      customerId: 12345,
      monthRewards: {
        'October 2024': 200,
        'September 2024': 30,
        'June 2024': 0,
      },
    },
  };

  render(<TotalMonthlyRewards rewardsByMonth={mockRewardsByMonth} />);

  // Check the rewards table
  const table = screen.getByRole('table');

  expect(within(table).getByText(/October/i)).toBeInTheDocument();
  expect(within(table).getByText(/200/i)).toBeInTheDocument();

  expect(within(table).getByText(/September/i)).toBeInTheDocument();
  expect(within(table).getByText(/30/i)).toBeInTheDocument();

  expect(within(table).getByText(/June/i)).toBeInTheDocument();
  expect(within(table).getByText(/^0$/)).toBeInTheDocument();
});
