import { Router } from 'express';
import SignUp from './controller/SignUp/SignUp';
import Signin from './controller/SignIn/Signin';

const routes = Router();

routes.get('/', (request, response) => response.json());
routes.post('/signup', SignUp.store );
routes.post('/signin', Signin.authenticate );
export { routes };
