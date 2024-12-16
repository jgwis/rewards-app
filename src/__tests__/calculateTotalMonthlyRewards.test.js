import { calculateTotalMonthlyRewards } from '../utils/calculateTotalMonthlyRewards';

describe('calculateTotalMonthlyRewards', () => {
  it('should return the latest three months of reward points for each customer', () => {
    const transactions = [
      // Customer 12345 transactions
      {
        customerId: '12345',
        customerName: 'John Doe',
        purchaseDate: '2024-12-15',
        rewardPoints: 115,
      },
      {
        customerId: '12345',
        customerName: 'John Doe',
        purchaseDate: '2024-11-10',
        rewardPoints: 500,
      },
      {
        customerId: '12345',
        customerName: 'John Doe',
        purchaseDate: '2023-05-20',
        rewardPoints: 0,
      },
      // Customer 12346 transactions
      {
        customerId: '12346',
        customerName: 'Bob Brown',
        purchaseDate: '2024-10-05',
        rewardPoints: 180,
      },
      {
        customerId: '12346',
        customerName: 'Bob Brown',
        purchaseDate: '2024-09-15',
        rewardPoints: 30,
      },
      {
        customerId: '12346',
        customerName: 'Bob Brown',
        purchaseDate: '2024-06-25',
        rewardPoints: 0,
      },
    ];

    const result = calculateTotalMonthlyRewards(transactions);

    // Check if the results are correct
    expect(result.length).toBe(6);

    // Check specific customer records
    expect(result).toContainEqual({
      customerId: '12345',
      customerName: 'John Doe',
      month: 'November',
      year: 2024,
      monthNumber: 11,
      rewardPoints: 500,
    });

    expect(result).toContainEqual({
      customerId: '12346',
      customerName: 'Bob Brown',
      month: 'October',
      year: 2024,
      monthNumber: 10,
      rewardPoints: 180,
    });
  });
});
