import Joi from 'joi';
import Response from '../helpers/Response';

const signup = (req, res, next) => {
  const schema = {
    firstName: Joi.string().trim().min(4).max(15)
      .required(),
    lastName: Joi.string().min(4).max(15).required(),
    email: Joi.string().trim().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{7,20}$/).required(),

  };
  const { error } = Joi.validate(req.body, schema);
  if (error && error.details[0].type === 'any.required') {
    return Response.errorResponse(res, 400, error.details[0].message.replace(/[/"]/g, ''));
  } if (error && error.details[0].type === 'string.email') {
    return Response.errorResponse(res, 400, error.details[0].message.replace(/[/"]/g, ''));
  } if (error && error.details[0].type === 'any.empty') {
    return Response.errorResponse(res, 400, error.details[0].message.replace(/[/"]/g, ''));
  } if (error && error.details[0].type === 'string.min') {
    return Response.errorResponse(res, 400, error.details[0].message.replace(/[/"]/g, ''));
  } if (error && error.details[0].type === 'string.regex.base') {
    return Response.errorResponse(res, 400, 'Enter a strong password of 7 chacters long with upperCase lowercase number and character and ');
  }
  next();
};

export default signup;
