import express from 'express';
import signup from '../middleware/signupValidator';
import signin from '../middleware/signinValidator';
import UserControllers from '../controllers/UsersController';
import auth from '../helpers/auth';
import entryValidator from '../middleware/entryValidator';
import EntryController from '../controllers/EntryController';
import paramsValidator from '../middleware/paramsValidator';

const route = express.Router();

route.post('/auth/signup', signup, UserControllers.signup);
route.post('/auth/signin', signin, UserControllers.signin);
route.post('/entries', auth, entryValidator, EntryController.create);
route.get('/entries', auth, EntryController.getAll);
route.get('/entries/:id', auth, paramsValidator, EntryController.specifiEntry);
export default route;
