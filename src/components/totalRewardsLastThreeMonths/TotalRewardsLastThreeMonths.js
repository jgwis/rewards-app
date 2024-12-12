import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import CustomPagination from '../common/CustomPagination';

const ITEMS_PER_PAGE = 5;
const TotalRewardsLastThreeMonths = ({ totalRewards }) => {
  const totalRewardsList = Object.entries(totalRewards).map(
    ([customerName, rewards]) => ({
      customerName,
      rewards,
    }),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastTransaction = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstTransaction = indexOfLastTransaction - ITEMS_PER_PAGE;
  const currentTotalRewards = totalRewardsList.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );

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
              {currentTotalRewards.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.customerName}</td>
                    <td>{item.rewards}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <CustomPagination
            totalItems={totalRewardsList.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

TotalRewardsLastThreeMonths.propTypes = {
  totalRewards: PropTypes.object.isRequired,
};

export default TotalRewardsLastThreeMonths;
