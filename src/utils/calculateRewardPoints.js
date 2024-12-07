export const calculateRewardPoints = (price) => {
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }

  let rewardPoints = 0;
  if (price > 100) {
    rewardPoints = (price - 100) * 2 + 50; // Rewards for prices above $100
  } else if (price > 50) {
    rewardPoints = price - 50; // Rewards for prices between $50 and $100
  }
  rewardPoints = Math.floor(rewardPoints);
  return rewardPoints;
};
