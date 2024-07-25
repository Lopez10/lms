import { Module, ModulePrimitives } from '../domain/module.entity';
import { ModulePortRepository } from '../domain/module.port.repository';

export class CreateModuleUseCase {
	constructor(private readonly moduleRepository: ModulePortRepository) {}

	async run(createModuleDto: ModulePrimitives): Promise<Module> {
		const module = Module.createByPrimitives(createModuleDto);

		await this.moduleRepository.insert(module);

		return module;
	}
}
