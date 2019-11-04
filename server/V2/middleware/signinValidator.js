import Joi from 'joi';
import Response from '../helpers/Response';

const signin = (req, res, next) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return Response.errorResponse(res, 400, `${error.details[0].message}`);
  }
  next();
};

export default signin;
