import { Id } from '../../../shared';
import { ModulePortRepository } from '../models/module.port.repository';
import { ModuleResponseDto, ModuleMapper } from './module.mapper';

export class GetModuleByIdUseCase {
	constructor(private readonly moduleRepository: ModulePortRepository) {}

	async run(id: string): Promise<ModuleResponseDto> {
		const moduleId = Id.createExisted(id);
		const module = await this.moduleRepository.getById(moduleId);

		if (!module) {
			throw new Error('Module not found');
		}

		return ModuleMapper.toDto(module);
	}
}
