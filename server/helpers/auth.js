import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const auth = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.payload = decoded;

    return next();
  } catch (ex) {
    return res.status(401).json({
      status: 401,
      error: 'Invalid token'
    });
  }
};


export default auth;
