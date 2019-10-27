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

  static signin(req, res) {
    const user = allUsers.users.find((userof) => userof.email === req.body.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    }

    const password = bcrypt.compareSync(req.body.password, user.password);

    if (!password) {
      return res.status(403).json({
        status: 403,
        error: 'Invalid email or password'
      });
    }
    const token = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWTPRIVATEKEY);
    return res.status(200).json({
      status: 200,
      message: 'User is successfully logged in',
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  }
}
