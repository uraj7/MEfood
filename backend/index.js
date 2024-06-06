const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db");
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB initialization (if needed)
// mongoDB();

// Configure CORS to allow requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // if you need to handle cookies or authentication
}));

app.get('/', (req, res) => {
  res.send('Hello World!------');
});

// Use your routes
app.use('/api', require("./Routes/CreatUser"));  // Middleware
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
