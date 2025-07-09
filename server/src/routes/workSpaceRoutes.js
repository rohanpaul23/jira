import express from 'express';

import { authenticateToken } from '../middleware/authMiddleware.js';
import { getAllWorkspaces,getWorkspaceById,createWorkspace,updateWorkspace } from '../controllers/workspaceController.js';

const router = express.Router();

// Protected workspace endpoints
router.get('/', authenticateToken, getAllWorkspaces);
router.get('/:id', authenticateToken, getWorkspaceById);
router.post('/', authenticateToken, createWorkspace);
router.put('/:id', authenticateToken, updateWorkspace);

export default router;
