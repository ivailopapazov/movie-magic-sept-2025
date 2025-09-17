
import { Router } from 'express';

import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';

const routes = Router();

routes.use(homeController);
routes.use(movieController);

export default routes;
