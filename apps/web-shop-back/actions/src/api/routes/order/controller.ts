import { Router } from 'express';
import * as orderService from './service';

const customRouter = Router();

customRouter.post('/create-payment-intent', orderService.createPaymentIntent);

export default customRouter;