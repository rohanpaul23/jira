import Workspace from '../models/WorkSpace.js';
import { body, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';

/**
 * Get all workspaces
 */
export const getAllWorkspaces = async (req, res) => {
  try {
    const { onlyMemberWorkspaces } = req.query;
    const userId = req.user.id; // from authenticateToken middleware

    let filter = {};
    if (onlyMemberWorkspaces === 'true') {
      filter = {
        $or: [{ owner: userId }, { 'members.user': userId }],
      };
    }

    const workspaces = await Workspace.find(filter)
      .populate('owner', 'username email')
      .populate('members.user', 'username email');
    res.json(workspaces);
  } catch (err) {
    console.error('Error fetching workspaces:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get a single workspace by ID
 */
export const getWorkspaceById = async (req, res) => {
  const { id } = req.params;
  try {
    const workspace = await Workspace.findById(id)
      .populate('owner', 'username email')
      .populate('members.user', 'username email');
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }
    res.json(workspace);
  } catch (err) {
    console.error(`Error fetching workspace ${id}:`, err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create a new workspace
 */
export const createWorkspace = async (req, res) => {
  console.log('Auth header:', req.headers.authorization);
  console.log('req.user:', req.user);
  if (!req.user?.id) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: missing or invalid token' });
  }
  const { name, description, members } = req.body;
  const ownerId = req.user.id; // assuming authenticateToken sets req.user.userId

  try {
    const workspace = new Workspace({
      name,
      description,
      owner: ownerId,
      members: [{ user: ownerId, role: 'owner' }, ...(members || [])],
    });
    await workspace.save();
    console.log('workspace saved', workspace);
    res.status(201).json(workspace);
  } catch (err) {
    console.error('Error creating workspace:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update an existing workspace
 */
export const updateWorkspace = async (req, res) => {
  const { id } = req.params;
  const { name, description, members } = req.body;

  try {
    const workspace = await Workspace.findById(id);
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }
    // Only owner or admin can update
    const userId = req.user.userId;
    const isAllowed =
      workspace.owner.equals(userId) ||
      workspace.members.some(
        (m) => m.user.equals(userId) && ['admin'].includes(m.role),
      );
    if (!isAllowed) {
      return res
        .status(403)
        .json({ message: 'Forbidden: insufficient permissions' });
    }

    // Apply updates
    if (name) workspace.name = name;
    if (description) workspace.description = description;
    if (members) workspace.members = members;

    const updated = await workspace.save();
    res.json(updated);
  } catch (err) {
    console.error(`Error updating workspace ${id}:`, err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteWorkspace = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    console.log('workspaceId', workspaceId);
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    console.log('req.user.id', req.user.id);
    // Check if the user making the request is the owner of the workspace
    console.log('workspaceowener', workspace.owner.toString());
    if (workspace.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'Only the owner can delete this workspace' });
    }

    await workspace.deleteOne();
    return res.status(200).json({ message: 'Workspace deleted successfully' });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ message: 'Error deleting workspace' });
  }
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET /api/workspaces/:id/invite
export const getInviteCode = [
  //Validates that :id is a valid MongoDB ObjectId.
  // Looks up the workspace by ID.
  param('id').isMongoId(),
  validate,
  async (req, res) => {
    try {
      const ws = await Workspace.findById(req.params.id);
      if (!ws) {
        return res.status(404).json({ message: 'Workspace not found' });
      }
      const userId = req.user.id;
      const allowed =
        ws.owner.equals(userId) ||
        ws.members.some(
          (m) => m.user.equals(userId) && ['owner', 'admin'].includes(m.role),
        );
      if (!allowed) {
        return res
          .status(403)
          .json({ message: 'Only Admin or Owner can invite members ' });
      }
      return res.json({ inviteCode: ws.inviteCode });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  },
];

// POST /api/workspaces/join
export const joinWorkspace = [
  body('inviteCode').isHexadecimal().isLength({ min: 8, max: 8 }),
  validate,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { inviteCode } = req.body;
      const ws = await Workspace.findOne({ inviteCode });
      if (!ws) {
        return res.status(404).json({ message: 'Invalid invite code' });
      }
      const alreadyMember = ws.members.some((m) => m.user.equals(userId));
      if (alreadyMember) {
        return res.status(400).json({ message: 'Already a member' });
      }
      ws.members.push({ user: userId, role: 'member' });
      await ws.save();
      return res.json({ message: 'Joined workspace', workspaceId: ws._id });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  },
];
