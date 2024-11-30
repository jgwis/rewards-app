import React from 'react';
import PropTypes from 'prop-types';

const UserMonthlyRewardsTable = ({ rewards }) => {
  // Simplified sorting logic by month-year
  const sortedRewards = Object.entries(rewards)
    .map(([customerName, customerData]) => {
      const { customerId, monthRewards } = customerData;
      const safeMonthRewards = monthRewards || {};
      return {
        customerName,
        customerId,
        monthRewards: safeMonthRewards,
      };
    })
    .sort((a, b) => {
      const aDates = Object.keys(a.monthRewards);
      const bDates = Object.keys(b.monthRewards);

      // Ensure that both have dates and then sort by the first date
      if (aDates.length > 0 && bDates.length > 0) {
        const [aMonth, aYear] = aDates[0]?.split(' ') || [];
        const [bMonth, bYear] = bDates[0]?.split(' ') || [];

        const dateA = new Date(`${aMonth} 1, ${aYear}`);
        const dateB = new Date(`${bMonth} 1, ${bYear}`);

        return dateA - dateB;
      }

      return 0;
    });
  return (
    <div className="user-monthly-rewards">
      <h3>User Monthly Rewards</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedRewards.map(({ customerName, customerId, monthRewards }) =>
            Object.entries(monthRewards).map(([monthYear, points]) => {
              const [month, year] = monthYear.split(' ');
              return (
                <tr key={`${customerName}-${monthYear}`}>
                  <td>{customerId || 'N/A'}</td>
                  <td>{customerName}</td>
                  <td>{month}</td>
                  <td>{year}</td>
                  <td>{points}</td>
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    </div>
  );
};

UserMonthlyRewardsTable.propTypes = {
  rewards: PropTypes.object.isRequired,
};

export default UserMonthlyRewardsTable;
