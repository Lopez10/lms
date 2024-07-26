import { Request, Response } from 'express';
import { ModulePrimitives } from '../domain/module.entity';
import { CreateModuleUseCase } from '../application/create-module.use-case';
import { MODULE_DEPENDENCIES } from './module.dependencies';
import { ModuleMapper } from '../application/module.mapper';
import { sendBadRequest, sendCreated } from '../../../shared';

export const createModule = async (req: Request, res: Response) => {
	try {
		const createModuleDto: ModulePrimitives = req.body;
		const createModuleUseCase = new CreateModuleUseCase(
			MODULE_DEPENDENCIES.modulePrismaRepository,
		);

		const moduleCreated = await createModuleUseCase.run(createModuleDto);
		const responseModuleDto = ModuleMapper.toDto(moduleCreated);

		return sendCreated(res, {
			message: 'Module created successfully',
			data: responseModuleDto,
		});
	} catch (error) {
		console.error(error);
		return sendBadRequest(res);
	}
};
