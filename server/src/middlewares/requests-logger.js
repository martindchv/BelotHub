export const requestsLogger = (req, _, next) => {
  /* eslint-disable no-console */
  console.log(`url=${req.url}`);
  console.log(`method=${req.method}`);
  console.log('headers', req.headers);
  /* eslint-enable no-console */
  next();
};
