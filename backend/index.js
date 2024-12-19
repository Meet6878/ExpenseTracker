const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const DBconnection = require("./DBConn");
const Routes = require("./routes/ExpenseRoute");
const path_n = require("path");
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
//=============================for live api check===============================

app.use(express.static(path_n.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path_n.resolve(__dirname, "../frontend/dist"));
});


app.use("/api/v1", Routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  DBconnection();
  console.log("listening on", PORT);
});
