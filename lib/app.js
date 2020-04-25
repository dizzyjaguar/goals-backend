const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
//DONT FORGET CORS!!!!
app.use(cors());
app.use(require('cookie-parser')());

// app.use('/api/v1/RESOURCE', require('./routes/resource'));

app.use('/api/v1/todos', require('./routes/todos'));
app.use('/api/v1/auth', require('./routes/auth'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
