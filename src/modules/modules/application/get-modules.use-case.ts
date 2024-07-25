import { Module } from '../models/module.entity';
import { ModulePortRepository } from '../models/module.port.repository';

export class GetModules {
	constructor(private readonly moduleRepository: ModulePortRepository) {}

	async run(): Promise<Module[]> {
		const modules = await this.moduleRepository.getAll();

		return modules;
	}
}
