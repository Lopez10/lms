import {
	ModuleMapper,
	ModuleResponseDto,
} from '../../../modules/modules/application/module.mapper';
import { Module } from '../../../modules/modules/models/module.entity';

export class ModuleMother {
	static create(params: Partial<ModuleResponseDto>): Module {
		const moduleDto: ModuleResponseDto = {
			id: 'module-id',
			title: 'module-title',
			is_root_module: false,
			module_id: 'module-id',
			course_id: 'course-id',
			...params,
		};

		return ModuleMapper.toDomain(moduleDto);
	}
}
