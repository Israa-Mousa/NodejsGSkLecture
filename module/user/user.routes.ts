import { Router } from 'express';
import { UserController } from './user.controller';
import { isAuthenticated } from '../../middlewares/auth.middleware';
const router = Router();

router.use(isAuthenticated);
const userController = new UserController();

// GET /api/users - Get all users
router.get('/', userController.getUsers);

// GET /api/users/:uid - Get user by ID
router.get('/:uid', userController.getUser);

// POST /api/users - Create user (with optional avatar)
router.post('/',  userController.createUser);

// PUT /api/users/:id - Update user (with optional avatar)
router.patch('/:id', userController.updateUser);

// DELETE /api/users/:id - Delete user
router.delete('/:id', userController.deleteUser);

export const userRouter = router;