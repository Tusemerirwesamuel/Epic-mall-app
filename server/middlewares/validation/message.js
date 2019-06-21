/* eslint-disable consistent-return */
import Joi from 'joi';
import messages from '../../models/messages';


class Message {
  static postMessage(req, res, next) {
    const msgSchema = Joi.object().keys({
      subject: Joi.string().required(),
      message: Joi.string().required(),
      parentMessageId: Joi.number().integer().required(),
      senderId: Joi.number().integer().required(),
      recieverId: Joi.number().integer().required(),
      status: Joi.required(),
    });
    const { error } = Joi.validate({
      subject: req.body.subject,
      message: req.body.message,
      parentMessageId: req.body.parentMessageId,
      senderId: req.body.senderId,
      recieverId: req.body.recieverId,
      status: req.body.status,
    }, msgSchema, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        status: 400,
        error: 'subject and message is required',
      });
    }
    next();
  }

  static isEmpty(req, res, next) {
    if (messages.length === 0) {
      res.status(204).json({
        status: 204,
        error: 'no message found ',
      });
    } else next();
  }
}
export default Message;
