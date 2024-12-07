import React from 'react';
import Loader from './components/loader/Loader';
import AllTransactions from './components/allTransactions/AllTransactions';
import TotalMonthlyRewards from './components/totalMonthlyRewards/TotalMonthlyRewards';
import TotalRewardsLastThreeMonths from './components/totalRewardsLastThreeMonths/TotalRewardsLastThreeMonths';

const App = ({ loading, transactions, rewardsByMonth, totalRewards }) => {
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <AllTransactions transactions={transactions} />
      {rewardsByMonth && (
        <TotalMonthlyRewards rewardsByMonth={rewardsByMonth} />
      )}

      <TotalRewardsLastThreeMonths totalRewards={totalRewards} />
    </>
  );
};

export default App;
