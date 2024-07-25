import { Entity } from '../../../shared/domain/entity.base';
import { Id } from '../../../shared/domain/id.value-object';

interface ModuleProps {
	title: string;
	isRootModule: boolean;
	moduleId: Id;
	courseId: Id;
}

export interface ModulePrimitives {
	title: string;
	isRootModule: boolean;
	moduleId: string;
	courseId: string;
}

export class Module extends Entity<ModuleProps> {
	private constructor(props: ModuleProps, id?: Id) {
		super(props, id);
	}

	static create(props: ModuleProps, id?: Id): Module {
		const module = new Module(props, id);
		return module;
	}

	static createByPrimitives(primitives: ModulePrimitives, id?: string): Module {
		return Module.create(
			{
				title: primitives.title,
				isRootModule: primitives.isRootModule,
				moduleId: Id.createExisted(primitives.moduleId),
				courseId: Id.createExisted(primitives.courseId),
			},
			id ? Id.createExisted(id) : Id.generateId(),
		);
	}
}
