import { Router } from 'express';
import * as customController from './controller';

const customRouter = Router();

customRouter.post('/random', customController.getCustomListHandler);

export default customRouter;
