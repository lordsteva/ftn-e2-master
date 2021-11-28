import authRoutes from './auth/controller';
import customRoutes from './custom/controller';

export default (app): void => {
  app.get('/', (req, res) => {
    res.send('Hello world');
  });

  app.use('/api/custom', customRoutes);
  app.use('/api/auth', authRoutes);
};
