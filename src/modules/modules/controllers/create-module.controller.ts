import { Request, Response } from 'express';
import { sendMethodNotImplemented } from '../../../shared';

export const createModule = async (req: Request, res: Response) => {
	return sendMethodNotImplemented(res);
};
