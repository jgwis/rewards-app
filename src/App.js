import React from 'react';
import Loader from './components/Loader';
import AllTransactions from './components/AllTransactions';
import TotalMonthlyRewards from './components/TotalMonthlyRewards';
import TotalRewardsLastThreeMonths from './components/TotalRewardsLastThreeMonths';
import PropTypes from 'prop-types';
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

// PropTypes validation
App.propTypes = {
  loading: PropTypes.bool.isRequired,
  transactions: PropTypes.array.isRequired,
  rewardsByMonth: PropTypes.array.isRequired,
  totalRewards: PropTypes.array.isRequired,
};
export default App;
