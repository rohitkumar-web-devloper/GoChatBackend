/* eslint-disable no-undef */
const { createRouter } = require('../../Routes/createRoutes')
const { wrapRequestHandler, success, error } = require('../../helper/response')
const { Messages } = require('../../Schemas')
const handler = async (req, res) => {
    try {
        const { sender, receiver, message, time } = req.body
        const exist = await Messages.findOne({ sender, receiver })
        if (exist) {
            const updatedMessages = [...exist.messages, { sender: +sender, receiver: +receiver, message, time }];
            const updateResult = await Messages.updateOne({ sender, receiver }, { messages: updatedMessages });
            if (updateResult.modifiedCount > 0) {
                console.log('Document updated',);
            } else {
                console.log('No document was modified.');
            }
        } else {
            const newMessage = new Messages({ sender, receiver, messages: [{ sender: +sender, receiver: +receiver, message: message, time: time }] });
            await newMessage.save();
        }
        res.json(success("success"))
    } catch (err) {
        res.status(400).json(error(err))
    }
}
createRouter.post('/messages', wrapRequestHandler(handler))
