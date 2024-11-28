const express = require('express');
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
const dotenv = require('dotenv');
const routes = require('./routes/contactRoutes')

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
.connect(process.env.MONGO_URL)
.then(()=> console.log(`connect to MongoDB`))
.catch((err) => console.log(err))
app.use(routes)


app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api', contactRoutes);
app.use(routes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));