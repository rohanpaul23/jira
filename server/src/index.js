import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const env = process.env.NODE_ENV || 'development';

let mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  mongoUri =
    env === 'production'
      ? process.env.MONGO_URI_DOCKER || 'mongodb://mongo:27017/mydb'
      : process.env.MONGO_URI_LOCAL || 'mongodb://localhost:27017/mydb';
}

console.log(`🔗 Connecting to MongoDB [${env}]:`, mongoUri);

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/api/test-db', async (req, res) => {
  try {
    const admin = await mongoose.connection.db.admin().ping();
    res.status(200).json({ status: 'connected', ping: admin });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(PORT, () => console.log(`Mongo DB connected ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
