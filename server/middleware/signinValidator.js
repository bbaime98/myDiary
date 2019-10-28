import Joi from 'joi';

const signin = (req, res, next) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message
    });
  }
  return next();
};

export default signin;
