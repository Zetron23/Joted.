const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://contactsharma:sharmasahIl123@cluster0.453mcb0.mongodb.net/"; // Replace with your actual MongoDB URI and database name

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("Error connecting to DB\n", err));

const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const CollectionModel = mongoose.model("Collection1", LogInSchema);

module.exports = CollectionModel;
