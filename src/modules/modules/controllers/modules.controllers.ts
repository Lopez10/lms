import { Request, Response } from 'express';
import { sendMethodNotImplemented } from '../../../shared/responses.utils';
import { ModuleDto } from '../application/module.mapper';
import { LessonDto } from '../../lessons/application/lesson.mapper';
import { CompletionPrismaRepository } from '../../completions/infrastructure/completion.prisma.repository';

export interface ModuleResponsePopulatedDTO extends ModuleDto {
	lessons: LessonDto[];
	modules: ModuleResponsePopulatedDTO[];
}

const completionRepository = new CompletionPrismaRepository();

export const MODULE_DEPENDENCIES = {
	completionRepository,
};

export const createModule = async (req: Request, res: Response) => {
	return sendMethodNotImplemented(res);
};

export const getModuleById = async (req: Request, res: Response) => {
	return sendMethodNotImplemented(res);
};

export const getModules = async (req: Request, res: Response) => {
	return sendMethodNotImplemented(res);
};
