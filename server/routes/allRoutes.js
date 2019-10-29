import express from 'express';
import signup from '../middleware/signupValidator';
import signin from '../middleware/signinValidator';
import UserControllers from '../controllers/UsersController';


const route = express.Router();

route.post('/auth/signup', signup, UserControllers.signup);
route.post('/auth/signin', signin, UserControllers.signin);
export default route;
