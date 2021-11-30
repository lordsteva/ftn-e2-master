import { Request, Response } from 'express';
import insertUser from '../../../graphql/insertUser';

export async function getCustomListHandler(req: Request, res: Response): Promise<Response> {
  console.log(req.body.input);
  return res.json({ answer: `got ${req.body.input.data.text}` });
}

export const login = async (req, resp) => {
  // You can access their arguments input at req.body.input
  const { username, password } = req.body.input;
  console.log(req.body.input);
  // perform your custom business logic
  // check if the username and password are valid and login the user

  // return the response
  return resp.json({
    accessToken: 'Ew8jkGCNDGAo7p35RV72e0Lk3RGJoJKB',
  });
};

export const registration = async (req, resp) => {
  // get request input
  const { fullName, email, password } = req.body.input;
  console.log(req.body.input);
  // run some business logic

  const { id } = await insertUser({ fullName, email, password });

  // success
  return resp.json({
    id,
  });
};
