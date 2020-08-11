const express = require('express');
const app = express();

app.use(express.json());
//DONT FORGET CORS!!!!
app.use(require('cors')({
  origin: true,
  credentials: true
}));
app.use(require('cookie-parser')());

// app.use('/api/v1/RESOURCE', require('./routes/resource'));

app.use('/api/v1/todos', require('./routes/todos'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/goals', require('./routes/goals'));
app.use('/api/v1/insights', require('./routes/insights'));
app.use('/api/v1/stars', require('./routes/stars'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
