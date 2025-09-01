import { RequestHandler, Router } from 'express';
import { uploadSingle } from '../../config/multer.config';
import { authController } from './auth.controller';

const router = Router();
// Post /api/auth - Get all users
//router.post('/register',uploadSingle('avatar'), authController.register);
router.post('/register',uploadSingle('avatar'), authController.register.bind(authController));

// GET /api/users/:uid - Get user by ID
//router.post('/login', authController.login.bind(authController));
router.post('/login', authController.login.bind(authController) as RequestHandler);
router.post('/login-jwt',
     authController.loginWithJWT.bind(authController) as RequestHandler);
// POST /api/users - Create user (with optional avatar)
router.post('/logout', authController.logout);

export const authRouter = router;
