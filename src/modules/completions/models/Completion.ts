export interface CompletionProps {
	id: string;
	userId: string;
	lessonId: string;
}

export class Completion implements CompletionProps {
	id: string;
	userId: string;
	lessonId: string;

	constructor(completion: CompletionProps) {
		this.id = completion.id;
		this.userId = completion.userId;
		this.lessonId = completion.lessonId;
	}
}
