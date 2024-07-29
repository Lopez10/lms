import { Id } from '../../../shared';
import { NotFoundException } from '../../../shared/application/exceptions';
import { Module } from '../domain/module.entity';
import { ModulePortRepository } from '../domain/module.port.repository';

export interface UpdateModuleRootDto {
	moduleId: string;
	moduleParentId: string | null;
}

export class UpdateModuleRootUseCase {
	constructor(private readonly moduleRepository: ModulePortRepository) {}

	async run(input: UpdateModuleRootDto): Promise<Module> {
		const module = await this.moduleRepository.getById(
			Id.createExisted(input.moduleId),
		);
		if (!module) {
			throw new NotFoundException('Module not found');
		}

		if (input.moduleParentId === null) {
			module.makeRootModule();
			await this.moduleRepository.update(module);
			return module;
		}

		const parentModule = await this.moduleRepository.getById(
			Id.createExisted(input.moduleParentId),
		);
		if (!parentModule) {
			throw new NotFoundException('Parent module not found');
		}

		module.makeChildModule(parentModule.id);
		await this.moduleRepository.update(module);
		return module;
	}
}
