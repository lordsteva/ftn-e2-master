import { Request, Response } from 'express';

export async function getCustomListHandler(req: Request, res: Response): Promise<Response> {
  console.log(req.body.input);
  return res.json({ answer: `got ${req.body.input.data.text}` });
}
