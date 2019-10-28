import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import allUsers from '../data/data';

export default class USers {
  static signup(req, res) {
    const user = allUsers.users.find((userof) => userof.email === req.body.email);
    if (user) {
      return res.status(409).json({
        status: 409,
        error: 'Email already exists'
      });
    }
    const newUser = {
      id: allUsers.users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };

    const token = jwt.sign({
      id: newUser.id,

      email: newUser.email
    }, process.env.JWTPRIVATEKEY);
    allUsers.users.push(newUser);

    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
        token,
        id: newUser.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      }
    });
  }
}
