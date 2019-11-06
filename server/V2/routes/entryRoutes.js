import express from 'express';
import entryValidator from '../middleware/entryValidator';
import EntryController from '../controllers/EntryController';
import auth from '../helpers/auth';
import searchEntry from '../middleware/searchEntry';

const route = express.Router();

route.post('/entries', auth, entryValidator, EntryController.createEntry);
route.get('/entries', auth, EntryController.getAll);
route.get('/entries/:id', auth, searchEntry, EntryController.specifiEntry);
route.delete('/entries/:id', auth, searchEntry, EntryController.deleteEntry);
export default route;
