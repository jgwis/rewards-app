import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomPagination from '../common/CustomPagination';
import { Card } from 'react-bootstrap';

const ITEMS_PER_PAGE = 10;
const AllTransactions = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate),
  );
  const indexOfLastTransaction = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstTransaction = indexOfLastTransaction - ITEMS_PER_PAGE;
  const currentTransactions = sortedTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );
  return (
    <div className="transactions">
      <Card>
        <Card.Header>
          <h6 className="mb-1">All Transactions</h6>
        </Card.Header>
        <Card.Body>
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
              {currentTransactions.map(
                (
                  {
                    transactionId,
                    customerName,
                    purchaseDate,
                    productPurchased,
                    price,
                    rewardPoints,
                  },
                  index,
                ) => (
                  <tr key={index} data-testid={`id-${transactionId}`}>
                    <td data-testid={`transactionId-${transactionId}`}>
                      {transactionId}
                    </td>
                    <td data-testid={`customerName-${transactionId}`}>
                      {customerName}
                    </td>
                    <td data-testid={`purchaseDate-${transactionId}`}>
                      {new Date(purchaseDate).toLocaleDateString()}
                    </td>
                    <td data-testid={`productPurchased-${transactionId}`}>
                      {productPurchased}
                    </td>
                    <td data-testid={`price-${transactionId}`}>${price}</td>
                    <td data-testid={`rewardPoints-${transactionId}`}>
                      {rewardPoints}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
          <CustomPagination
            totalItems={transactions.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

AllTransactions.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default AllTransactions;
