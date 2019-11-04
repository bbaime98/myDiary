import bcrypt from 'bcrypt';
import allUsers from '../data/data';
import provideToken from '../helpers/provideToken';
import Response from '../helpers/Response';

export default class USers {
  /**
   * @description  creates an account
   *
   * @param {object} req
   * @param {object} res
   */
  static signup(req, res) {
    const user = allUsers.users.find((userof) => userof.email === req.body.email);
    if (user) { return Response.errorResponse(res, 409, 'Email already exists'); }
    const newUser = {
      id: allUsers.users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    const token = provideToken(newUser.id, newUser.email);

    allUsers.users.push(newUser);
    const data = {
      token,
      id: newUser.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    return Response.successResponse(res, 201, 'User created successfully', data);
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   */
  static signin(req, res) {
    const user = allUsers.users.find((userof) => userof.email === req.body.email);

    if (user) {
      const password = bcrypt.compareSync(req.body.password, user.password);

      if (password) {
        const token = provideToken(user.id, user.email);
        const data = {
          token,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
        return Response.successResponse(res, 200, 'User is successfully logged in', data);
      }
    }
    return Response.errorResponse(res, 401, 'Invalid email or password');
  }
}
