import {
	UpdateModuleRootUseCase,
	UpdateModuleRootDto,
} from '../../../../modules/modules/application/update-module-root.use-case';
import { ModuleInMemoryRepository } from '../infrastructure/module.in-memory.repository';
import { ModuleMother } from '../module.mother';

describe('update module root use case test', () => {
	it(`
        GIVEN there are two modules which one is the parent of the other
        WHEN I update the child module to be a root module
        THEN the module should have the parent module id as null and isRootModule as true
    `, async () => {
		const moduleRepository = new ModuleInMemoryRepository();
		const updateModuleRootUseCase = new UpdateModuleRootUseCase(
			moduleRepository,
		);

		const id1 = 'moduleId123';
		const id2 = 'moduleId456';

		const updateModuleRootDto: UpdateModuleRootDto = {
			moduleId: id2,
			moduleParentId: null,
		};

		// GIVEN
		const module1 = ModuleMother.create({
			id: id1,
			moduleId: null,
			isRootModule: true,
		});

		const module2 = ModuleMother.create({
			id: id2,
			moduleId: id1,
			isRootModule: false,
		});

		moduleRepository.insert(module1);
		moduleRepository.insert(module2);

		// WHEN
		const module = await updateModuleRootUseCase.run(updateModuleRootDto);

		// THEN
		expect(module.id.value).toBe(id2);
		expect(module.props.moduleId).toBe(null);
		expect(module.props.isRootModule).toBe(true);
	});

	it(`
        GIVEN there are two root modules
        WHEN I update one of them to be a child of the other
        THEN the module should have the parent module id as the id of the root module and isRootModule as false
    `, async () => {
		const moduleRepository = new ModuleInMemoryRepository();
		const updateModuleRootUseCase = new UpdateModuleRootUseCase(
			moduleRepository,
		);

		const id1 = 'moduleId123';
		const id2 = 'moduleId456';

		const updateModuleRootDto: UpdateModuleRootDto = {
			moduleId: id2,
			moduleParentId: id1,
		};

		// GIVEN
		const module1 = ModuleMother.create({
			id: id1,
			moduleId: null,
			isRootModule: true,
		});

		const module2 = ModuleMother.create({
			id: id2,
			moduleId: null,
			isRootModule: true,
		});

		moduleRepository.insert(module1);
		moduleRepository.insert(module2);

		// WHEN
		const module = await updateModuleRootUseCase.run(updateModuleRootDto);

		// THEN
		expect(module.id.value).toBe(id2);
		expect(module.props.moduleId?.value).toBe(id1);
		expect(module.props.isRootModule).toBe(false);
	});
});
