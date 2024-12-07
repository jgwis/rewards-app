import React from 'react';
import PropTypes from 'prop-types';

const AllTransactions = ({ transactions }) => {
  transactions.sort(
    (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate),
  );
  return (
    <div className="transactions">
      <h3>All Transactions</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Purchase Date</th>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(
            ({
              transactionId,
              customerName,
              purchaseDate,
              productPurchased,
              price,
              rewardPoints,
            }) => (
              <tr key={transactionId}>
                <td>{transactionId}</td>
                <td>{customerName}</td>
                <td>{new Date(purchaseDate).toLocaleDateString()}</td>
                <td>{productPurchased}</td>
                <td>${price}</td>
                <td>{rewardPoints}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};

AllTransactions.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default AllTransactions;
