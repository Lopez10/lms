import { Router } from 'express';
import { getCourses } from '../controllers/get-courses.controller';
import { createCourse } from '../controllers/create-course.controller';
import { getCourseById } from '../controllers/get-course-by-id.controller';

const router = Router();

router.route('/').get(getCourses).post(createCourse);

router.route('/:courseId').get(getCourseById);

export default router;
