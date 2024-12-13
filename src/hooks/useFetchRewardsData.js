import { useState, useEffect } from 'react';
import { calculateRewardPoints } from '../utils/calculateRewardPoints';
import logger from '../utils/logger';
import { calculateTotalRewards } from '../utils/calculateTotalRewards';
import { fetchTransitionsData } from '../services/dataService';
import { calculateTotalMonthlyRewards } from '../utils/calculateTotalMonthlyRewards';

const useFetchRewardsData = () => {
  const [data, setData] = useState({
    transactions: [],
    rewardsByMonth: [],
    totalRewards: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const transactionsData = await fetchTransitionsData();
        if (!transactionsData || transactionsData.length === 0) {
          throw new Error('No transaction data available');
        }
        const updatedTransactions = transactionsData
          .map((transaction) => ({
            ...transaction,
            rewardPoints: calculateRewardPoints(transaction.price),
          }))
          .sort((a, b) => {
            const dateA = new Date(a.purchaseDate);
            const dateB = new Date(b.purchaseDate);
            return dateB - dateA;
          });

        const rewards = calculateTotalMonthlyRewards(updatedTransactions);
        const total = calculateTotalRewards(rewards);
        setData({
          transactions: updatedTransactions,
          rewardsByMonth: rewards,
          totalRewards: total,
        });
      } catch (error) {
        logger.error(`Error during data fetch: ${error.message}`);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...data, loading, error };
};

export default useFetchRewardsData;
