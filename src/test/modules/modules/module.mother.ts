import {
	ModuleMapper,
	ModuleDto,
} from '../../../modules/modules/application/module.mapper';
import { Module } from '../../../modules/modules/models/module.entity';

export class ModuleMother {
	static create(params: Partial<ModuleDto>): Module {
		const moduleDto: ModuleDto = {
			id: 'module-id',
			title: 'module-title',
			isRootModule: false,
			moduleId: 'module-id',
			courseId: 'course-id',
			...params,
		};

		return ModuleMapper.toDomain(moduleDto);
	}
}
