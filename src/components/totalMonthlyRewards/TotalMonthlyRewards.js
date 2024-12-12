import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchTypeahead from '../common/SearchTypeahead';
import { Card } from 'react-bootstrap';

const getLatestThreeMonthsRewards = (rewardsArray, customerId) => {
  const customerRewards = rewardsArray.filter(
    (reward) => reward.customerId === customerId,
  );
  // Sort rewards by year and month in descending order
  customerRewards.sort((a, b) => {
    const dateA = new Date(`${a.year}-${a.month}`);
    const dateB = new Date(`${b.year}-${b.month}`);
    return dateB - dateA;
  });
  // Get the latest three months' rewards and return as an array
  return customerRewards.slice(0, 3).map((current) => ({
    month: current.month,
    year: current.year,
    rewards: current.rewards,
  }));
};

const TotalMonthlyRewards = ({ rewardsByMonth }) => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [filteredRewards, setFilteredRewards] = useState([]);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [selectedCustomerName, setSelectedCustomerName] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');

  const rewardsArray = Object.entries(rewardsByMonth).flatMap(
    ([customerName, { customerId, monthRewards }]) =>
      Object.entries(monthRewards).map(([fullMonth, rewards]) => {
        const [month, year] = fullMonth.split(' ');
        return {
          customerId,
          customerName,
          month,
          year: parseInt(year, 10),
          rewards,
        };
      }),
  );

  const uniqueCustomers = [
    ...new Map(rewardsArray.map((item) => [item.customerId, item])).values(),
  ];

  const uniqueYears = [...new Set(rewardsArray.map(({ year }) => year))].sort(
    (a, b) => b - a,
  );

  useEffect(() => {
    if (rewardsArray.length > 0) {
      const latestReward = rewardsArray.reduce((latest, current) => {
        const latestDate = new Date(
          `${latest.month} 1 ${latest.year}`,
        ).getTime();
        const currentDate = new Date(
          `${current.month} 1 ${current.year}`,
        ).getTime();
        return currentDate > latestDate ? current : latest;
      }, rewardsArray[0]);

      setSelectedCustomer(latestReward);
      setSelectedYear(latestReward.year);
      setSelectedCustomerName(latestReward.customerName);
      setSelectedCustomerId(latestReward.customerId);

      const latestThreeMonthsRewards = getLatestThreeMonthsRewards(
        rewardsArray,
        latestReward.customerId,
      );
      setFilteredRewards(latestThreeMonthsRewards);
      setTriggerSearch(true);
    }
  }, [rewardsByMonth]);

  const handleSearch = () => {
    const results = rewardsArray.filter((item) => {
      return (
        (!selectedCustomer ||
          item.customerId === selectedCustomer.customerId) &&
        (!selectedYear || item.year === parseInt(selectedYear, 10))
      );
    });
    const latestThreeMonthsRewards = getLatestThreeMonthsRewards(
      results,
      selectedCustomerId,
    );
    setFilteredRewards(latestThreeMonthsRewards);
  };

  return (
    <div className="user-monthly-rewards">
      <Card>
        <Card.Header>
          <h6 className="mb-1">Total Monthly Rewards</h6>
        </Card.Header>
        <Card.Body>
          <div className="top-search-fields mb-3 d-flex">
            {selectedCustomer && (
              <SearchTypeahead
                data={uniqueCustomers}
                onSearchSelect={(customer) => {
                  setSelectedCustomer(customer);
                  setSelectedCustomerId(customer.customerId);
                  setSelectedCustomerName(customer.customerName);
                  setTriggerSearch(true);
                }}
                placeholder="Search by Customer ID or Name"
                defaultValue={selectedCustomerName}
              />
            )}
            <div className="year-fields">
              <select
                className="form-select"
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setTriggerSearch(true);
                }}
              >
                <option value="">Select a Year</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary ms-3" onClick={handleSearch}>
              Search
            </button>
          </div>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between">
                <span>
                  Cus. ID:&nbsp;
                  <strong>{selectedCustomerId}</strong>
                </span>
                <span>
                  Cus. Name:&nbsp;
                  <strong>{selectedCustomerName}</strong>
                </span>
                <span>
                  Year:&nbsp;
                  <strong>{selectedYear}</strong>
                </span>
              </div>
            </Card.Header>
            <Card.Body className="p-2">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Reward Points</th>
                  </tr>
                </thead>
                <tbody>
                  {triggerSearch &&
                    filteredRewards.map(({ month, rewards }, index) => (
                      <tr key={index}>
                        <td>{month}</td>
                        <td data-testid={`reward-${month}`}>{rewards}</td>
                      </tr>
                    ))}
                  {triggerSearch && filteredRewards.length === 0 && (
                    <tr>
                      <td className="text-danger" colSpan={4}>
                        No data found for the selected criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </div>
  );
};

TotalMonthlyRewards.propTypes = {
  rewardsByMonth: PropTypes.object.isRequired,
};

export default TotalMonthlyRewards;
