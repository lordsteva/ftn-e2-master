import { Request, Response } from 'express';

export async function getCustomListHandler(req: Request, res: Response): Promise<Response> {
  return res.json({ answer: `got ${req.body.input.data.text}` });
}
