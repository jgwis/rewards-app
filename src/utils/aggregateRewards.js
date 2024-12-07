import { calculateRewardPoints } from './calculateRewardPoints';
import logger from './logger';

export const aggregateRewards = (transactions) => {
  try {
    const rewardsByMonth = {};
    transactions.forEach((transaction) => {
      const { customerId, customerName, purchaseDate, price } = transaction;
      const rewardPoints = Math.floor(calculateRewardPoints(price));
      const monthYear = new Date(purchaseDate).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });

      // Initialize customer if not already in rewardsByMonth
      if (!rewardsByMonth[customerName]) {
        rewardsByMonth[customerName] = {
          customerId,
          monthRewards: {},
        };
      }

      // Initialize the monthYear if not already present
      if (!rewardsByMonth[customerName].monthRewards[monthYear]) {
        rewardsByMonth[customerName].monthRewards[monthYear] = 0;
      }

      // Accumulate the reward points for the month
      rewardsByMonth[customerName].monthRewards[monthYear] += rewardPoints;
    });
    return rewardsByMonth;
  } catch (error) {
    logger.error(`Error in aggregateRewards: ${error.message}`);
    throw error;
  }
};

export const calculateTotalRewards = (rewardsByMonth) => {
  try {
    const totalRewards = {};
    for (const customer in rewardsByMonth) {
      const { monthRewards } = rewardsByMonth[customer];
      const sortedMonths = Object.keys(monthRewards).sort(
        (a, b) => new Date(b) - new Date(a),
      );
      //Calculate the total rewards for the last 3 months
      const lastThreeMonths = sortedMonths.slice(0, 3);
      const totalForLastThree = lastThreeMonths.reduce((acc, month) => {
        return acc + monthRewards[month];
      }, 0);
      totalRewards[customer] = Math.floor(totalForLastThree);
    }

    return totalRewards;
  } catch (error) {
    logger.error(`Error in calculateTotalRewards: ${error.message}`);
    throw error;
  }
};
