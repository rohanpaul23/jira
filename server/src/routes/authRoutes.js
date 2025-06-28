import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/protected', protect, (req, res) => {
  res.json({ msg: `Hello, user ${req.user.id}` });
});

export default router;