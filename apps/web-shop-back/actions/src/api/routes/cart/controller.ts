import { Router } from 'express';
import * as cartService from './service';

const cartRouter = Router();

cartRouter.post('/remove', cartService.removeItem);
cartRouter.post('/add', cartService.addItem);

export default cartRouter;
