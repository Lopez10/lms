import { Id } from '../../../shared';
import { Module } from '../domain/module.entity';
import { ModulePortRepository } from '../domain/module.port.repository';

export class GetModuleByIdUseCase {
	constructor(private readonly moduleRepository: ModulePortRepository) {}

	async run(id: string): Promise<Module> {
		const moduleId = Id.createExisted(id);
		const module = await this.moduleRepository.getById(moduleId);

		if (!module) {
			throw new Error('Module not found');
		}

		return module;
	}
}
