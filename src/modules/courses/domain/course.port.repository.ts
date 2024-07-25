import { Id } from '../../../shared';
import { Course } from './course.entity';

export interface CoursePortRepository {
	insert(course: Course): Promise<void>;
	getById(id: Id): Promise<Course | null>;
	getAll(): Promise<Course[]>;
}
