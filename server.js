require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./utils/db');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();

// Connect Database
try {
  db.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("DB Connected!");
  });
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

// Avoid cors error
app.use(cors({
  origin: '*'
}));

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/preview', require('./routes/previewRoutes'));
app.use('/api/site', require('./routes/siteRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
