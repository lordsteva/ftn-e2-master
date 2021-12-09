import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../config/constants';
import getUser from '../../../graphql/backend/getUser';
import logger from '../../../logger/logger';

export default async (req: Request, resp: Response) => {
  // You can access their arguments input at req.body.input
  const { username, password } = req.body.input;
  // perform your custom business logic
  // check if the username and password are valid and login the user

  const { password: pass, id } = (await getUser({ email: username })) ?? {};
  logger.info(`Atempt login with email:${username}`);
  const match = await bcrypt.compare(password, pass || '');
  if (match) {
    const accessToken = jwt.sign(
      {
        'https://hasura.io/jwt/claims': JSON.stringify({
          'x-hasura-user-id': id,
          'x-hasura-allowed-roles': ['USER'],
          'x-hasura-default-role': 'USER',
        }),
        email: username,
        id,
      },
      config.TOKEN_KEY,
      {
        expiresIn: '24h',
      },
    );
    logger.info(`Successful login with email:${username}`);
    return resp.json({
      accessToken,
    });
  }
  logger.warn(`Unsuccessful login with email:${username}`);
  return resp.json({
    accessToken: null,
  });
};
