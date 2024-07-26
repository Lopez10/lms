import { GetModulesUseCase } from '../../../modules/modules/application/get-modules.use-case';
import { ModuleInMemoryRepository } from '../../../modules/modules/infrastructure/module.in-memory.repository';
import { ModuleMother } from './module.mother';

describe('get modules use case', () => {
	it(`
        GIVEN there are modules inserted in the repository
        WHEN I get all modules
        THEN the modules are returned successfully
    `, async () => {
		const moduleRepository = new ModuleInMemoryRepository();
		const getModules = new GetModulesUseCase(moduleRepository);
		const id1 = 'moduleId123';
		const id2 = 'moduleId223';

		// GIVEN
		const module1 = ModuleMother.create({ id: id1 });
		const module2 = ModuleMother.create({ id: id2 });
		moduleRepository.insert(module1);
		moduleRepository.insert(module2);

		// WHEN
		const modules = await getModules.run();

		// THEN
		expect(modules).toHaveLength(2);
		expect(modules[0].id).toBeDefined();
		expect(modules[0].id.value).toBe(id1);
		expect(modules[1].id).toBeDefined();
		expect(modules[1].id.value).toBe(id2);
	});
	it(`
        GIVEN there are no modules inserted in the repository
        WHEN I get all modules
        THEN an empty array is returned
    `, async () => {
		const moduleRepository = new ModuleInMemoryRepository();
		const getModules = new GetModulesUseCase(moduleRepository);

		// GIVEN

		// WHEN
		const modules = await getModules.run();

		// THEN
		expect(modules).toHaveLength(0);
	});
});
