
import db from '../database/dbConfig';
import Response from '../helpers/Response';


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
    const entryValues = [title, description, userId];
    const searchTitle = `
    SELECT * FROM entries WHERE title = $1 AND userid = $2 `;
    const entryCreation = ` 
        INSERT INTO entries( title, description, userId)
        VALUES($1, $2, $3)  
        returning entryId,title, description, createdOn
        `;

    try {
      const existTitle = await db.pool.query(searchTitle, titleSearchValue);
      if (existTitle.rows[0]) {
        return Response.errorResponse(res, 400, 'Title already exist');
      }
      const dbData = await db.pool.query(entryCreation, entryValues);
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

    const fetchEntries = `
    SELECT * FROM entries WHERE userid = $1 ORDER BY createdon DESC `;

    try {
      const dbData = await db.pool.query(fetchEntries, entryOwnerId);
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
}
