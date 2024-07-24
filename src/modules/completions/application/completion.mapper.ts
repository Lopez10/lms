import { Id } from '../../../shared';
import { Completion } from '../models/Completion';

export interface CompletionDto {
	id: string;
	userId: string;
	lessonId: string;
}

export class CompletionMapper {
	static toDomain(completionDto: CompletionDto): Completion {
		return Completion.create(
			{
				userId: Id.createExisted(completionDto.userId),
				lessonId: Id.createExisted(completionDto.lessonId),
			},
			Id.createExisted(completionDto.id),
		);
	}
}
