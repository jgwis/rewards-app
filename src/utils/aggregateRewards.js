import { calculateRewardPoints } from './calculateRewardPoints';

// Function to aggregate rewards by customer and month
export const aggregateRewards = (transactions) => {
  const rewardsByMonth = {};
  transactions.forEach((transaction) => {
    const { customerId, customerName, purchaseDate, price } = transaction;
    const rewardPoints = calculateRewardPoints(price);

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
};

// Function to calculate total rewards for each customer
export const calculateTotalRewards = (rewardsByMonth) => {
  const totalRewards = {};
  for (const customer in rewardsByMonth) {
    totalRewards[customer] = Object.values(
      rewardsByMonth[customer].monthRewards,
    ).reduce((acc, points) => acc + points, 0);
  }
  return totalRewards;
};
