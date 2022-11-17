const mongoose = require("mongoose");

const connectDB = async (dbURI) => {
  try {
    mongoose.connect(dbURI, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
