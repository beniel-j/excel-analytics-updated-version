const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express(); // ✅ Initialize `app` BEFORE using it

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const fileRoutes = require('./routes/fileRoutes');
const authRoutes = require('./routes/authRoutes');
const chartRoutes = require('./routes/chartRoutes'); // ✅ this should exist
const adminRoutes = require('./routes/adminRoutes');
const adminStatsRoutes = require('./routes/adminStats');


app.use('/api/admin', adminRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/charts', chartRoutes); // ✅ use `app` AFTER it's declared
app.use('/api/admin/stats', adminStatsRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend server is running!");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
  });
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err);
});
