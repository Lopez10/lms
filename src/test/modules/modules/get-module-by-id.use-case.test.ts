import { GetModuleByIdUseCase } from '../../../modules/modules/application/get-module-by-id.use-case';
import { ModuleInMemoryRepository } from '../../../modules/modules/infrastructure/module.in-memory.repository';
import { NotFoundException } from '../../../shared/application/exceptions';
import { ModuleMother } from './module.mother';

describe('get module by id use case', () => {
	it(`
        GIVEN there is a module id inserted in the repository
        WHEN I get a module by id
        THEN the module is returned successfully
    `, async () => {
		const moduleRepository = new ModuleInMemoryRepository();
		const getModuleById = new GetModuleByIdUseCase(moduleRepository);

		// GIVEN
		const id = 'moduleId123';
		moduleRepository.insert(ModuleMother.create({ id }));

		// WHEN
		const module = await getModuleById.run(id);

		// THEN
		expect(module).toBeDefined();
		expect(module.id).toBeDefined();
		expect(module.id.value).toBe(id);
	});
	it(`
        GIVEN there is no module id inserted in the repository
        WHEN I get a module by id
        THEN a not found exception is thrown
    `, async () => {
		const moduleRepository = new ModuleInMemoryRepository();
		const getModuleById = new GetModuleByIdUseCase(moduleRepository);

		// GIVEN
		const id = 'moduleId123';
		expect.assertions(1);

		try {
			// WHEN
			await getModuleById.run(id);
		} catch (error) {
			// THEN
			expect(error).toBeInstanceOf(NotFoundException);
		}
	});
});
