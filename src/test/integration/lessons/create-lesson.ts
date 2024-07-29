import request from 'supertest';
import { server } from '../../..';
import { LessonPrimitives } from '../../../modules/lessons/domain/lesson.entity';

export function createLesson(lessonDto: LessonPrimitives) {
	return request(server).post('/lessons').send(lessonDto);
}
