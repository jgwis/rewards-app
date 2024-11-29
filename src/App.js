import React, { useState, useEffect } from 'react';
import {
  aggregateRewards,
  calculateTotalRewards,
} from './utils/aggregateRewards';
import { transactionsData } from './utils/data';
import UserRewardsTable from './components/UserRewardsTable';
import TotalRewardsTable from './components/TotalRewardsTable';
import TransactionsTable from './components/TransactionsTable';
import { calculateRewardPoints } from './utils/calculateRewardPoints';
import Loader from './components/Loader';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewardsByMonth, setRewardsByMonth] = useState({});
  const [totalRewards, setTotalRewards] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        // Fetching and calculating reward points
        const updatedTransactions = transactionsData.map((transaction) => ({
          ...transaction,
          rewardPoints: calculateRewardPoints(transaction.price),
        }));

        // Update state with transactions
        setTransactions(updatedTransactions);

        // Aggregate rewards by month
        const rewards = aggregateRewards(updatedTransactions);
        setRewardsByMonth(rewards);

        // Calculate total rewards for each customer
        const total = calculateTotalRewards(rewards);
        setTotalRewards(total);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="customer-rewards-program">
      <h1>Customer Rewards Program</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <UserRewardsTable rewards={rewardsByMonth} />
          <TransactionsTable transactions={transactions} />
          <TotalRewardsTable totalRewards={totalRewards} />
        </>
      )}
    </div>
  );
};

export default App;
