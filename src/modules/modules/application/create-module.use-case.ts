import { Module, ModulePrimitives } from '../models/module.entity';
import { ModulePortRepository } from '../models/module.port.repository';

export class CreateModuleUseCase {
	constructor(private readonly moduleRepository: ModulePortRepository) {}

	async run(createModuleDto: ModulePrimitives): Promise<Module> {
		const module = Module.createByPrimitives(createModuleDto);

		await this.moduleRepository.insert(module);

		return module;
	}
}
