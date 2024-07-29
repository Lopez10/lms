import { server } from '../..';
import { prisma } from '../../shared';

afterAll(async () => {
	await cleanDatabase();

	await prisma.$disconnect();
	server.close();
});

beforeAll(async () => {
	await cleanDatabase();
});

export async function cleanDatabase() {
	await prisma.completion.deleteMany();
	await prisma.lesson.deleteMany();
	await prisma.user.deleteMany();
	await prisma.module.deleteMany();
	await prisma.course.deleteMany();
}
