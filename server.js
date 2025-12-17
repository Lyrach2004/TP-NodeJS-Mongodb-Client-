require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection
let db;
const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('✅ Connecté à MongoDB');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
}

// Middleware pour rendre la DB accessible dans les routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

const productsRoutes = require('./routes/products');

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API Products - TP MongoDB' });
});

// Routes API
app.use('/api/products', productsRoutes);

// Démarrage du serveur
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  });
});

// Gestion de la fermeture propre
process.on('SIGINT', async () => {
  await client.close();
  console.log('Connexion MongoDB fermée');
  process.exit(0);
});