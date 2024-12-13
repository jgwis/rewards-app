import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const TotalRewardsLastThreeMonths = ({ totalRewards }) => {
  return (
    <div className="total-rewards">
      <Card>
        <Card.Header>
          <h6 className="mb-1">
            Total Rewards for Last Three Consecutive Months
          </h6>
        </Card.Header>
        <Card.Body>
          <table className="table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Total Reward Points</th>
              </tr>
            </thead>
            <tbody>
              {totalRewards?.length > 0 ? (
                totalRewards.map((item, index) => (
                  <tr key={index}>
                    <td>{item.customerName}</td>
                    <td>{item.totalRewardPoints}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center' }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
};

// PropTypes validation
TotalRewardsLastThreeMonths.propTypes = {
  totalRewards: PropTypes.arrayOf(
    PropTypes.shape({
      customerName: PropTypes.string.isRequired,
      totalRewardPoints: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TotalRewardsLastThreeMonths;
