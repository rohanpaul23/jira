import express from 'express';
import { generateToken, getAllUsers } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected: only authenticated users can list users
router.get('/', authenticateToken, getAllUsers);

router.post('/token', generateToken);

export default router;
