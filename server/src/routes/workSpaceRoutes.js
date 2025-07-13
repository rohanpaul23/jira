import express from 'express';

import { authenticateToken } from '../middleware/authMiddleware.js';
import {
  getAllWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  getInviteCode,
  joinWorkspace,
  deleteWorkspace,
} from '../controllers/workSpaceController.js';

const router = express.Router();

// Protected workspace endpoints
router.get('/', authenticateToken, getAllWorkspaces);
router.get('/:id', authenticateToken, getWorkspaceById);
router.post('/', authenticateToken, createWorkspace);
router.put('/:id', authenticateToken, updateWorkspace);
router.delete('/:workspaceId', authenticateToken, deleteWorkspace);

// Invite code endpoints
router.get('/:id/invite', authenticateToken, getInviteCode);
router.post('/join', authenticateToken, joinWorkspace);

export default router;
