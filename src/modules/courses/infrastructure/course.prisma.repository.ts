import { Id } from '../../../shared';
import { Course } from '../models/Course';
import { CoursePortRepository } from '../models/course.port.repository';

export class CoursePrismaRepository implements CoursePortRepository {
	getById(id: Id): Promise<Course | null> {
		throw new Error('Method not implemented.');
	}
	getAll(): Promise<Course[]> {
		throw new Error('Method not implemented.');
	}
	async insert(course: Course): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
