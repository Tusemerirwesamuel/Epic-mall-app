
import express from 'express';

import userController from '../controllers/userController';
import messageController from '../controllers/messageController';
import User from '../middlewares/validation/user';
import Message from '../middlewares/validation/message';

const { login, signUp } = userController;
const {
  createMessage, receivedEmails, specificMessage, myMessages, deleteMessage,
} = messageController;
// USER VALIDATION

const { createUser, userlogin } = User;
// MESSAGE VALIDATION
const { isEmpty, postMessage } = Message;
const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    message: 'welcome to Epic mail',
  });
});
// user routes
router.post('/api/v1/auth/signup', createUser, signUp);
router.post('/api/v1/auth/login', userlogin, login);
// message routes
router.get('/api/v1/messages', isEmpty, receivedEmails);
router.get('/api/v1/messages/:id', specificMessage);
router.post('/api/v1/messages', postMessage, createMessage);
router.get('/api/v1/messages/:status/messages', myMessages);
router.delete('/api/v1/messages/:id', deleteMessage);
export default router;
