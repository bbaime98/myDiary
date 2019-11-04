import AllEntry from '../data/data';
import Response from '../helpers/Response';

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const validateParams = (req, res, next) => {
  if (isNaN(req.params.id)) { return Response.errorResponse(res, 400, 'Please enter a  valid entry Id'); }
  const entry = AllEntry.entries.find((en) => en.entryID === parseInt(req.params.id, 10));
  if (!entry) { return Response.errorResponse(res, 404, 'No Entry found'); }
  if (req.payload.id !== entry.userId) { return Response.errorResponse(res, 404, 'Entry not found, you did not create that entry'); }

  req.entry = entry;
  return next();
};
export default validateParams;
