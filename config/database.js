const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI+'taskdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;