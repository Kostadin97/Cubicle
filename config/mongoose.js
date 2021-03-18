const mongoose = require("mongoose");

module.exports = (app) => {
  mongoose.connect('mongodb+srv://admin:admin@cluster.6ztzo.mongodb.net/cubicle?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", console.log.bind(console, "DB Connected!"));
};
