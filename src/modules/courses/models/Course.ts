export interface CourseProps {
	id: string;
	title: string;
}

class Course implements CourseProps {
	id: string;
	title: string;

	constructor({ id, title }: CourseProps) {
		this.id = id;
		this.title = title;
	}
}

export default Course;
