import AllEntry from '../data/data';

const validateParams = (req, res, next) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({
      status: 400,
      error: 'Please enter a  valid entry Id'
    });
  }
  const entry = AllEntry.entries.find((en) => en.entryID === parseInt(req.params.id, 10));
  if (!entry) {
    return res.status(404).json({
      status: 404,
      error: 'No Entry found'
    });
  }
  if (req.payload.id !== entry.userId) {
    return res.status(403).json({
      status: 403,
      error: 'Entry not found, you did not create that entry'
    });
  }
  req.entry = entry;
  return next();
};
export default validateParams;
