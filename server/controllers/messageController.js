
import messages from '../models/messages';

class messageController {
  static createMessage(req, res) {
    const newId = parseInt(messages.length) + 1;
    const newMessage = {
      id: newId,
      createdOn: new Date(),
      subject: req.body.subject,
      message: req.body.message,
      parentMessageId: req.body.parentMessageId,
      senderId: req.body.senderId,
      recieverId: req.body.recieverId,
      status: req.body.status,
    };
    messages.push(newMessage);
    return res.status(200).json({
      status: 200,
      message: 'new message is created successfully',
      data: newMessage,
    });
  }

  static receivedEmails(req, res) {
    res.status(200).json({
      status: 200,
      message: 'list of all recieved messages',
      data: messages,
    });
  }

  static specificMessage(req, res) {
    const { senderId } = req.params;
    const email = messages.find(email => email.id === Number(req.params.id, 10));
    if (email) {
      res.status(200).json({
        status: 200,
        message: 'message fetched successfully',
        data: email,
      });
    } else if (!email) {
      res.status(204).json({
        status: 204,
        message: 'no content',
      });
    }
  }


  static myMessages(req, res) {
    const myMessage = [];
    messages.forEach((message) => {
      if (message.status === req.params.status) {
        myMessage.push(message);
      }
    });
    return res.status(200).json({
      status: 200,
      message: 'message fetched successfully',
      data: myMessage,
    });
  }

  static deleteMessage(req, res) {
    const { id } = Number(req.params);
    messages.forEach((message, index) => {
      if (message.id === id) {
        messages.splice(index, 1);
      }
    });
    res.status(200).json({
      status: 200,
      message: 'message deleted successfully',
    });
  }
}
export default messageController;
