import { ModulePrismaRepository } from '../infrastructure/module.prisma.repository';

const modulePrismaRepository = new ModulePrismaRepository();

export const MODULE_DEPENDENCIES = {
	modulePrismaRepository,
};
