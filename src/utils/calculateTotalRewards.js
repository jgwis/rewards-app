import logger from './logger';

export const calculateTotalRewards = (transactions) => {
  try {
    const currentDate = new Date();
    const lastThreeMonths = [];

    // Calculate the last three months
    for (let i = 0; i < 3; i++) {
      const month = new Date(currentDate);
      month.setMonth(month.getMonth() - i);
      lastThreeMonths.push(
        `${month.toLocaleString('default', { month: 'long' })} ${month.getFullYear()}`,
      );
    }

    const rewardsByCustomer = transactions.reduce((acc, transaction) => {
      try {
        if (!acc[transaction.customerId]) {
          acc[transaction.customerId] = {
            customerName: transaction.customerName,
            rewards: [],
          };
        }

        acc[transaction.customerId].rewards.push(transaction);
        return acc;
      } catch (error) {
        logger.error(`Error processing transaction: ${error.message}`);
        return acc;
      }
    }, {});

    // Calculate total rewards for the last three months for each customer
    return Object.keys(rewardsByCustomer).map((customerId) => {
      const { customerName, rewards } = rewardsByCustomer[customerId];
      const relevantRewards = rewards.filter((reward) =>
        lastThreeMonths.includes(`${reward.month} ${reward.year}`),
      );
      const totalRewardPoints = relevantRewards.reduce(
        (sum, reward) => sum + reward.rewardPoints,
        0,
      );

      return {
        customerId,
        customerName,
        totalRewardPoints,
        lastThreeMonths,
      };
    });
  } catch (error) {
    logger.error(`Error in calculateTotalRewards: ${error.message}`);
    return [];
  }
};
