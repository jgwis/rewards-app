import { calculateTotalRewards } from '../utils/calculateTotalRewards';
import logger from '../utils/logger';

jest.mock('../utils/logger', () => ({
  error: jest.fn(),
}));

describe('calculateTotalRewards', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate total rewards for the last three months correctly', () => {
    const transactions = [
      {
        customerId: '12345',
        customerName: 'John Doe',
        month: 'December',
        year: 2024,
        rewardPoints: 100,
      },
      {
        customerId: '12345',
        customerName: 'John Doe',
        month: 'November',
        year: 2024,
        rewardPoints: 200,
      },
      {
        customerId: '12345',
        customerName: 'John Doe',
        month: 'October',
        year: 2024,
        rewardPoints: 150,
      },
      {
        customerId: '67890',
        customerName: 'Jane Smith',
        month: 'December',
        year: 2024,
        rewardPoints: 50,
      },
      {
        customerId: '67890',
        customerName: 'Jane Smith',
        month: 'September',
        year: 2024,
        rewardPoints: 300,
      },
    ];

    const result = calculateTotalRewards(transactions);

    expect(result).toEqual([
      {
        customerId: '12345',
        customerName: 'John Doe',
        totalRewardPoints: 450,
        lastThreeMonths: ['December 2024', 'November 2024', 'October 2024'],
      },
      {
        customerId: '67890',
        customerName: 'Jane Smith',
        totalRewardPoints: 50,
        lastThreeMonths: ['December 2024', 'November 2024', 'October 2024'],
      },
    ]);
  });

  it('should exclude rewards outside the last three months', () => {
    const transactions = [
      {
        customerId: '12345',
        customerName: 'John Doe',
        month: 'August',
        year: 2024,
        rewardPoints: 100,
      },
      {
        customerId: '12345',
        customerName: 'John Doe',
        month: 'July',
        year: 2024,
        rewardPoints: 50,
      },
      {
        customerId: '12345',
        customerName: 'John Doe',
        month: 'December',
        year: 2024,
        rewardPoints: 200,
      },
    ];

    const result = calculateTotalRewards(transactions);

    expect(result).toEqual([
      {
        customerId: '12345',
        customerName: 'John Doe',
        totalRewardPoints: 200,
        lastThreeMonths: ['December 2024', 'November 2024', 'October 2024'],
      },
    ]);
  });

  it('should handle transactions with no reward points', () => {
    const transactions = [
      {
        customerId: '12345',
        customerName: 'John Doe',
        month: 'December',
        year: 2024,
        rewardPoints: 0,
      },
      {
        customerId: '12345',
        customerName: 'John Doe',
        month: 'November',
        year: 2024,
        rewardPoints: 0,
      },
    ];

    const result = calculateTotalRewards(transactions);

    expect(result).toEqual([
      {
        customerId: '12345',
        customerName: 'John Doe',
        totalRewardPoints: 0,
        lastThreeMonths: ['December 2024', 'November 2024', 'October 2024'],
      },
    ]);
  });

  it('should log an error for invalid transactions', () => {
    const transactions = [
      {
        customerId: '12345',
        customerName: 'John Doe',
        month: 'December',
        year: 2024,
        rewardPoints: 100,
      },
      null, // Invalid transaction
      {
        customerId: '67890',
        customerName: 'Jane Smith',
        month: 'November',
        year: 2024,
        rewardPoints: 50,
      },
    ];

    const result = calculateTotalRewards(transactions);

    expect(result).toEqual([
      {
        customerId: '12345',
        customerName: 'John Doe',
        totalRewardPoints: 100,
        lastThreeMonths: ['December 2024', 'November 2024', 'October 2024'],
      },
      {
        customerId: '67890',
        customerName: 'Jane Smith',
        totalRewardPoints: 50,
        lastThreeMonths: ['December 2024', 'November 2024', 'October 2024'],
      },
    ]);

    expect(logger.error).toHaveBeenCalledWith(
      "Error processing transaction: Cannot read properties of null (reading 'customerId')",
    );
  });

  it('should return an empty array if there are no transactions', () => {
    const transactions = [];

    const result = calculateTotalRewards(transactions);

    expect(result).toEqual([]);
  });

  it('should log an error if the function throws an error', () => {
    const transactions = null; // Invalid input to cause an error

    const result = calculateTotalRewards(transactions);

    expect(result).toEqual([]);
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Error in calculateTotalRewards'),
    );
  });
});
