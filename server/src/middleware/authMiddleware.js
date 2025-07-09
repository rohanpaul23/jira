import jwt from 'jsonwebtoken';
import { isTokenRevoked } from './tokenBlackList.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: token missing' });
  }

  if (isTokenRevoked(token)) {
    return res.status(403).json({ message: 'Forbidden: token revoked' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return err.name === 'TokenExpiredError'
        ? res.status(403).json({ message: 'Forbidden: token expired' })
        : res.status(403).json({ message: 'Forbidden: invalid token' });
    }

    // Attach user info to req.user with id alias
    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };
    next();
  });
};
