import { Entity } from "../../../shared/domain/entity.base";
import { Id } from "../../../shared/domain/id.value-object";

export interface LessonProps {
	moduleId: string;
	title: string;
}

export class Lesson extends Entity<LessonProps> {
	private constructor(props: LessonProps, id?: Id) {
		super(props, id);
	}

	static create(props: LessonProps, id?: Id): Lesson {
		const lesson = new Lesson(props, id);
		return lesson;
	}
}
