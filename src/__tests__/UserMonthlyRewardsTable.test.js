import { render, screen } from '@testing-library/react';
import UserMonthlyRewardsTable from '../components/UserMonthlyRewardsTable';
describe('UserMonthlyRewardsTable', () => {
  it('renders the table header with correct labels', () => {
    const mockData = {
      'John Doe': {
        customerId: 12345,
        monthRewards: {
          'December 2023': 90,
          'January 2024': 25,
          'February 2024': 10,
        },
      },
      'Jane Smith': {
        customerId: 67890,
        monthRewards: {
          'December 2023': 0,
          'January 2024': 40,
          'February 2024': 90,
        },
      },
    };
    render(<UserMonthlyRewardsTable rewards={mockData} />);

    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders.length).toBe(5);

    expect(tableHeaders[0]).toHaveTextContent('Customer ID');
    expect(tableHeaders[1]).toHaveTextContent('Name');
    expect(tableHeaders[2]).toHaveTextContent('Month');
    expect(tableHeaders[3]).toHaveTextContent('Year');
    expect(tableHeaders[4]).toHaveTextContent('Reward Points');
  });
});
