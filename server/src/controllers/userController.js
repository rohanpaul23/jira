import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// backend/src/controllers/userController.js
export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user.userId;                     // the logged-in user
    const users = await User
      .find({ _id: { $ne: currentUserId } })                   // exclude them
      .select('-password -__v')                                // still hide sensitive fields
      .lean();

    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const generateToken = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }
  try {
    const user = await User.findById(userId).select('email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, expiresIn: 3600 });
  } catch (err) {
    console.error('Error generating token:', err);
    res.status(500).json({ message: 'Server error' });
  }
};