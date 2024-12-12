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
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-md-7">
          <AllTransactions transactions={transactions} />
        </div>
        <div className="col-md-5">
          <TotalMonthlyRewards rewardsByMonth={rewardsByMonth} />
          <TotalRewardsLastThreeMonths totalRewards={totalRewards} />
        </div>
      </div>
    </div>
  );
};

export default App;
