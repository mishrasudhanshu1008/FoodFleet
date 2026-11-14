import User from '../models/User.js';
import { createToken, safeUser } from '../utils/token.js';

export async function register(req, res, next) {
  try {
    const { name, email, password, phone, address, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must contain at least 6 characters.' });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: 'An account with this email already exists.' });

    const requestedRole = role === 'admin' && process.env.ALLOW_ADMIN_REGISTER === 'true' ? 'admin'
      : ['customer', 'restaurant', 'delivery'].includes(role) ? role : 'customer';

    const user = await User.create({ name, email, password, phone, address, role: requestedRole });
    res.status(201).json({ token: createToken(user._id), user: safeUser(user) });
  } catch (err) { next(err); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid email or password.' });
    if (!user.isActive) return res.status(403).json({ message: 'Your account is disabled.' });
    res.json({ token: createToken(user._id), user: safeUser(user) });
  } catch (err) { next(err); }
}

export async function me(req, res) {
  res.json({ user: safeUser(req.user) });
}
