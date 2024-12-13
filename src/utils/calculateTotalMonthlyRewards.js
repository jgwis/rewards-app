export const calculateTotalMonthlyRewards = (transactions) => {
  const monthlyRewards = transactions.reduce(
    (acc, { customerId, customerName, purchaseDate, rewardPoints }) => {
      const date = new Date(purchaseDate);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
      if (!acc[customerId]) {
        acc[customerId] = {
          customerName,
          rewardsByMonth: {},
        };
      }

      const customerRewards = acc[customerId].rewardsByMonth;
      const updatedRewards = customerRewards[monthYear]
        ? customerRewards[monthYear] + rewardPoints
        : rewardPoints;

      // Safely update the accumulator with the new reward points
      return {
        ...acc,
        [customerId]: {
          customerName,
          rewardsByMonth: {
            ...customerRewards,
            [monthYear]: updatedRewards,
          },
        },
      };
    },
    {},
  );

  // Transform and sort the accumulated data
  return Object.keys(monthlyRewards)
    .map((customerId) => {
      const { customerName, rewardsByMonth } = monthlyRewards[customerId];
      return Object.keys(rewardsByMonth).map((monthYear) => {
        const [month, year] = monthYear.split('-');
        const monthName = new Date(`${year}-${month}-01`).toLocaleString(
          'default',
          { month: 'long' },
        );
        return {
          customerId,
          customerName,
          month: monthName,
          year: Number(year),
          monthNumber: Number(month),
          rewardPoints: rewardsByMonth[monthYear],
        };
      });
    })
    .flat()
    .sort((a, b) => b.year - a.year || b.monthNumber - a.monthNumber)
    .map(({ ...item }) => item);
};
