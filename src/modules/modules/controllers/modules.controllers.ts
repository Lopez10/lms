import { Request, Response } from 'express';
import { sendMethodNotImplemented } from '../../../shared/responses.utils';
import { ModuleDto } from '../application/module.mapper';
import { LessonDto } from '../../lessons/application/lesson.mapper';

export interface ModuleResponsePopulatedDTO extends ModuleDto {
	lessons: LessonDto[];
	modules: ModuleResponsePopulatedDTO[];
}

export const createModule = async (req: Request, res: Response) => {
	return sendMethodNotImplemented(res);
};

export const getModuleById = async (req: Request, res: Response) => {
	return sendMethodNotImplemented(res);
};

export const getModules = async (req: Request, res: Response) => {
	return sendMethodNotImplemented(res);
};
