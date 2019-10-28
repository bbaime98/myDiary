import express from 'express';
import signup from '../middleware/signupValidator';
import UserControllers from '../controllers/UsersController';


const route = express.Router();

route.post('/auth/signup', signup, UserControllers.signup);
export default route;
