import Joi from 'joi';
import Response from '../helpers/Response';

const signup = (req, res, next) => {
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return Response.errorResponse(res, 400, `${error.details[0].message}`);
  }
  next();
};

export default signup;
