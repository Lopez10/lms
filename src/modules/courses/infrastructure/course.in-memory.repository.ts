import { Id } from '../../../shared';
import { Course } from '../models/Course';
import { CoursePortRepository } from '../models/course.port.repository';

export class CourseInMemoryRepository implements CoursePortRepository {
	private readonly courses: Course[] = [];

	getById(id: Id): Promise<Course | null> {
		const course = this.courses.find((course) => course.id.equals(id));

		return Promise.resolve(course || null);
	}
	getAll(): Promise<Course[]> {
		return Promise.resolve(this.courses);
	}
	insert(course: Course): Promise<void> {
		this.courses.push(course);

		return Promise.resolve();
	}
}
