import { useState, useEffect } from 'react';
import {
  aggregateRewards,
  calculateTotalRewards,
} from '../utils/aggregateRewards';
import { transactionsData } from '../json/jsondata';
import { calculateRewardPoints } from '../utils/calculateRewardPoints';
import logger from '../utils/logger';

const useFetchRewardsData = () => {
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

        // Calculate reward points for each transaction
        const updatedTransactions = transactionsData.map((transaction) => ({
          ...transaction,
          rewardPoints: calculateRewardPoints(transaction.price),
        }));

        setTransactions(updatedTransactions);

        // Aggregate rewards by month
        const rewards = aggregateRewards(updatedTransactions);
        setRewardsByMonth(rewards);

        // Calculate total rewards
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

  return { transactions, rewardsByMonth, totalRewards, loading, error };
};

export default useFetchRewardsData;
