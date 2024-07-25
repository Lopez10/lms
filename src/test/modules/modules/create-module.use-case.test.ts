import { CreateModuleUseCase } from '../../../modules/modules/application/create-module.use-case';
import { ModuleInMemoryRepository } from '../../../modules/modules/infrastructure/module.in-memory.repository';

describe('create module use case', () => {
	it(`
        GIVEN there are a title, a course id, a module id and a boolean value
        WHEN I create a module
        THEN the module is created successfully
    `, async () => {
		const moduleRepository = new ModuleInMemoryRepository();
		const createModule = new CreateModuleUseCase(moduleRepository);

		// GIVEN
		const title = 'module title';
		const courseId = 'course12345';
		const moduleId = 'module12345';
		const isRootModule = true;

		// WHEN
		const module = await createModule.run({
			title,
			courseId,
			moduleId,
			isRootModule,
		});

		// THEN
		expect(module).toBeDefined();
		expect(module.id).toBeDefined();
		expect(module.props.title).toBe(title);
		expect(module.props.courseId.value).toBe(courseId);
		expect(module.props.moduleId.value).toBe(moduleId);
		expect(module.props.isRootModule).toBe(isRootModule);
	});
});
