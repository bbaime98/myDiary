import jwt from 'jsonwebtoken';

/**
 *@description creates token
 *
 * @param {number} userId
 * @param {string} userEmail
 */
const provideToken = (userId, userEmail) => {
  const token = jwt.sign({
    id: userId,
    email: userEmail
  }, process.env.JWTPRIVATEKEY, { expiresIn: '1h' });
  return token;
};
export default provideToken;
