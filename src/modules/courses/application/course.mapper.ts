import { Id } from '../../../shared';
import { Course } from '../domain/course.entity';
import { StatisticsDto } from './get-statistics.service';

export interface CourseDto {
	id: string;
	title: string;
}

interface CourseWithStatisticsDto {
	id: string;
	title: string;
	statistics: StatisticsDto;
}

export class CourseMapper {
	static toDto(course: Course): CourseDto {
		return {
			id: course.id.value,
			title: course.props.title,
		};
	}

	static toDomain(courseDto: CourseDto): Course {
		const course = Course.create(
			{
				title: courseDto.title,
			},
			Id.createExisted(courseDto.id),
		);
		return course;
	}

	static toDtoWithStatistics(
		course: Course,
		statistics: StatisticsDto,
	): CourseWithStatisticsDto {
		return {
			id: course.id.value,
			title: course.props.title,
			statistics,
		};
	}
}
