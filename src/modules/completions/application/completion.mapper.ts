import { Id } from '../../../shared';
import { Completion } from '../domain/completion.entity';

export interface CompletionDto {
	id: string;
	lessonId: string;
	userId: string;
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

	static toDto(completion: Completion): CompletionDto {
		return {
			id: completion.id.value,
			lessonId: completion.props.lessonId.value,
			userId: completion.props.userId.value,
		};
	}
}
