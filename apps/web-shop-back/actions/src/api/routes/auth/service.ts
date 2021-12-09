import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../../config/constants';
import getUser from '../../../graphql/getUser';
import insertUser from '../../../graphql/insertUser';
import createCart from '../../../graphql/createCart'

export async function getCustomListHandler(req: Request, res: Response): Promise<Response> {
  return res.json({ answer: `got ${req.body.input.data.text}` });
}

export const login = async (req: Request, resp: Response) => {
  // You can access their arguments input at req.body.input
  const { username, password } = req.body.input;
  // perform your custom business logic
  // check if the username and password are valid and login the user

  const { password: pass, id, cart } = (await getUser({ email: username })) ?? {};
  const cart_id = cart[0].id;

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
        cart_id,
        id,
      },
      config.TOKEN_KEY,
      {
        expiresIn: '24h',
      },
    );
    return resp.json({
      accessToken,
    });
  }
  return resp.json({
    accessToken: null,
  });
};

export const registration = async (req: Request, resp: Response) => {
  // get request input
  const { fullName, email, password } = req.body.input;

  // run some business logic

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  try {
    const { id } = await insertUser({ fullName, email, password: hash });

    if (id) {
      await createCart({ user_id: id });
    }
    // success
    return resp.json({
      id,
    });
  } catch (e) {
    console.log(e);
    return resp.json({
      id: null,
    });
  }
};
