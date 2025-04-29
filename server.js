const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const itemRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth');

dotenv.config();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', itemRoutes);
app.use('/api/auth', authRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch(err => console.error(err));
