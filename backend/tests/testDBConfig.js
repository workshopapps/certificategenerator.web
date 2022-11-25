const mongoose = require("mongoose");

exports.ConnectDB = async (MONGO_URI) => {
  try {
    return await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log(error.message);
  }
};

exports.ClearDB = async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
};

exports.DisconnectDB = async () => {
  return await mongoose.disconnect();
};
