/************************* imports *************************/
import bcrypt from 'bcryptjs';
import User from '../../models/userModel.js';
import {messageHandler} from '../../utils/messageHandlerUtils.js';
import {validateName, validateEmail, validatePassword} from '../../utils/functionUtils.js';
import {generateTokenAndSetCookie} from '../../utils/generateTokenAndSetCookieUtils.js';

export const signUp = async (req, res) => {
   const {username, email, password } = req.body;

   try {

      if (!username) {
         return messageHandler(res, 'Full name is required!', false, 400);
      }
      if (!validateName(username)) {
         return messageHandler(res, 'Enter your first and last name!', false, 406);
      }

      if (!email) {
         return messageHandler(res, 'Email is required!', false, 400);
      }
      if (!validateEmail(email)) {
         return messageHandler(res, 'Enter a valid email address!', false, 400);
      }

      if (!password) {
         return messageHandler(res, 'Password is required!', false, 400);
      }
      if (!validatePassword(password)) {
         return messageHandler(res, 'Password must be at least 8 characters!', false, 406);
      }

      const userAlreadyExists = await User.findOne({email});
      if (userAlreadyExists) {
         return messageHandler(res, 'Email already exists!', false, 400);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
         username,
         email,
         password: hashedPassword,

      });

      await newUser.save();

     return messageHandler(res, 'Signed up successfully!', true, 201);

   } catch (err) {
      console.error("Error signing up user: ", err.message);
      return messageHandler(res, err.message, false, 500);
   }
};

export const signIn = async (req, res) => {
   const { email, password } = req.body;

   if (!email) {
      return messageHandler(res, 'Email is required!', false, 400);
   }
   if (!validateEmail(email)) {
      return messageHandler(res, 'Enter a valid email address!', false, 400);
   }
   if (!password) {
      return messageHandler(res, 'Password is required!', false, 400);
   }
   if (!validatePassword(password)) {
      return messageHandler(res, 'Password must be at least 8 characters!', false, 406);
   }

   try {
      const user = await User.findOne({email});
      if (!user) {
         return messageHandler(res, 'Invalid credentials!', false, 403);
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
         return messageHandler(res, 'Invalid credentials!', false, 406);
      }

      const token = generateTokenAndSetCookie(res, user._id);

      res.status(200).send({
         message: 'Signed in successfully!',
         token,
         user: {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
         }});

   } catch(err) {
      console.error("Error signing in user: ", err.message);
      return messageHandler(res, err.message, false, 500);
   }

}

export const signOut = async (req, res) => {
   res.clearCookie("token");
   return messageHandler(res, 'Signed out successfully!', true, 200);

}

export const validateAccess = (req, res) => {
   const user = req.user;
   if (!user) {
      return messageHandler(res, 'Invalid user!', false, 401);
   }
   res.status(200).json({
      success: true,
      message: 'User successfully authenticated!',
      user
   });

}