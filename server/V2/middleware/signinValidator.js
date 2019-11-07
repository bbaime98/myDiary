import Joi from 'joi';
import Response from '../helpers/Response';

const signin = (req, res, next) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error && error.details[0].type === 'any.required') {
    return Response.errorResponse(res, 400, error.details[0].message.replace(/[/"]/g, ''));
  } if (error && error.details[0].type === 'string.email') {
    return Response.errorResponse(res, 400, error.details[0].message.replace(/[/"]/g, ''));
  } if (error && error.details[0].type === 'any.empty') {
    return Response.errorResponse(res, 400, error.details[0].message.replace(/[/"]/g, ''));
  }
  next();
};

export default signin;
