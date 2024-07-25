import { Entity } from '../../../shared/domain/entity.base';
import { Id } from '../../../shared/domain/id.value-object';

export interface CourseProps {
	title: string;
}

export interface CoursePrimitives {
	title: string;
}

export class Course extends Entity<CourseProps> {
	private constructor(props: CourseProps, id?: Id) {
		super(props, id);
	}

	static create(props: CourseProps, id?: Id): Course {
		const lesson = new Course(props, id);
		return lesson;
	}

	static createByPrimitives(primitives: CoursePrimitives, id?: string): Course {
		return Course.create(
			{
				title: primitives.title,
			},
			id ? Id.createExisted(id) : Id.generateId(),
		);
	}
}
