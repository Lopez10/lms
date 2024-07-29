import { Router } from 'express';
import { createLesson } from '../controllers/create-lesson.controller';
import { getLessonById } from '../controllers/get-lesson-by-id.controller';
import { getLessons } from '../controllers/get-lessons.controller';

const router = Router();

router.route('/').get(getLessons).post(createLesson);

router.route('/lessonId/:lessonId').get(getLessonById);

export default router;
