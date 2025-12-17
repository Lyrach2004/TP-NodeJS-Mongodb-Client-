require('dotenv').config();
const { MongoClient } = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const API_URL = 'https://dummyjson.com/products';
async function seedProducts() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    // 1. Connexion à MongoDB
    await client.connect();
    console.log('✅ Connecté à MongoDB');
    
    const db = client.db(DB_NAME);
    const productsCollection = db.collection('products');
    
    // 2. Récupérer les données de l'API
    console.log('📥 Récupération des produits depuis l\'API...');
    const response = await fetch(API_URL);
    const data = await response.json();
    const products = data.products;
    
    console.log(`📦 ${products.length} produits récupérés`);
    
    // 3. Supprimer la collection existante
    await productsCollection.deleteMany({});
    console.log('🗑️  Collection products nettoyée');
    
    // 4. Insérer les nouveaux produits
    const result = await productsCollection.insertMany(products);
    console.log(`✅ ${result.insertedCount} produits insérés avec succès`);
    
    // Afficher quelques stats
    const categories = [...new Set(products.map(p => p.category))];
    console.log(`📊 Catégories disponibles: ${categories.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
  } finally {
    // 5. Déconnexion
    await client.close();
    console.log('🔌 Déconnexion de MongoDB');
  }
}

// Exécuter le script
seedProducts();