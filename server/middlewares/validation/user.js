
import Joi from 'joi';

class User {
  static createUser(req, res, next) {
    const userSchema = Joi.object().keys({
      email: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.required(),
    });
    const { error } = Joi.validate({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    }, userSchema, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        status: 400,
        error: 'emai,firstName,lastName and password is required',
      });
    }
    next();
  }

  static userlogin(req, res, next) {
    const loginSchema = Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.required(),
    });
    const { error } = Joi.validate({
      email: req.body.email,
      password: req.body.password,
    }, loginSchema, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        status: 400,
        error: 'email and password is required',
      });
    }
    next();
  }
}
export default User;
