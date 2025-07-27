const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
  title: String,
  chartType: String,
  xColumn: String,
  yColumn: String,
  data: Array,
  isSaved: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to users collection
    required: true
  }
});


module.exports = mongoose.model('Chart', chartSchema);
