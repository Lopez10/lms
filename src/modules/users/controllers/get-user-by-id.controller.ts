import { Request, Response } from 'express';
import { GetUserByIdUseCase } from '../application/get-user-by-id.use-case';
import { USER_DEPENDENCIES } from './user.dependencies';
import { sendOk } from '../../../shared';
import { UserMapper } from '../application/user.mapper';

export const getUserById = async (req: Request, res: Response) => {
	const getUserByIdUseCase = new GetUserByIdUseCase(
		USER_DEPENDENCIES.userPrismaRepository,
	);

	const { userId } = req.params;

	const user = await getUserByIdUseCase.run(userId);

	const userResponseDto = UserMapper.toDto(user);

	return sendOk(res, userResponseDto);
};
