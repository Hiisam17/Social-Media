const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

const authController = {
  // Đăng ký
  async register(req, res) {
    try {
      console.log('Register request:', req.body);
      const { username, email, password } = req.body;

      // Kiểm tra email đã tồn tại
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        console.log('Email already exists:', email);
        return res.status(400).json({ message: 'Email đã được sử dụng' });
      }

      // Tạo user mới
      console.log('Creating new user:', { username, email });
      const user = await User.create({ username, email, password });
      console.log('User created:', user);

      // Tạo token
      const token = jwt.sign(
        { userId: user.id },
        config.jwtSecret,
        { expiresIn: config.jwtExpiration }
      );

      res.status(201).json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  },

  // Đăng nhập
  async login(req, res) {
    try {
      console.log('Login request:', req.body);
      const { email, password } = req.body;

      // Tìm user
      const user = await User.findByEmail(email);
      if (!user) {
        console.log('User not found:', email);
        return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
      }

      // Kiểm tra mật khẩu
      const isPasswordValid = await User.comparePassword(password, user.password);
      if (!isPasswordValid) {
        console.log('Invalid password for user:', email);
        return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
      }

      // Tạo token
      const token = jwt.sign(
        { userId: user.id },
        config.jwtSecret,
        { expiresIn: config.jwtExpiration }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  },

  // Lấy thông tin user hiện tại
  async getCurrentUser(req, res) {
    try {
      console.log('Get current user:', req.userId);
      const user = await User.findById(req.userId);
      if (!user) {
        console.log('User not found:', req.userId);
        return res.status(404).json({ message: 'User không tồn tại' });
      }
      res.json(user);
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  }
};

module.exports = authController; 