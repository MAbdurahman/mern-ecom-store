/************************* imports *************************/
import {model, Schema} from 'mongoose';

/************************* regex patterns *************************/
const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;
const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

const userSchema = new Schema({
   userName: {
      type: String,
      trim: true,
      required: [true, 'First and last name are required!'],
      minlength: [4, 'UserName must be at least 4 characters!'],
      maxLength: [32, 'UserName cannot exceed 32 characters!'],
      match: [name_pattern, 'Enter first and last name!'],
   },
   email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Email is required!'],
      unique: [true, 'Email already exists!'],
      match: [email_pattern, 'Enter a valid email!'],
   },
   password: {
      type: String,
      required: [true, 'Password is required!'],
      minlength: [8, 'Password must be at least 8 characters!'],
      select: false,
   },
   role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
   }
});

const User = new model('User', userSchema);
export default User;