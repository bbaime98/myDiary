
import db from '../database/dbConfig';
import Response from '../helpers/Response';


export default class Entry {
  static async createEntry(req, res) {
    const { title, description } = req.body;
    const { id: userId } = req.payload;

    const entryCreation = ` 
        INSERT INTO entries( title, description, userId)
        VALUES($1, $2, $3)  
        returning entryId,title, description, createdOn
        `;
    const entryValues = [title, description, userId];
    try {
      const dbData = await db.pool.query(entryCreation, entryValues);
      return Response.successResponse(res, 201, 'Entry successfully created', dbData.rows[0]);
    } catch (err) {
      return Response.errorResponse(res, 500, `${err.message}`);
    }
  }

  static async getAll(req, res) {
    const { id: userId } = req.payload;

    const entryOwnerId = [userId];

    const fetchEntries = `
    SELECT * FROM entries WHERE userid = $1 ORDER BY createdon DESC `;

    try {
      const dbData = await db.pool.query(fetchEntries, entryOwnerId);
      if (!dbData.rows[0]) {
        return Response.errorResponse(res, 404, 'No Entry Found');
      }
      return Response.successResponse(res, 200, 'All Entries', dbData.rows);
    } catch (err) {
      return Response.errorResponse(res, 500, `${err.message}`);
    }
  }
}