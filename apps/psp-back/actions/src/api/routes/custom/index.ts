import { Router } from 'express';
import * as customController from './controller';

const customRouter = Router();

customRouter.get('/', customController.getCustomListHandler);

export default customRouter;
