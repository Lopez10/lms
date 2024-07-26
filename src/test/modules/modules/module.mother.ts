import {
	ModuleMapper,
	ModuleDto,
} from '../../../modules/modules/application/module.mapper';
import { Module } from '../../../modules/modules/domain/module.entity';

export class ModuleMother {
	static create(params: Partial<ModuleDto>): Module {
		const moduleDto: ModuleDto = {
			id: 'moduleId123',
			title: 'module-title',
			isRootModule: false,
			moduleId: 'moduleId123',
			courseId: 'courseId123',
			...params,
		};

		return ModuleMapper.toDomain(moduleDto);
	}
}
