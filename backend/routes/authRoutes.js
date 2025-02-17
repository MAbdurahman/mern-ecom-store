import express from "express";
import {signUp, signIn, signOut, validateAccess} from '../controllers/auth/authController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

const router = express.Router();

/************************* routes *************************/
router.post('sign-up', signUp);
router.post('sign-in', signIn);
router.post('sign-out', signOut);
router.get('/validate-access', authMiddleware, validateAccess);

export default router;