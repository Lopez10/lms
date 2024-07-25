import { CompletionPrismaRepository } from '../../completions/infrastructure/completion.prisma.repository';

const completionRepository = new CompletionPrismaRepository();

export const MODULE_DEPENDENCIES = {
	completionRepository,
};
