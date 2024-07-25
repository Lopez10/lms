import { Id } from '../../../shared';
import { Module } from '../models/module.entity';

export interface ModuleDto {
	id: string;
	title: string;
	isRootModule: boolean;
	moduleId: string;
	courseId: string;
}

export class ModuleMapper {
	static toDomain(moduleDto: ModuleDto): Module {
		return Module.create(
			{
				title: moduleDto.title,
				isRootModule: moduleDto.isRootModule,
				moduleId: Id.createExisted(moduleDto.moduleId),
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
			moduleId: module.props.moduleId.value,
			courseId: module.props.courseId.value,
		};
	}
}
