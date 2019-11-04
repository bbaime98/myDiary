import express from 'express';
import entryValidator from '../middleware/entryValidator';
import EntryController from '../controllers/EntryController';
import auth from '../helpers/auth';

const route = express.Router();

route.post('/entries', auth, entryValidator, EntryController.createEntry);

export default route;
