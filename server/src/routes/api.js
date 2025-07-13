import express from 'express';
import authRoutes from './authRoutes.js';
import workspaceRoutes from './workSpaceRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/workspaces', workspaceRoutes);
router.use('/users', userRoutes); // new user listing endpoint

export default router;
