import { Id, InsertException } from '../../../shared';
import { Course } from '../domain/course.entity';
import { CoursePortRepository } from '../domain/course.port.repository';
import { prisma } from '../../../shared';

export class CoursePrismaRepository implements CoursePortRepository {
	async getById(id: Id): Promise<Course | null> {
		const courseDb = await prisma.course.findUnique({
			where: { id: id.value },
		});

		if (!courseDb) {
			return null;
		}

		return Course.create(
			{
				title: courseDb.title,
			},
			Id.createExisted(courseDb.id),
		);
	}

	async getAll(): Promise<Course[]> {
		const coursesDb = await prisma.course.findMany();

		return coursesDb.map((courseDb) =>
			Course.create(
				{
					title: courseDb.title,
				},
				Id.createExisted(courseDb.id),
			),
		);
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
