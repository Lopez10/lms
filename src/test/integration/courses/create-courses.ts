import request from 'supertest';
import apiService from '../../..';

export function createCourse(course: { title: string }) {
	return request(apiService).post('/courses').send(course);
}
