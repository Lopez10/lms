import { Router } from 'express';
import { createUser } from '../controllers/create-user.controller';
import { getUserById } from '../controllers/get-user-by-id.controller';

const router = Router();

router.route('/').post(createUser);

router.route('/:userId').get(getUserById);

export default router;
