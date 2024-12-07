import React from 'react';
import PropTypes from 'prop-types';
const TotalRewardsLastThreeMonths = ({ totalRewards }) => {
  return (
    <div className="total-rewards">
      <h3>Total Rewards for Last Three Consecutive Months</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(totalRewards).map(([customerName, rewardPoints]) => (
            <tr key={customerName}>
              <td>{customerName}</td>
              <td>{rewardPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TotalRewardsLastThreeMonths.propTypes = {
  totalRewards: PropTypes.object.isRequired,
};

export default TotalRewardsLastThreeMonths;
