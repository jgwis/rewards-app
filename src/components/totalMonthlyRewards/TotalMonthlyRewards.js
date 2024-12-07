import React from 'react';
import PropTypes from 'prop-types';

const parseDate = (monthYear) => {
  const [month, year] = monthYear.split(' ');
  const monthNumber = new Date(`${month} 1`).getMonth() + 1;
  return new Date(year, monthNumber - 1);
};

const TotalMonthlyRewards = ({ rewardsByMonth }) => {
  if (Object.keys(rewardsByMonth).length === 0) {
    return <div>No rewards data available</div>;
  }
  const sortedRewards = Object.entries(rewardsByMonth)
    .map(([customerName, customerData]) => {
      const sortedMonthRewards = Object.entries(customerData.monthRewards || {})
        .sort(
          ([monthYearA], [monthYearB]) =>
            parseDate(monthYearB) - parseDate(monthYearA),
        )
        .reduce((acc, [monthYear, points]) => {
          acc[monthYear] = points;
          return acc;
        }, {});

      return {
        customerName,
        customerId: customerData.customerId,
        monthRewards: sortedMonthRewards,
      };
    })
    .sort((a, b) => {
      const latestMonthA = Object.keys(a.monthRewards)[0];
      const latestMonthB = Object.keys(b.monthRewards)[0];
      return parseDate(latestMonthB) - parseDate(latestMonthA);
    });
  return (
    <div className="user-monthly-rewards">
      <h3>Total Monthly Rewards (Customer Wise)</h3>
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
          {sortedRewards.map(
            ({ customerName, customerId, monthRewards }, rowIndex) =>
              Object.entries(monthRewards).map(
                ([monthYear, points], monthIndex) => {
                  const [month, year] = monthYear.split(' ');
                  const uniqueTestId = `row-${rowIndex}-${monthIndex}`;

                  return (
                    <tr
                      data-testid={uniqueTestId}
                      key={`${customerName}-${monthYear}`}
                    >
                      <td>{customerId || 'N/A'}</td>
                      <td>{customerName}</td>
                      <td>{month}</td>
                      <td>{year}</td>
                      <td>{points}</td>
                    </tr>
                  );
                },
              ),
          )}
        </tbody>
      </table>
    </div>
  );
};

TotalMonthlyRewards.propTypes = {
  rewardsByMonth: PropTypes.object.isRequired,
};

export default TotalMonthlyRewards;
