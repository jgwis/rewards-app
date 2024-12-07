import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalRewardsLastThreeMonths from '../components/totalRewardsLastThreeMonths/TotalRewardsLastThreeMonths';

test('renders total rewards table with correct data', () => {
  const totalRewards = {
    'John Doe': 375,
    'Jane Smith': 150,
  };
  render(<TotalRewardsLastThreeMonths totalRewards={totalRewards} />);
  const header = screen.getByRole('heading', { name: /total rewards/i });
  expect(header).toBeInTheDocument();
  const tableHeaders = screen.getAllByRole('columnheader');
  expect(tableHeaders.length).toBe(2);
  expect(tableHeaders[0]).toHaveTextContent('Customer Name');
  expect(tableHeaders[1]).toHaveTextContent('Total Reward Points');

  const rows = screen.getAllByRole('row');
  expect(rows.length).toBe(3);
  const firstRow = rows[1];
  const secondRow = rows[2];
  expect(firstRow.querySelector('td:nth-child(1)')).toHaveTextContent(
    'John Doe',
  );
  expect(firstRow.querySelector('td:nth-child(2)')).toHaveTextContent('375');

  expect(secondRow.querySelector('td:nth-child(1)')).toHaveTextContent(
    'Jane Smith',
  );
  expect(secondRow.querySelector('td:nth-child(2)')).toHaveTextContent('150');
});
