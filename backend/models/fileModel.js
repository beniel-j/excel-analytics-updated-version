const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  // other fields...
}, { timestamps: true }); // <--- important

module.exports = mongoose.model('Upload', fileSchema);
