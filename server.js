require("dotenv").config();
const express = require("express");
const mongoose = require("./config/database");
const cors = require("cors");
require("./cronjobs/task");


const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require("./routes/user-routes");
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
