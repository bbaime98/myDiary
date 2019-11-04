import bcrypt from 'bcrypt';
import db from '../database/dbConfig';
import provideToken from '../helpers/provideToken';
import Response from '../helpers/Response';

export default class Users {
  static async signup(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;
    const userValues = [firstName, lastName, email, bcrypt.hashSync(password, 10)];


    const query = `
        INSERT INTO users(firstName, lastName, email, password)
        VALUES($1, $2, $3, $4)
        returning id, firstName, lastName, email `;

    try {
      const dbData = await db.pool.query(query, userValues);
      const token = provideToken(dbData.rows[0].id, dbData.rows[0].email);
      const data = {
        token, id: dbData.rows[0].id, firstName, lastName, email
      };
      return Response.successResponse(res, 201, 'User created successfully', data);
    } catch (err) {
      return Response.errorResponse(res, 409, 'Email already exists');
    }
  }

  static async signin(req, res) {
    const { email, password } = req.body;

    const getUser = `SELECT * FROM users WHERE email = '${email}' `;

    try {
      const dbData = await db.pool.query(getUser);
      if (!dbData.rows[0]) {
        return Response.errorResponse(res, 401, 'Invalid email or password');
      }
      const {
        password: dbPassword, firstname, lastname, email, id
      } = dbData.rows[0];
      const comparePassword = bcrypt.compareSync(password, dbPassword);

      if (comparePassword) {
        const token = provideToken(dbData.rows[0].id, dbData.rows[0].email);
        const data = {
          token, firstname, lastname, email, id
        };
        return Response.successResponse(res, 200, 'User is successfully logged in', data);
      }
      return Response.errorResponse(res, 401, 'Invalid email or password');
    } catch (err) {
      return Response.errorResponse(res, 500, `${err.message}`);
    }
  }
}
