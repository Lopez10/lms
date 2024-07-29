import { Router } from 'express';
import { createModule } from '../controllers/create-module.controller';
import { getModuleById } from '../controllers/get-module-by-id.controller';
import { getModules } from '../controllers/get-modules.controller';
import { updateModuleRoot } from '../controllers/update-module-root.controller';

const router = Router();

router.route('/').get(getModules).post(createModule).put(updateModuleRoot);

router.route('/moduleId/:moduleId').get(getModuleById);

export default router;
