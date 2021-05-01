const mongoose = require('mongoose');

// MongoDB Connection

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(`Error ${err.message}`);
    // exit with failure
    process.exit(1);
  }
};

module.exports = connectDB;
