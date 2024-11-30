export const calculateRewardPoints = (price) => {
  let points = 0;
  if (price > 100) {
    points += (price - 100) * 2; // 2 points for every dollar over $100
    price = 100; // cap the amount to $100 for the next calculation
  }
  if (price > 50) {
    points += price - 50; // 1 point for every dollar between $50 and $100
  }
  return Math.floor(points);
};
