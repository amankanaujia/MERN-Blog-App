const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoURL =
  "mongodb+srv://amankanaujia777:Node_Tutorial@nodetutorial.rsvlnga.mongodb.net/";
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch((e) => {
    console.log(e);
  });
