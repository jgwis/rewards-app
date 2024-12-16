import { calculateRewardPoints } from '../utils/calculateRewardPoints';

describe('calculateRewardPoints', () => {
  it('should return 0 for prices less than or equal to 50', () => {
    expect(calculateRewardPoints(50)).toBe(0);
    expect(calculateRewardPoints(30)).toBe(0);
    expect(calculateRewardPoints(0)).toBe(0);
    expect(calculateRewardPoints(-10)).toBe(0);
  });

  it('should calculate correct points for prices between 51 and 100', () => {
    expect(calculateRewardPoints(51)).toBe(1);
    expect(calculateRewardPoints(75)).toBe(25);
    expect(calculateRewardPoints(100)).toBe(50);
  });

  it('should calculate correct points for prices above 100', () => {
    expect(calculateRewardPoints(101)).toBe(52);
    expect(calculateRewardPoints(150)).toBe(150);
    expect(calculateRewardPoints(200)).toBe(250);
  });

  it('should handle invalid or NaN inputs gracefully', () => {
    expect(calculateRewardPoints(null)).toBe(0);
    expect(calculateRewardPoints(undefined)).toBe(0);
    expect(calculateRewardPoints('abc')).toBe(0);
    expect(calculateRewardPoints(NaN)).toBe(0);
  });

  it('should handle floating-point prices by flooring the value', () => {
    expect(calculateRewardPoints(50.5)).toBe(0);
    expect(calculateRewardPoints(100.9)).toBe(50);
    expect(calculateRewardPoints(150.9)).toBe(150);
  });
});
