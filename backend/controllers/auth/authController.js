/************************* imports *************************/
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';
import {messageHandler} from '../../utils/messageHandlerUtils.js';
import {
   validateName,
   validateEmail,
   validatePassword
} from '../../utils/functionUtils.js';
import {
   generateToken
} from '../../utils/generateTokenUtils.js';

export const signUpUser = async (req, res) => {
   const {username, email, password} = req.body;

   try {

      if (!username) {
         return messageHandler(res, 'Full name is required!', false, 400);
      }
      if (username.length > 33) {
         return messageHandler(res, 'Full name cannot exceed 32 characters!', false, 406);
      }
      if (!validateName(username)) {
         return messageHandler(res, 'Enter your first and last name!', false, 406);
      }

      if (!email) {
         return messageHandler(res, 'Email is required!', false, 400);
      }
      if (!validateEmail(email)) {
         return messageHandler(res, 'Enter a valid email address!', false, 406);
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
         password: hashedPassword

      });

      await newUser.save();

      const saveUser = {
         email,
         username
      }


      messageHandler(res, 'Signed up successfully!', true, 201, saveUser);

   } catch (err) {
      console.error('Error signing up shopper: ', err.message);
      return messageHandler(res, err.message, false, 500);
   }
};

export const signInUser = async (req, res) => {
   const {email, password} = req.body;

   if (!email) {
      return messageHandler(res, 'Email is required!', false, 400);
   }
   if (!validateEmail(email)) {
      return messageHandler(res, 'Enter a valid email address!', false, 406);
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

      const token = generateToken(res, user);

      res.cookie('ecom_store', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production'
      }).status(200).json({
         message: 'Signed in successfully!',
         success: true,
         user: {
            email: user.email,
            role: user.role,
            id: user._id,
            username: user.username,
         }
      });

   } catch (err) {
      console.error('Error signing in shopper: ', err.message);
      return messageHandler(res, err.message, false, 500);
   }

}

export const signOutUser = async (req, res) => {
   res.clearCookie('ecom_store').status(200).json({
      success: true,
      message: 'Signed out successfully!',
   });

}

export const validateAccess = async (req, res) => {

   const user = req.user;

   if (!user) {
      return messageHandler(res, 'Access forbidden!', false, 406);
   }
   res.status(200).json({
      success: true,
      message: 'User authenticated!',
      user: user
   });

}