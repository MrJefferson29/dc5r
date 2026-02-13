const mongoose = require("mongoose");

const connectDb = async () => {
  const uri = process.env.MONGODB_URI || "mongodb+srv://dc5r:CHAINXAU.29j@cluster0.3exgiyg.mongodb.net/?appName=Cluster0";

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;