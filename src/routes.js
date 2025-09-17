
import { Router } from 'express';

import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';

const routes = Router();

routes.use(homeController);
routes.use('/movies', movieController);

// Add not found page
routes.get('/*splat', (req, res) => {
    res.render('404');
});

export default routes;
