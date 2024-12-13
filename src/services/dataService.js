import logger from '../utils/logger';

export const fetchTransitionsData = async () => {
  try {
    const response = await fetch('./data/rewards.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error('Failed to fetch data:', error);
    throw error;
  }
};
