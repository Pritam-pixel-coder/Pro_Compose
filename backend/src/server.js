console.log("Server file loaded");
const path = require('path');
// Load environment variables from both root and backend directories for local dev
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');

const app = express();

const cors = require('cors');



// Middleware
app.use(cors());
app.use(express.json());


const promptTestRoute = require('./routes/promptTest');

const generateEmailRoute = require('./routes/generateEmail');
app.use('/generate-email', generateEmailRoute);

const templateRoutes = require("./routes/templateRoutes");


//Routes
app.use('/prompt', promptTestRoute);
app.use("/api", templateRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('SmartPrompt API is running');
});






const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});