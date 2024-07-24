import { Id } from '../../../shared';
import { Module } from '../models/Module';
import { CreateModuleDto } from './create-module.use-case';

export interface ModuleResponseDTO {
	id: string;
	title: string;
	is_root_module: boolean;
	module_id: string;
	course_id: string;
}

export class ModuleMapper {
	static toDomain(createModuleDto: CreateModuleDto): Module {
		return Module.create({
			title: createModuleDto.title,
			isRootModule: createModuleDto.isRootModule,
			moduleId: createModuleDto.moduleId
				? Id.createExisted(createModuleDto.moduleId)
				: undefined,
			courseId: Id.createExisted(createModuleDto.courseId),
		});
	}
	static toDto(module: Module): ModuleResponseDTO {
		return {
			id: module.id.value,
			title: module.props.title,
			is_root_module: module.props.isRootModule,
			module_id: module.props.moduleId?.value ?? '',
			course_id: module.props.courseId.value,
		};
	}
}
