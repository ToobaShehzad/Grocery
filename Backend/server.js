const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
