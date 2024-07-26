import { Request, Response } from 'express';
import { UserPrimitives } from '../domain/user.entity';
import { CreateUserUseCase } from '../application/create-user.use-case';
import { USER_DEPENDENCIES } from './user.dependencies';
import { sendBadRequest, sendCreated } from '../../../shared';

export const createUser = async (req: Request, res: Response) => {
	try {
		const createUserDto: UserPrimitives = req.body;
		const createUserUseCase = new CreateUserUseCase(
			USER_DEPENDENCIES.userPrismaRepository,
		);

		const responseUserDto = await createUserUseCase.run(createUserDto);

		return sendCreated(res, {
			message: 'User created successfully',
			data: responseUserDto,
		});
	} catch (error) {
		console.error(error);
		return sendBadRequest(res);
	}
};
