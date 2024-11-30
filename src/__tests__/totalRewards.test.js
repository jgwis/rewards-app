import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalRewardsTable from '../components/TotalRewardsTable';

test('renders total rewards table with correct data', () => {
  const totalRewards = {
    'John Doe': 125,
    'Jane Smith': 90,
  };

  render(<TotalRewardsTable totalRewards={totalRewards} />);

  // Check table header
  const header = screen.getByRole('heading', { name: /total rewards/i });
  expect(header).toBeInTheDocument();

  const tableHeaders = screen.getAllByRole('columnheader');
  expect(tableHeaders.length).toBe(2);
  expect(tableHeaders[0]).toHaveTextContent('Customer Name');
  expect(tableHeaders[1]).toHaveTextContent('Total Reward Points');

  // Check table rows
  const rows = screen.getAllByRole('row');
  expect(rows.length).toBe(3); // 2 rows for customers + 1 header row

  const firstRow = rows[1];
  const secondRow = rows[2];

  expect(firstRow.querySelector('td:nth-child(1)')).toHaveTextContent(
    'John Doe',
  );
  expect(firstRow.querySelector('td:nth-child(2)')).toHaveTextContent('125');

  expect(secondRow.querySelector('td:nth-child(1)')).toHaveTextContent(
    'Jane Smith',
  );
  expect(secondRow.querySelector('td:nth-child(2)')).toHaveTextContent('90');
});
