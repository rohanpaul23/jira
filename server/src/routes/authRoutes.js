import express from 'express';
import { registerUser, loginUser, logOutUser } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateToken, logOutUser);

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ msg: `Hello, user ${req.user.id}` });
});

export default router;