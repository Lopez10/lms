import { Request, Response } from 'express';
import { CompletionPrimitives } from '../domain/completion.entity';
import { COMPLETION_DEPENDENCIES } from './completion.dependencies';
import { CreateCompletationUseCase } from '../application/create-completation.use-case';
import { CompletionMapper } from '../application/completion.mapper';
import { sendBadRequest, sendCreated } from '../../../shared';

export const createCompletion = async (req: Request, res: Response) => {
	try {
		const createCompletionDto: CompletionPrimitives = req.body;
		const createCompletionUseCase = new CreateCompletationUseCase(
			COMPLETION_DEPENDENCIES.completionPrismaRepository,
		);

		const completionCreated =
			await createCompletionUseCase.run(createCompletionDto);
		const responseCompletionDto = CompletionMapper.toDto(completionCreated);

		sendCreated(res, {
			message: 'Completion created successfully',
			data: responseCompletionDto,
		});
	} catch (error) {
		console.error(error);
		return sendBadRequest(res);
	}
};
