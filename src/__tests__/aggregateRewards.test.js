import { transactionsData } from '../json/jsondata';
import {
  aggregateRewards,
  calculateTotalRewards,
} from '../utils/aggregateRewards';

test('Calculate reward points correctly', () => {
  const rewards = aggregateRewards(transactionsData);
  expect(
    rewards['John Doe']['monthRewards']['December 2023'],
  ).toBeGreaterThanOrEqual(90);
  expect(
    rewards['Jane Smith']['monthRewards']['December 2023'],
  ).toBeGreaterThanOrEqual(0);
});

test('Total Rewards Calculation', () => {
  const rewardsByMonth = aggregateRewards(transactionsData);
  const totalRewards = calculateTotalRewards(rewardsByMonth);
  expect(totalRewards['John Doe']).toBeGreaterThanOrEqual(124);
  expect(totalRewards['Jane Smith']).toBeGreaterThanOrEqual(89);
});
