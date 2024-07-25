import { Id } from '../../../shared';
import { Completion } from '../domain/completion.entity';

export interface CompletionDto {
	id: string;
	lesson_id: string;
	user_id: string;
}

export class CompletionMapper {
	static toDomain(completionDto: CompletionDto): Completion {
		return Completion.create(
			{
				userId: Id.createExisted(completionDto.user_id),
				lessonId: Id.createExisted(completionDto.lesson_id),
			},
			Id.createExisted(completionDto.id),
		);
	}

	static toDto(completion: Completion): CompletionDto {
		return {
			id: completion.id.value,
			lesson_id: completion.props.lessonId.value,
			user_id: completion.props.userId.value,
		};
	}
}
