import Joi from 'joi';
import Response from '../helpers/Response';

const signup = (req, res, next) => {
  const schema = {
    firstName: Joi.string().min(4).max(15).required(),
    lastName: Joi.string().min(4).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9!@#$%^&*]{6,20}$/).required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return Response.errorResponse(res, 400, `${error.details[0].message}`);
  }
  next();
};

export default signup;
