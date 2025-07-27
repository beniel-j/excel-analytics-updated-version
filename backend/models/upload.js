const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  size: {
    type: Number,
    default: 0
  }
}, { timestamps: true }); // ✅ Automatically adds createdAt & updatedAt

// ✅ Prevent OverwriteModelError during dev/hot-reload
module.exports = mongoose.models.Upload || mongoose.model('Upload', uploadSchema);
