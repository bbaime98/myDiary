import Joi from 'joi';
import Response from '../helpers/Response';

const entry = (req, res, next) => {
  const schema = {
    title: Joi.string().trim().min(10).required(),
    description: Joi.string().trim().min(50).required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error && error.details[0].type === 'any.required') {
    return Response.errorResponse(res, 400, error.details[0].message.replace(/[/"]/g, ''));
  } if (error && error.details[0].type === 'any.empty') {
    return Response.errorResponse(res, 400, error.details[0].message.replace(/[/"]/g, ''));
  } if (error && error.details[0].type === 'string.min') {
    return Response.errorResponse(res, 400, error.details[0].message.replace(/[/"]/g, ''));
  }
  next();
};

export default entry;
