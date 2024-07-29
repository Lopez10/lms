import { Id } from '../../../shared';
import { Module } from '../domain/module.entity';

export interface ModuleDto {
	id: string;
	title: string;
	isRootModule: boolean;
	moduleId: string | null;
	courseId: string;
}

export class ModuleMapper {
	static toDomain(moduleDto: ModuleDto): Module {
		return Module.create(
			{
				title: moduleDto.title,
				isRootModule: moduleDto.isRootModule,
				moduleId: moduleDto.moduleId
					? Id.createExisted(moduleDto.moduleId)
					: null,
				courseId: Id.createExisted(moduleDto.courseId),
			},
			Id.createExisted(moduleDto.id),
		);
	}
	static toDto(module: Module): ModuleDto {
		return {
			id: module.id.value,
			title: module.props.title,
			isRootModule: module.props.isRootModule,
			moduleId: module.props.moduleId ? module.props.moduleId.value : null,
			courseId: module.props.courseId.value,
		};
	}
}
