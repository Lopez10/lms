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

async function cleanDatabase() {
	await prisma.lesson.deleteMany();
	await prisma.module.deleteMany();
	await prisma.course.deleteMany();
	await prisma.user.deleteMany();
	await prisma.completion.deleteMany();
}
