import { Request, Response } from 'express';
import { GetUserByIdUseCase } from '../application/get-user-by-id.use-case';
import { USER_DEPENDENCIES } from './user.dependencies';
import { sendOk } from '../../../shared';

export const getUserById = async (req: Request, res: Response) => {
	const getUserByIdUseCase = new GetUserByIdUseCase(
		USER_DEPENDENCIES.userPrismaRepository,
	);

	const { id } = req.params;

	const user = await getUserByIdUseCase.run(id);

	return sendOk(res, user);
};
