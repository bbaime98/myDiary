import AllEntry from '../data/data';
import Response from '../helpers/Response';

export default class Entry {
  /**
   * @description handles the creation of an entry
   *
   * @param {object} req
   * @param {object} res
   */
  static create(req, res) {
    const userId = req.payload.id;
    const newEntry = {
      entryID: AllEntry.entries.length + 1,
      title: req.body.title,
      description: req.body.description,
      userId
    };
    newEntry.createdOn = new Date();
    AllEntry.entries.push(newEntry);
    const data = {
      createdOn: newEntry.createdOn,
      entryID: newEntry.entryID,
      title: newEntry.title,
      description: newEntry.description
    };
    return Response.successResponse(res, 201, 'Entry successfully created', data);
  }

  /**
 * @description retrieves all entries that were created
 *
 * @param {object} req
 * @param {object} res
 */
  static getAll(req, res) {
    const owner = AllEntry.entries.filter((userof) => userof.userId === req.payload.id);

    if (owner.length === 0) {
      return Response.errorResponse(res, 404, 'No Entry Found');
    }
    const sortedEntries = owner.sort((a, b) => b.createdOn - a.createdOn);
    return Response.successResponse(res, 200, 'All Entries', sortedEntries);
  }

  /**
   * @description handles view specific entry
   * @param {object} req
   * @param {object} res
   * */
  static specifiEntry(req, res) {
    const data = { ...req.entry };
    return Response.successResponse(res, 200, 'Specific Entry', data);
  }

  /**
 * @description handles entry modification
 *
 * @param {object} req
 * @param {object} res
 */
  static modifyEntry(req, res) {
    const indexOfEntry = AllEntry.entries.indexOf(req.entry);
    const newEntry = {
      entryID: req.entry.entryID,
      title: req.body.title,
      description: req.body.description,
      userId: req.payload.id,
      createdOn: req.entry.createdOn,
    };
    newEntry.editedOn = new Date();

    AllEntry.entries.splice(indexOfEntry, 1, newEntry);
    const data = {
      editedOn: newEntry.editedOn,
      createdOn: req.entry.createdOn,
      entryID: newEntry.entryID,
      title: newEntry.title,
      description: newEntry.description
    };
    return Response.successResponse(res, 200, 'Entry successfully edited', data);
  }

  /**
 * @description handles delete an entry
 *
 * @param {object} req
 * @param {object} res
 */

  static deleteEntry(req, res) {
    const index = AllEntry.entries.indexOf(req.entry, 0);
    AllEntry.entries.splice(index, 1);
    const data = { ...req.entry };
    return Response.successResponse(res, 200, 'Entry successfully deleted', data);
  }
}
