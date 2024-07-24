import { Request, Response } from 'express';
import { sendMethodNotImplemented } from '../../../shared/responses.utils';
import { LessonResponseDTO } from '../../lessons/application/lesson.mapper';
import { ModuleResponseDTO } from '../application/module.mapper';

export interface ModuleResponsePopulatedDTO extends ModuleResponseDTO {
	lessons: LessonResponseDTO[];
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
