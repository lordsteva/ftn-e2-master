import express from 'express';
import expressOasGenerator from 'express-oas-generator';
import registerMiddlewares from './middlewares';
import { errorHandler } from './middlewares/errorHandler';
import registerRoutes from './routes';

const app = express();
registerMiddlewares(app);
registerRoutes(app);
// app.use(errors());
app.use(errorHandler);
expressOasGenerator.init(app, {});

export default app;
