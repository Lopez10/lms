export interface LessonProps {
	id: string;
	moduleId: string;
	title: string;
}

export class Lesson implements LessonProps {
	id: string;
	moduleId: string;
	title: string;

	constructor({ id, moduleId, title }: LessonProps) {
		this.id = id;
		this.moduleId = moduleId;
		this.title = title;
	}
}
