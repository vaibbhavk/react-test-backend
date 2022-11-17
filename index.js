const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const user = require("./routes/api/user");
const auth = require("./routes/api/auth");

// connect database
connectDB(process.env.MONGO_URI);

// middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

// API BASE POINT
app.get("/api", (req, res) => res.send("API BASE POINT"));

// define routes
app.use("/api/user", user);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on the port ${port}`);
});
