// backend/controllers/adminController.js

const User = require('../models/user');
const Chart = require('../models/Chart');

// ✅ Dashboard Summary: Users, Admins, Uploads Count
const getSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalUploads = await Chart.countDocuments();
    res.json({ totalUsers, totalAdmins, totalUploads });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch summary' });
  }
};

// ✅ List All Users (for admin panel)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch users' });
  }
};

// ✅ List All Uploads with uploader info
const getUploads = async (req, res) => {
  try {
    const uploads = await Chart.find().populate('userId', 'email');
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch uploads' });
  }
};

// ✅ Dummy Logs (can be replaced with DB logs later)
const getLogs = async (req, res) => {
  res.json([
    { action: 'Logged in', user: 'admin@gmail.com', time: new Date() },
    { action: 'Changed user role', user: 'admin@gmail.com', time: new Date() }
  ]);
};

// ✅ Change Role of a User
const changeUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    await User.findByIdAndUpdate(id, { role });
    res.json({ message: 'Role updated successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update role' });
  }
};

module.exports = {
  getSummary,
  getAllUsers,
  getUploads,
  getLogs,
  changeUserRole
};
