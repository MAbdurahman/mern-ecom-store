import express from "express";
import {signUpUser, signInUser, signOutUser, validateAccess} from '../controllers/auth/authController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

const router = express.Router();

/************************* routes *************************/
router.post('/sign-up', signUpUser);
router.post('/sign-in', signInUser);
router.post('/sign-out', signOutUser);
router.get('/validate-access', authMiddleware, validateAccess);

export default router;