
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();



// View routes
router.get('/users', userController.renderIndex);
router.get('/users/create', userController.renderCreate);
router.get('/users/edit/:id', userController.renderEdit);

// API routes
router.get('/api/users', userController.getAllUsers);
router.post('/api/users', userController.createUser);
router.put('/api/users/:id', userController.updateUser);
router.delete('/api/users/:id', userController.deleteUser);
export default router;