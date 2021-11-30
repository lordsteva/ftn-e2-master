import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import getUser from '../../../graphql/getUser';
import insertUser from '../../../graphql/insertUser';

export async function getCustomListHandler(req: Request, res: Response): Promise<Response> {
  console.log(req.body.input);
  return res.json({ answer: `got ${req.body.input.data.text}` });
}

export const login = async (req: Request, resp: Response) => {
  // You can access their arguments input at req.body.input
  const { username, password } = req.body.input;
  console.log(req.body.input);
  // perform your custom business logic
  // check if the username and password are valid and login the user

  const { password: pass } = await getUser({ email: username });
  const match = await bcrypt.compare(password, pass);
  if (match) {
  } else {
  }
  // return the response
  return resp.json({
    accessToken: 'Ew8jkGCNDGAo7p35RV72e0Lk3RGJoJKB',
  });
};

export const registration = async (req: Request, resp: Response) => {
  // get request input
  const { fullName, email, password } = req.body.input;
  console.log(req.body.input);
  // run some business logic

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  try {
    const { id } = await insertUser({ fullName, email, password: hash });

    // success
    return resp.json({
      id,
    });
  } catch (e) {
    return resp.json({
      id: null,
    });
  }
};
