import { server } from '../..';
import { prisma } from '../../shared';

afterAll(async () => {
	await prisma.$disconnect();
	server.close();
});
