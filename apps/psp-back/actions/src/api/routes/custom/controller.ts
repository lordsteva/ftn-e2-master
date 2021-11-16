import { Request, Response } from 'express';

export async function getCustomListHandler(_: Request, res: Response): Promise<Response> {
  const customList = {}; // await getCustomList();

  return res.json(customList);
}
