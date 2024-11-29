import React from 'react';
import PropTypes from 'prop-types';

const TransactionsTable = ({ transactions }) => {
  return (
    <div className="transactions">
      <h3>Transactions</h3>
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

TransactionsTable.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default TransactionsTable;
