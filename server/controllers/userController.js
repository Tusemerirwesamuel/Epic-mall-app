
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../models/user';

dotenv.config();
class userController {
  static signUp(req, res) {
    const userResult = users.find(user => req.body.email === user.email);
    if (userResult) {
      res.status(400).json({
        status: 400,
        error: 'user with this email is already exist',
      });
    } else {
      const password = bcrypt.hashSync(req.body.password, 10);
      const newId = parseInt(users.length) + 1;
      const newUser = {
        id: newId,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password,
      };
      users.push(newUser);
      const token = jwt.sign({ newUser }, process.env.SECRET_KEY);
      res.json({
        status: 201,
        data: [{
          token,
        }],
      });
    }
  }

  static login(req, res) {
    const { email, password } = req.body;
    const user = users.find(element => (email === element.email));
    try {
      const truePass = bcrypt.compareSync(password, user.password);
      if (truePass) {
        const token = jwt.sign({ user }, process.env.SECRET_KEY);
        res.status(200).json({
          status: 200,
          data: [{
            token,
          }],
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      res.status(400).json({
        status: 400,
        error: 'incorect email and password',
      });
    }
  }
}

export default userController;
