import { Request, Response } from 'express';
import { sendOk } from '../../../shared';
import { GetModuleByIdUseCase } from '../application/get-module-by-id.use-case';
import { MODULE_DEPENDENCIES } from './module.dependencies';
import { ModuleMapper } from '../application/module.mapper';

export const getModuleById = async (req: Request, res: Response) => {
	const getModuleByIdUseCase = new GetModuleByIdUseCase(
		MODULE_DEPENDENCIES.modulePrismaRepository,
	);

	const { moduleId } = req.params;

	const module = await getModuleByIdUseCase.run(moduleId);
	const responseModuleDto = ModuleMapper.toDto(module);

	return sendOk(res, responseModuleDto);
};
