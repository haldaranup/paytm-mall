const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://Paytm:paytmmall@cluster0.teued.mongodb.net/Paytmmall?retryWrites=true&w=majority"
  );
};

module.exports = connect;
