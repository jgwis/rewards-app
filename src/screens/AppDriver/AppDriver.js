import React from 'react';
import useFetchRewardsData from '../../hooks/useFetchRewardsData';
import App from '../../App';
import Header from '../../components/header/Header';

const AppDriver = () => {
  const { transactions, rewardsByMonth, totalRewards, loading, error } =
    useFetchRewardsData();

  return (
    <div className="wrapper">
      <Header />
      <div className="customer-rewards-program">
        {error ? (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        ) : (
          <App
            loading={loading}
            transactions={transactions}
            rewardsByMonth={rewardsByMonth}
            totalRewards={totalRewards}
          />
        )}
      </div>
    </div>
  );
};

export default AppDriver;
