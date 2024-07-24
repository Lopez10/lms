import { Id } from '../../../shared';
import { Module } from '../models/Module';
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
		const moduleId = createModuleDto.moduleId
			? Id.createExisted(createModuleDto.moduleId)
			: undefined;

		const module = Module.create({
			title: createModuleDto.title,
			isRootModule: createModuleDto.isRootModule,
			moduleId,
			courseId: Id.createExisted(createModuleDto.courseId),
		});

		await this.moduleRepository.insert(module);

		return ModuleMapper.toDto(module);
	}
}
