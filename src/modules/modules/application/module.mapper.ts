import { Id } from '../../../shared';
import { Module } from '../models/Module';

export interface ModuleResponseDTO {
	id: string;
	title: string;
	is_root_module: boolean;
	module_id: string;
	course_id: string;
}

export class ModuleMapper {
	static toDomain(moduleDto: ModuleResponseDTO): Module {
		return Module.create(
			{
				title: moduleDto.title,
				isRootModule: moduleDto.is_root_module,
				moduleId: Id.createExisted(moduleDto.module_id),
				courseId: Id.createExisted(moduleDto.course_id),
			},
			Id.createExisted(moduleDto.id),
		);
	}
	static toDto(module: Module): ModuleResponseDTO {
		return {
			id: module.id.value,
			title: module.props.title,
			is_root_module: module.props.isRootModule,
			module_id: module.props.moduleId.value,
			course_id: module.props.courseId.value,
		};
	}
}
