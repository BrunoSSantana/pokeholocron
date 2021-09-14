import { Router } from 'express';
import TrainerController from './controller/SignUp/SignUp';

const routes = Router();

routes.get('/', (request, response) => response.json());
routes.post('/signup', TrainerController.store )
export { routes };
