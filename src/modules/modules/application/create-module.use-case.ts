import { Id } from '../../../shared';
import { Module, ModulePrimitives } from '../models/module.entity';
import { ModulePortRepository } from '../models/module.port.repository';
import { ModuleMapper, ModuleResponseDto } from './module.mapper';

export class CreateModuleUseCase {
	constructor(private readonly moduleRepository: ModulePortRepository) {}

	async run(createModuleDto: ModulePrimitives): Promise<ModuleResponseDto> {
		const module = Module.createByPrimitives(createModuleDto);

		await this.moduleRepository.insert(module);

		return ModuleMapper.toDto(module);
	}
}
