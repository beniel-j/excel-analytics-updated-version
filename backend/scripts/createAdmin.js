const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Make sure path is correct

// ✅ Replace with your actual MONGO_URI
const mongoURI = 'mongodb+srv://benielj:HwIgrMPYz8p3rUhM@cluster0.3xemz0h.mongodb.net/excelAnalytics?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => {
  console.error("❌ MongoDB connection failed:", err);
  process.exit(1);
});

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("9876", 10);

    const existing = await User.findOne({ email: 'admin@gmail.com' });
    if (existing) {
      console.log('⚠️ Admin already exists');
      process.exit();
    }

    const admin = new User({
      name: 'admin',
      username: 'admin123',     // 👈 ADD THIS LINE
      email: 'admin@gmail.com',
      password: 9876,
      role: 'admin'
    });


    await admin.save();
    console.log('✅ Admin created successfully');
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
