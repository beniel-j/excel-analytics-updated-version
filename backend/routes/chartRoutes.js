const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/chartController');

router.post('/save', auth, controller.saveChart);
router.get('/recent-saved', auth, controller.getRecentSaved);
router.get('/history', auth, controller.getFullHistory);
router.get('/recent-uploaded', auth, controller.getRecentUploaded); // ✅ Add this
router.get('/saved', auth, controller.getSavedCharts);
router.get('/uploads-per-day', auth, controller.getUploadsPerDay);




module.exports = router;
