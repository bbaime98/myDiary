import express from 'express';
import signup from '../middleware/signupValidator';
import signin from '../middleware/signinValidator';
import UserControllers from '../controllers/UsersController';
import auth from '../helpers/auth';
import entryValidator from '../middleware/entryValidator';
import EntryController from '../controllers/EntryController';

const route = express.Router();

route.post('/auth/signup', signup, UserControllers.signup);
route.post('/auth/signin', signin, UserControllers.signin);
route.post('/entries', auth, entryValidator, EntryController.create);
export default route;
