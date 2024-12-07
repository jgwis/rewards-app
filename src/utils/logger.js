const logger = {
  log: (message) => {
    console.log(`[INFO]: ${message}`);
  },
  error: (message) => {
    console.error(`[ERROR]: ${message}`);
  },
};

export default logger;
