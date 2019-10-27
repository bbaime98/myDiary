import express from 'express';
import signup from '../middleware/signupValidator';
import UserControllers from '../controllers/UsersController';
import signin from '../middleware/signinValidator';

const route = express.Router();

route.post('/auth/signup', signup, UserControllers.signup);
route.post('/auth/signin', signin, UserControllers.signin);
export default route;
