import { UserPrismaRepository } from '../infrastructure/user.prisma.repository';

const userPrismaRepository = new UserPrismaRepository();

export const USER_DEPENDENCIES = {
	userPrismaRepository,
};
