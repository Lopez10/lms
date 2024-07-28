import { CompletionInMemoryRepository } from '../../../modules/completions/infrastructure/completion.in-memory';
import { LessonInMemoryRepository } from '../lessons/infrastructure/lesson.in-memory.repository';
import { LessonMother } from '../lessons/lesson.mother';
import { ModuleMother } from '../modules/module.mother';

export function createCourseModuleExample(
	courseId: string,
	completionRepository: CompletionInMemoryRepository,
	lessonRepository: LessonInMemoryRepository,
) {
	const moduleExample = ModuleMother.create({
		courseId,
		id: 'moduleId123',
		moduleId: 'moduleId123',
		title: 'module title',
	});
	const lessonExample = LessonMother.create({
		id: 'lessonId123',
		moduleId: 'moduleId123',
		name: 'lesson name',
	});

	completionRepository.insertModule(moduleExample);
	lessonRepository.insertModule(moduleExample);

	completionRepository.insertLesson(lessonExample);
	lessonRepository.insert(lessonExample);
}
