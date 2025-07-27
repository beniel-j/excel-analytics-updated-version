const express = require('express');
const router = express.Router();
const {
  getSummary,
  getAllUsers,
  getUploads,
  getLogs,
  changeUserRole
} = require('../controllers/adminController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// All routes protected with auth + admin check
router.use(authMiddleware, adminMiddleware);

router.get('/summary', getSummary);
router.get('/users', getAllUsers);
router.get('/uploads', getUploads);
router.get('/logs', getLogs);
router.put('/role/:id', changeUserRole);



module.exports = router;
