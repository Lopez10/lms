import { Entity } from '../../../shared/domain/entity.base';
import { Id } from '../../../shared/domain/id.value-object';

export interface CompletionProps {
	userId: Id;
	lessonId: Id;
}

export class Completion extends Entity<CompletionProps> {
	private constructor(props: CompletionProps, id?: Id) {
		super(props, id);
	}

	static create(props: CompletionProps, id?: Id): Completion {
		const lesson = new Completion(props, id);
		return lesson;
	}
}
