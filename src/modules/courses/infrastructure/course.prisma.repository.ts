import { Id, InsertException } from '../../../shared';
import { Course } from '../models/Course';
import { CoursePortRepository } from '../models/course.port.repository';
import { prisma } from '../../../shared';

export class CoursePrismaRepository implements CoursePortRepository {
	async getById(id: Id): Promise<Course | null> {
		throw new Error('Method not implemented.');
	}
	async getAll(): Promise<Course[]> {
		throw new Error('Method not implemented.');
	}
	async insert(course: Course): Promise<void> {
		const data = {
			title: course.props.title,
		};

		try {
			await prisma.course.create({ data });
		} catch (error) {
			throw new InsertException('Error inserting course');
		}
	}
}
