import express from 'express';
import { register, login, getCurrentUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Get current user (protected)
router.get('/me', authMiddleware, getCurrentUser);

export default router;
