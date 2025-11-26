const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const pool = require('./config/database');
const authRoutes = require('./routes/auth');
const estatesRoutes = require('./routes/estates');
const propertiesRoutes = require('./routes/properties');
const notificationsRoutes = require('./routes/notifications');
const usersRoutes = require('./routes/users');

const app = express();

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'https://landregistry-gamma.vercel.app'],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/estates', estatesRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Enugu Land Registry API' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', time: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('================================');
  console.log('  ENUGU LAND REGISTRY API');
  console.log('  Running on port ' + PORT);
  console.log('  http://localhost:' + PORT);
  console.log('================================');
});