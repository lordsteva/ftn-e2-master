import authRoutes from './auth/controller';

export default (app): void => {
  app.get('/', (req, res) => {
    res.send('Hello world');
  });

  app.use('/api/auth', authRoutes);

};
