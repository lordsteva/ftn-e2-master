import transactionsRouter from './transaction';

export default (app): void => {
  app.get('/', (req, res) => {
    res.send('Hello world');
  });

  app.use('/api/transactions', transactionsRouter);
};
