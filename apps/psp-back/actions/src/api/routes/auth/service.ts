import { Request, Response } from 'express';

export async function getCustomListHandler(req: Request, res: Response): Promise<Response> {
  return res.json({ answer: `got ${req.body.input.data.text}` });
}

export const login = async (req, resp) => {
  // You can access their arguments input at req.body.input
  const { username, password } = req.body.input;

  // perform your custom business logic
  // check if the username and password are valid and login the user

  // return the response
  return resp.json({
    accessToken: 'Ew8jkGCNDGAo7p35RV72e0Lk3RGJoJKB',
  });
};
