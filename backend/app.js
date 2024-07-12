const connectDatabase = require('./database');
const express = require("express");

const app = express();
const PORT = 8000;

require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDatabase();

const userRoute = require("./routes/user");
const trendRoute = require("./routes/trends");


app.use("/api", userRoute);
app.use("/api/trending", trendRoute);


app.listen(PORT, () => {
    console.log("Server listening at Port 8000....");
})

