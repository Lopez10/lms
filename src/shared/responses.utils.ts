import { Response } from 'express';

export const sendMethodNotImplemented = (res: Response, method = 'Method') => {
	return res.status(501).json({
		message: `${method} not implemented`,
	});
};

export const sendNotFound = (res: Response, message = 'Not found') => {
	return res.status(404).json({
		message,
	});
};

export const sendBadRequest = (res: Response, message = 'Bad request') => {
	return res.status(400).json({
		message,
	});
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const sendOk = (res: Response, data: any) => {
	return res.status(200).json(data);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const sendCreated = (res: Response, data: any) => {
	return res.status(201).json(data);
};
