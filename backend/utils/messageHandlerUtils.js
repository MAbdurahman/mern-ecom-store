
export const messageHandler = (res,  message = '', success = true, statusCode = 200, data = {},) =>
   res.status(statusCode).json({data, message, success });