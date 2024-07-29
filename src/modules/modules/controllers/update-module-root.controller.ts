import { Request, Response } from 'express';
import {
	UpdateModuleRootDto,
	UpdateModuleRootUseCase,
} from '../application/update-module-root.use-case';
import { MODULE_DEPENDENCIES } from './module.dependencies';
import { ModuleMapper } from '../application/module.mapper';
import { sendBadRequest, sendOk } from '../../../shared';

export const updateModuleRoot = async (req: Request, res: Response) => {
	try {
		const updateModuleRootDto: UpdateModuleRootDto = req.body;
		const updateModuleRootUseCase = new UpdateModuleRootUseCase(
			MODULE_DEPENDENCIES.modulePrismaRepository,
		);

		const moduleUpdated =
			await updateModuleRootUseCase.run(updateModuleRootDto);
		const responseModuleDto = ModuleMapper.toDto(moduleUpdated);

		return sendOk(res, {
			message: 'Module updated successfully',
			data: responseModuleDto,
		});
	} catch (error) {
		console.error(error);
		return sendBadRequest(res);
	}
};
