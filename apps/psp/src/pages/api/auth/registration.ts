import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import insertUser from '../../../graphql/backend/insertUser';
import logger from '../../../logger/logger';

export const registration = async (req: Request, resp: Response) => {
  // get request input
  const { fullName, email, password } = req.body.input;
  console.log(email);
  // run some business logic
  logger.info(`Atempt registration with email:${email}`);
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  try {
    const { id } = await insertUser({ fullName, email, password: hash });

    // success
    logger.info(`Successful registration with email:${email}`);
    return resp.json({
      id,
    });
  } catch (e) {
    logger.error(`Unsuccessful registration with email:${email}`);
    return resp.json({
      id: null,
    });
  }
};

export default registration;
