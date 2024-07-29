import { Request, Response } from 'express';
import { UserPrimitives } from '../domain/user.entity';
import { CreateUserUseCase } from '../application/create-user.use-case';
import { USER_DEPENDENCIES } from './user.dependencies';
import { sendBadRequest, sendCreated } from '../../../shared';
import { UserMapper } from '../application/user.mapper';

export const createUser = async (req: Request, res: Response) => {
	try {
		const createUserDto: UserPrimitives = req.body;
		const createUserUseCase = new CreateUserUseCase(
			USER_DEPENDENCIES.userPrismaRepository,
		);

		const user = await createUserUseCase.run(createUserDto);

		const responseUserDto = UserMapper.toDto(user);

		return sendCreated(res, {
			message: 'User created successfully',
			data: responseUserDto,
		});
	} catch (error) {
		console.error(error);
		return sendBadRequest(res);
	}
};
