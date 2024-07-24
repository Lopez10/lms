import {
	ModuleMapper,
	ModuleResponseDTO,
} from '../../../modules/modules/application/module.mapper';
import { Module } from '../../../modules/modules/models/Module';

export class ModuleMother {
	static create(params: Partial<ModuleResponseDTO>): Module {
		const moduleDto: ModuleResponseDTO = {
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
