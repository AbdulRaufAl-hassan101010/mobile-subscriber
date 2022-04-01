const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true },
  (error) => {
    if (error)
      return console.log(`Couldn't connect to database. try again!!`.bgCyan);

    console.log(`You are connected to the database!!:)`.bgGreen);
  }
);
