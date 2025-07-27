const Chart = require('../models/Chart'); 
const Upload = require('../models/upload');

exports.saveChart = async (req, res) => {
  try {
    const { title, chartType, xColumn, yColumn, data, isSaved } = req.body;

    const newChart = new Chart({
      title,
      chartType,
      xColumn,
      yColumn,
      data,
      isSaved: isSaved || true,
      userId: req.user.id, // ✅ associate chart with user
      timestamp: new Date()
    });

    await newChart.save();
    res.status(201).json({ msg: 'Chart saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to save chart' });
  }
};


// GET latest 3 saved charts
exports.getRecentSaved = async (req, res) => {
  const charts = await Chart.find({ userId: req.user.id })
    .sort({ timestamp: -1 })
    .limit(3);
  res.json(charts);
};

// GET full history (last 15)
exports.getFullHistory = async (req, res) => {
  const charts = await Chart.find({ userId: req.user.id })
    .sort({ timestamp: -1 })
    .limit(15);
  res.json(charts);
};

// GET recently uploaded charts (last 3) for the user
exports.getRecentUploaded = async (req, res) => {
  try {
    const charts = await Chart.find({ userId: req.user.id, isSaved: false })
      .sort({ timestamp: -1 })
      .limit(3);
    res.json(charts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch recent uploads' });
  }
};

exports.getSavedCharts = async (req, res) => {
  try {
    const charts = await Chart.find({
      userId: req.user.id,    // ✅ only fetch user's charts
      isSaved: true
    }).sort({ timestamp: -1 });

    res.json(charts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch saved charts' });
  }
};

exports.getUploadsPerDay = async (req, res) => {
  try {
    const uploads = await Upload.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const formatted = uploads.map(item => ({
      date: item._id,
      count: item.count
    }));

    res.json(formatted); // ✅ Should be an array
  } catch (err) {
    console.error('Failed to get uploads per day:', err);
    res.status(500).json({ error: 'Failed to fetch upload trends' });
  }
};
