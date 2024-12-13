import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const TotalMonthlyRewards = ({ rewardsByMonth }) => {
  return (
    <div className="user-monthly-rewards">
      <Card>
        <Card.Header>
          <h6 className="mb-1">Total Monthly Rewards (Customer Wise)</h6>
        </Card.Header>
        <Card.Body>
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
              {rewardsByMonth.length > 0 ? (
                rewardsByMonth.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-testid={`id-${item.customerId}${index}`}>
                        {item.customerId}
                      </td>
                      <td data-testid={`name-${item.customerId}${index}`}>
                        {item.customerName}
                      </td>
                      <td data-testid={`month-${item.customerId}${index}`}>
                        {item.month}
                      </td>
                      <td data-testid={`year-${item.customerId}${index}`}>
                        {item.year}
                      </td>
                      <td data-testid={`points-${item.customerId}${index}`}>
                        {item.rewardPoints}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">No rewards data available.</td>
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
TotalMonthlyRewards.propTypes = {
  rewardsByMonth: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      customerName: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TotalMonthlyRewards;
