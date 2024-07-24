export interface CourseProps {
	id: string;
	title: string;
}

export class Course implements CourseProps {
	id: string;
	title: string;

	constructor({ id, title }: CourseProps) {
		this.id = id;
		this.title = title;
	}
}
