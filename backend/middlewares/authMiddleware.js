import jwt from 'jsonwebtoken';
import {messageHandler} from '../utils/messageHandlerUtils.js';

export const authMiddleware = async (req, res, next) => {
   const token = req.cookies?.ecom_store;

   if (!token) {
      return messageHandler(res, 'Unauthorized access token!', false, 401);
   }

   try {
      req.user = await jwt.verify(token, process.env.JWT_SECRET);
      next();

   } catch (err) {
      console.log('authMiddleware Error: ', err.message);
      messageHandler(res, 'Forbidden access token', false, 403);
   }
};