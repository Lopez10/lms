import { server } from '../..';
import { prisma } from '../../shared';

afterAll(async () => {
	await prisma.lesson.deleteMany();
	await prisma.module.deleteMany();
	await prisma.course.deleteMany();
	await prisma.user.deleteMany();
	await prisma.completion.deleteMany();

	await prisma.$disconnect();
	server.close();
});
