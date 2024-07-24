import { ModulePortRepository } from '../models/module.port.repository';
import { ModuleMapper, ModuleResponseDTO } from './module.mapper';

export interface CreateModuleDto {
	title: string;
	isRootModule: boolean;
	moduleId?: string;
	courseId: string;
}

export class CreateModuleUseCase {
	constructor(private readonly moduleRepository: ModulePortRepository) {}

	async run(createModuleDto: CreateModuleDto): Promise<ModuleResponseDTO> {
		const module = ModuleMapper.toDomain(createModuleDto);
		await this.moduleRepository.insert(module);

		return ModuleMapper.toDto(module);
	}
}
