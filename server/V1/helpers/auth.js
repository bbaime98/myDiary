import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from './Response';

dotenv.config();
const auth = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return Response.errorResponse(res, 401, 'No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.payload = decoded;

    return next();
  } catch (ex) {
    return Response.errorResponse(res, 401, 'Invalid token');
  }
};


export default auth;
