import Workspace from "../models/WorkSpace.js";

/**
 * Get all workspaces
 */
export const getAllWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find()
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
    return res.status(401).json({ message: 'Unauthorized: missing or invalid token' });
  }
  const { name, description, members } = req.body;
  const ownerId = req.user.id; // assuming authenticateToken sets req.user.userId

  try {
    const workspace = new Workspace({
      name,
      description,
      owner: ownerId,
      members: [
        { user: ownerId, role: 'owner' },
        ...(members || [])
      ]
    });
    await workspace.save();
    console.log("workspace saved",workspace)
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
    const isAllowed = workspace.owner.equals(userId) ||
      workspace.members.some(m => m.user.equals(userId) && ['admin'].includes(m.role));
    if (!isAllowed) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
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
