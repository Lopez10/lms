import { Request, Response } from 'express';
import { sendOk } from '../../../shared';
import { GetModulesUseCase } from '../application/get-modules.use-case';
import { MODULE_DEPENDENCIES } from './module.dependencies';
import { ModuleMapper } from '../application/module.mapper';

export const getModules = async (req: Request, res: Response) => {
	const getModulesUseCase = new GetModulesUseCase(
		MODULE_DEPENDENCIES.modulePrismaRepository,
	);

	const modules = await getModulesUseCase.run();

	const responseModulesDto = modules.map(ModuleMapper.toDto);

	return sendOk(res, responseModulesDto);
};
