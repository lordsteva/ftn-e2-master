import authRoutes from './auth/controller';
import cartRoutes from './cart/controller'

export default (app): void => {
  app.get('/', (req, res) => {
    res.send('Hello world');
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/cart', cartRoutes);

};
