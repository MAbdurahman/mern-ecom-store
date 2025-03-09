
export const messageHandler = (res, data = {}, message = '', success = true, statusCode = 200) =>
   res.status(statusCode).send({data, message, success });