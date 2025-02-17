import jwt from 'jsonwebtoken';


export const authMiddleware = async (req, res, next) => {
   const token = req.cookies.token;
   if (!token)
      return res.status(401).json({
         success: false,
         message: 'Unauthorized user!',
      });

   try {
      req.user = jwt.verify(token, 'CLIENT_SECRET_KEY');
      next();
   } catch (error) {
      res.status(401).json({
         success: false,
         message: 'Unauthorized access token!',
      });
   }
};