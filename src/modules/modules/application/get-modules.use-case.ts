import { ModulePortRepository } from '../models/module.port.repository';
import { ModuleMapper, ModuleResponseDTO } from './module.mapper';

export class GetModules {
	constructor(private readonly moduleRepository: ModulePortRepository) {}

	async run(): Promise<ModuleResponseDTO[]> {
		const modules = await this.moduleRepository.getAll();

		return modules.map((module) => ModuleMapper.toDto(module));
	}
}
