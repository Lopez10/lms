import { Router } from 'express';
import {
	createCourse,
	getCourseById,
} from '../controllers/courses.controllers';
import { getCourses } from '../controllers/get-courses.controller';

const router = Router();

router.route('/').get(getCourses).post(createCourse);

router.route('/:courseId').get(getCourseById);

export default router;
