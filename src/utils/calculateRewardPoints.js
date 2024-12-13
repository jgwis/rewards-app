export const calculateRewardPoints = (price) => {
  const validPrice = !isNaN(price) ? Math.floor(price) : 0;
  let points = 0;

  // Calculate rewards logic:
  // - 2 points for every dollar spent over $100
  // - 1 point for every dollar spent between $50 and $100
  if (validPrice > 100) {
    points += 2 * (validPrice - 100) + 50; // Add 50 points for the $50-$100 range
  } else if (validPrice > 50) {
    points += validPrice - 50; // 1 point for every dollar over $50
  }
  return points;
};
