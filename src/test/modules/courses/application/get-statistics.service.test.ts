import {
	GetStatisticsService,
	StatisticsDto,
} from '../../../../modules/courses/application/get-statistics.service';
import { CourseService } from '../../../../modules/courses/domain/course.service';
import { Id } from '../../../../shared';
import { CompletionInMemoryRepository } from '../../completions/infrastructure/completion.in-memory';
import { LessonInMemoryRepository } from '../../lessons/infrastructure/lesson.in-memory.repository';
import { createCourseModuleExample } from '../create-course-module-example';

describe('get statistics service', () => {
	it(`
        GIVEN there is a course with a single module and a single lesson and no completions
        WHEN the service is called to get the statistics of the course
        THEN I receive the statistics of the course
    `, async () => {
		const completionRepository = new CompletionInMemoryRepository();
		const lessonRepository = new LessonInMemoryRepository();
		const courseService = new CourseService(
			completionRepository,
			lessonRepository,
		);
		const courseId = 'courseId123';
		const getStatisticsService = new GetStatisticsService(courseService);

		// GIVEN
		createCourseModuleExample(courseId, completionRepository, lessonRepository);

		// WHEN
		const statistics = await getStatisticsService.run(
			Id.createExisted(courseId),
		);

		// THEN
		const expectedStatistics: StatisticsDto = {
			totalLessons: 1,
			completedLessons: 0,
			percentage: 0,
		};

		expect(statistics).toBeDefined();
		expect(statistics).toEqual(expectedStatistics);
	});
});
