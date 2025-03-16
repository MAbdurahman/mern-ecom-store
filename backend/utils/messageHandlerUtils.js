
export const messageHandler = (res,  message = '', success = true, statusCode = 200, data = {},) =>
   res.status(statusCode).json({ message, success, data });