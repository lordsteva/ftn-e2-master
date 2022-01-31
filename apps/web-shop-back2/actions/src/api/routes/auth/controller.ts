import { Router } from 'express';
import * as customService from './service';

const customRouter = Router();

customRouter.post('/login', customService.login);
customRouter.post('/registration', customService.registration);

export default customRouter;
