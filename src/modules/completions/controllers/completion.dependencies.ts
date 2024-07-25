import { CompletionPrismaRepository } from '../infrastructure/completion.prisma.repository';

const completionPrismaRepository = new CompletionPrismaRepository();

export const COMPLETION_DEPENDENCIES = {
	completionPrismaRepository,
};
