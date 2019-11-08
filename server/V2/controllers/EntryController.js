
import uuid from 'uuid';
import db from '../database/dbConfig';
import Response from '../helpers/Response';
import queries from '../database/querries';

export default class Entry {
  /**
   * @description handles entry creation
   *
   * @param {object} req
   * @param {object } res
   * @return {object} entry object
   */
  static async createEntry(req, res) {
    const { title, description } = req.body;
    const { id: userId } = req.payload;
    const titleSearchValue = [title, userId];
    const createdOn = new Date();
    const dateFormat = `${createdOn.getDate()}-${createdOn.getMonth() + 1}-${createdOn.getFullYear()} ${createdOn.getHours()}:${createdOn.getMinutes()}:${createdOn.getSeconds()}`;
    const entryValues = [uuid.v1(), title, description, userId, dateFormat];
    try {
      const existTitle = await db.pool.query(queries.searchTitle, titleSearchValue);
      if (existTitle.rows[0]) {
        return Response.errorResponse(res, 400, 'Title already exist');
      }
      const dbData = await db.pool.query(queries.entryCreation, entryValues);
      return Response.successResponse(res, 201, 'Entry successfully created', dbData.rows[0]);
    } catch (err) {
      return Response.errorResponse(res, 500, `${err.message}`);
    }
  }

  /**
 *@description handles retrieve all entries
 *
 * @param {object} req
 * @param {object} res
 * @return [array] All entries
 */

  static async getAll(req, res) {
    const { id: userId } = req.payload;

    const entryOwnerId = [userId];
    try {
      const dbData = await db.pool.query(queries.fetchEntries, entryOwnerId);
      if (!dbData.rows[0]) {
        return Response.successResponse(res, 200, 'Create an entry first, no entry found at the moment', dbData.rows);
      }
      return Response.successResponse(res, 200, 'All Entries', dbData.rows);
    } catch (err) {
      return Response.errorResponse(res, 500, `${err.message}`);
    }
  }

  /**
 *
 * @description handles view a specific entry
 *
 * @param {object} res
 * @param {object} req
 * @return {object} specific entry
 */
  static async specifiEntry(req, res) {
    return Response.successResponse(res, 200, 'Specific entry', req.fetchedEntry);
  }

  /**
 *
 * @description handles delete entry
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} deleted entry details
 *
 */
  static async deleteEntry(req, res) {
    const { userid, entryid } = req.fetchedEntry;
    const deleteEntryValues = [userid, entryid];
    try {
      await db.pool.query(queries.deleteEntry, deleteEntryValues);

      return Response.successResponse(res, 200, 'Entry successfully deleted');
    } catch (err) {
      return Response.errorResponse(res, 500, `${err.message}`);
    }
  }

  static async modifyEntry(req, res) {
    const { userid, entryid } = req.fetchedEntry;
    const { title, description } = req.body;
    const editedOn = new Date();
    const dateFormat = `${editedOn.getDate()}-${editedOn.getMonth() + 1}-${editedOn.getFullYear()} ${editedOn.getHours()}:${editedOn.getMinutes()}:${editedOn.getSeconds()}`;
    const updateValues = [title, description, userid, entryid, dateFormat];

    try {
      const dbData = await db.pool.query(queries.updateEntry, updateValues);
      return Response.successResponse(res, 200, 'Entry successfully edited', dbData.rows[0]);
    } catch (err) {
      return Response.errorResponse(res, 500, `${err.message}`);
    }
  }
}
