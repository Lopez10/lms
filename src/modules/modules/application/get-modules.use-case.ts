import { Module } from '../domain/module.entity';
import { ModulePortRepository } from '../domain/module.port.repository';

export class GetModulesUseCase {
	constructor(private readonly moduleRepository: ModulePortRepository) {}

	async run(): Promise<Module[]> {
		const modules = await this.moduleRepository.getAll();

		return modules;
	}
}
