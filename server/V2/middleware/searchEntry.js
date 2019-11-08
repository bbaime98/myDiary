import Joi from 'joi';
import db from '../database/dbConfig';
import Response from '../helpers/Response';
import queries from '../database/querries';

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns (function) next
 */
const searchEntry = async (req, res, next) => {
  const validateParams = Joi.validate(`${req.params.id}`, Joi.string().guid());
  if (validateParams.error) {
    return Response.errorResponse(res, 400, 'Please enter a valid entry');
  }
  const { id: userId } = req.payload;
  const values = [userId, req.params.id];

  try {
    const dbData = await db.pool.query(queries.searchEntryInDb, values);
    if (!dbData.rows[0]) {
      return Response.errorResponse(res, 404, 'No Entry Found');
    }
    const foundEntry = dbData.rows[0];
    req.fetchedEntry = foundEntry;
  } catch (err) {
    return Response.errorResponse(res, 500, `${err.message}`);
  }

  return next();
};
export default searchEntry;
