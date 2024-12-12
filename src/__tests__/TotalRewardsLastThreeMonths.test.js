import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TotalRewardsLastThreeMonths from '../components/TotalRewardsLastThreeMonths/TotalRewardsLastThreeMonths';

jest.mock('../components/common/CustomPagination', () => ({
  __esModule: true,
  default: ({ totalItems, itemsPerPage, onPageChange }) => (
    <div data-testid="pagination">
      {Array.from(
        { length: Math.ceil(totalItems / itemsPerPage) },
        (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            data-testid={`page-${index + 1}`}
          >
            {index + 1}
          </button>
        ),
      )}
    </div>
  ),
}));

describe('TotalRewardsLastThreeMonths', () => {
  const mockTotalRewards = {
    'John Doe': 615,
    'Jane Smith': 190,
    'Alice Johnson': 1800,
    'Bob Brown': 200000059,
    'Sarah Wilson': 2100,
    'Michael Scott': 440,
    'Chris Green': 375,
    'Oliver Martinez': 1450,
    'Emma Davis': 210,
    'David Clark': 0,
    'Sophia Wright': 250,
    'Liam Walker': 10,
    'Mia Lee': 650,
    'Noah Hill': 950,
  };

  test('renders the component with rewards data', () => {
    render(<TotalRewardsLastThreeMonths totalRewards={mockTotalRewards} />);

    // Check the header
    expect(
      screen.getByText(/Total Rewards for Last Three Consecutive Months/i),
    ).toBeInTheDocument();

    // Check the table headers
    expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Reward Points/i)).toBeInTheDocument();

    // Check the initial data displayed (first page with 5 items)
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(6); // 5 items + header row

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/615/i)).toBeInTheDocument();
  });

  test('handles pagination correctly', () => {
    render(<TotalRewardsLastThreeMonths totalRewards={mockTotalRewards} />);

    // Check pagination buttons
    const page1Button = screen.getByTestId('page-1');
    const page2Button = screen.getByTestId('page-2');

    expect(page1Button).toBeInTheDocument();
    expect(page2Button).toBeInTheDocument();

    // Click page 2
    userEvent.click(page2Button);

    // Check data on page 2
    expect(screen.getByText(/Chris Green/i)).toBeInTheDocument();
    expect(screen.getByText(/375/i)).toBeInTheDocument();
    expect(screen.getByText(/Oliver Martinez/i)).toBeInTheDocument();
    expect(screen.getByText(/1450/i)).toBeInTheDocument();

    // Ensure first-page data is not visible
    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
  });

  test('renders "No data" message when there are no rewards', () => {
    render(<TotalRewardsLastThreeMonths totalRewards={{}} />);

    // Check the table for no data message
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1); // Only the header row
    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
  });
});
