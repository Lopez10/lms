interface ModuleProps {
	id: string;
	title: string;
	isRootModule: boolean;
	moduleId: string;
	courseId: string;
}

export class Module implements ModuleProps {
	id: string;
	title: string;
	isRootModule: boolean;
	moduleId: string;
	courseId: string;

	constructor({ id, title, isRootModule, moduleId, courseId }: ModuleProps) {
		this.id = id;
		this.title = title;
		this.isRootModule = isRootModule;
		this.moduleId = moduleId;
		this.courseId = courseId;
	}
}
