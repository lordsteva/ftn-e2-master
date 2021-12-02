import { Router } from 'express';
import * as transactionController from './controller';

const transactionRouter = Router();

transactionRouter.post('/link', transactionController.getCustomListHandler);

export default transactionRouter;
