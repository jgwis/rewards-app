import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomPagination from './common/CustomPagination';
import { Card } from 'react-bootstrap';

const ITEMS_PER_PAGE = 10;
const AllTransactions = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const indexOfLastTransaction = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstTransaction = indexOfLastTransaction - ITEMS_PER_PAGE;
  const currentTransactions = transactions.slice(
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
          {transactions.length === 0 ? (
            <div className="text-center">No transactions found.</div>
          ) : (
            <>
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
                      <tr key={index}>
                        <td data-testid={`id-${transactionId}`}>
                          {transactionId}
                        </td>
                        <td data-testid={`name-${transactionId}`}>
                          {customerName}
                        </td>
                        <td data-testid={`date-${transactionId}`}>
                          {new Date(purchaseDate).toLocaleDateString()}
                        </td>
                        <td data-testid={`pname-${transactionId}`}>
                          {productPurchased}
                        </td>
                        <td data-testid={`price-${transactionId}`}>${price}</td>
                        <td data-testid={`points-${transactionId}`}>
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
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

// PropTypes validation
AllTransactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      customerName: PropTypes.string.isRequired,
      purchaseDate: PropTypes.string.isRequired,
      productPurchased: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default AllTransactions;
