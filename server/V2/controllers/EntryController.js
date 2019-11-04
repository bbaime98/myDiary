
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
}
