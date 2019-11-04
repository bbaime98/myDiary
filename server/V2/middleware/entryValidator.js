import Joi from 'joi';
import Response from '../helpers/Response';

const entry = (req, res, next) => {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return Response.errorResponse(res, 400, `${error.details[0].message}`);
  }
  next();
};

export default entry;
