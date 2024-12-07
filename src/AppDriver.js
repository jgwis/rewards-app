import React, { useState, useEffect } from 'react';
import {
  aggregateRewards,
  calculateTotalRewards,
} from './utils/aggregateRewards';
import { transactionsData } from './json/jsondata';
import { calculateRewardPoints } from './utils/calculateRewardPoints';
import App from './App';
import logger from './utils/logger';

const AppDriver = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewardsByMonth, setRewardsByMonth] = useState({});
  const [totalRewards, setTotalRewards] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!transactionsData || transactionsData.length === 0) {
          throw new Error('No transaction data available');
        }
        // Fetching and calculating reward points for each transaction
        const updatedTransactions = transactionsData.map((transaction) => ({
          ...transaction,
          rewardPoints: calculateRewardPoints(transaction.price),
        }));

        setTransactions(updatedTransactions);
        // Aggregate rewards by month
        const rewards = aggregateRewards(updatedTransactions);
        setRewardsByMonth(rewards);
        // Calculate total rewards for each customer
        const total = calculateTotalRewards(rewards);
        setTotalRewards(total);
      } catch (error) {
        logger.error(`Error during data fetch: ${error.message}`);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="customer-rewards-program">
      <h1>Customer Rewards Program</h1>
      {/* Displaying error message if there's an error */}
      {error ? (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      ) : (
        // Display the main app content if no error
        <App
          loading={loading}
          transactions={transactions}
          rewardsByMonth={rewardsByMonth}
          totalRewards={totalRewards}
        />
      )}
    </div>
  );
};

export default AppDriver;
