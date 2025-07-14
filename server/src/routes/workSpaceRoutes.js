import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {
  getAllWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  getInviteCode,
  generateNewInviteCode,
  sendInviteLink,
  joinWorkspace,
  getWorkspaceByInviteToken
} from '../controllers/workSpaceController.js';

const router = express.Router();

// List all workspaces
router.get('/', authenticateToken, getAllWorkspaces);

// Join via invite link (JWT token)
router.put('/join', authenticateToken, joinWorkspace);

router.get('/workspacetoken/:token', authenticateToken, getWorkspaceByInviteToken);

// Retrieve the current invite code/link for a workspace
router.get('/:id/invite', authenticateToken, getInviteCode);

// Regenerate a new invite link for a workspace
router.put('/:id/invite/regenerate', authenticateToken, generateNewInviteCode);

// CRUD operations by workspace ID
router.get('/:id', authenticateToken, getWorkspaceById);
router.post('/', authenticateToken, createWorkspace);
router.put('/:id', authenticateToken, updateWorkspace);
router.delete('/:id', authenticateToken, deleteWorkspace);

export default router;
