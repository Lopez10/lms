import { Id } from '../../../shared';
import { Module } from '../models/Module';
import { ModulePortRepository } from '../models/module.port.repository';
import { ModuleResponseDTO } from './module.dto';

export interface CreateModuleDto {
	title: string;
	isRootModule: boolean;
	moduleId?: string;
	courseId: string;
}

export class CreateModuleUseCase {
	constructor(private readonly moduleRepository: ModulePortRepository) {}

	async run(createModuleDto: CreateModuleDto): Promise<ModuleResponseDTO> {
		const module = toDomain(createModuleDto);
		await this.moduleRepository.insert(module);

		return toDto(module);
	}
}

function toDomain(createModuleDto: CreateModuleDto): Module {
	return Module.create({
		title: createModuleDto.title,
		isRootModule: createModuleDto.isRootModule,
		moduleId: createModuleDto.moduleId
			? Id.createExisted(createModuleDto.moduleId)
			: undefined,
		courseId: Id.createExisted(createModuleDto.courseId),
	});
}

function toDto(module: Module): ModuleResponseDTO {
	return {
		id: module.id.value,
		title: module.props.title,
		is_root_module: module.props.isRootModule,
		module_id: module.props.moduleId?.value ?? '',
		course_id: module.props.courseId.value,
	};
}
