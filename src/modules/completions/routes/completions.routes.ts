import { Router } from 'express';
import { createCompletion } from '../controllers/create-completion.controller';

const router = Router();

router.route('/').post(createCompletion);

export default router;
