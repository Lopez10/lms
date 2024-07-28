import { Router } from 'express';
import { createModule } from '../controllers/create-module.controller';
import { getModuleById } from '../controllers/get-module-by-id.controller';
import { getModules } from '../controllers/get-modules.controller';

const router = Router();

router.route('/').get(getModules).post(createModule);

router.route('/:moduleId').get(getModuleById);

export default router;
