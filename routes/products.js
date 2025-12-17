const express = require('express');
const router = express.Router();

// GET /api/products/stats - DOIT ÊTRE AVANT la route '/' pour éviter les conflits
router.get('/stats', async (req, res) => {
  try {
    const db = req.db;
    const productsCollection = db.collection('products');

    // ========================================
    // Exercice 6.1 : Stats Globales par Catégorie
    // ========================================
    const statsByCategory = await productsCollection.aggregate([
      {
        $group: {
          _id: '$category',
          totalProducts: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' }
        }
      },
      {
        $sort: { avgPrice: -1 }
      },
      {
        $project: {
          _id: 0,
          categoryName: '$_id',
          totalProducts: 1,
          averagePrice: { $round: ['$avgPrice', 2] },
          maxPrice: 1,
          minPrice: 1
        }
      }
    ]).toArray();

    // ========================================
    // Exercice 6.2 : Top 5 Produits les Mieux Notés (prix > 500$)
    // ========================================
    const topRatedExpensive = await productsCollection.aggregate([
      {
        $match: { price: { $gt: 500 } }
      },
      {
        $sort: { rating: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          _id: 0,
          title: 1,
          price: 1,
          rating: 1
        }
      }
    ]).toArray();

    // ========================================
    // Exercice 6.3 : Décomposition par Marque (Stock Total et Valeur)
    // ========================================
    const statsByBrand = await productsCollection.aggregate([
      {
        $group: {
          _id: '$brand',
          totalStock: { $sum: '$stock' },
          totalValue: { 
            $sum: { 
              $multiply: ['$price', '$stock'] 
            } 
          }
        }
      },
      {
        $sort: { totalValue: -1 }
      },
      {
        $project: {
          _id: 0,
          brandName: '$_id',
          totalStock: 1,
          totalValue: { $round: ['$totalValue', 2] }
        }
      }
    ]).toArray();

    // ========================================
    // Réponse finale avec toutes les stats
    // ========================================
    res.json({
      success: true,
      data: {
        statsByCategory,
        topRatedExpensive,
        statsByBrand
      }
    });

  } catch (error) {
    console.error('Erreur lors du calcul des stats:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors du calcul des statistiques',
      error: error.message
    });
  }
});

// GET /api/products - Route principale avec filtrage, recherche, tri et pagination
router.get('/', async (req, res) => {
  try {
    const db = req.db;
    const productsCollection = db.collection('products');

    // 1. Extraction des paramètres de requête
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;
    const sort = req.query.sort;

    // 2. Construction du filtre MongoDB
    const filter = {};

    // Filtrage par catégorie
    if (category) {
      filter.category = category;
    }

    // Recherche par titre ou description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // 3. Configuration du tri
    let sortOption = {};
    if (sort) {
      // Si sort commence par '-', c'est décroissant
      if (sort.startsWith('-')) {
        const field = sort.substring(1);
        sortOption[field] = -1;
      } else {
        sortOption[sort] = 1;
      }
    }

    // 4. Calcul de la pagination
    const skip = (page - 1) * limit;

    // 5. Exécution des requêtes
    // Récupérer les produits avec pagination
    const products = await productsCollection
      .find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .toArray();

    // Compter le total de produits (pour la pagination)
    const total = await productsCollection.countDocuments(filter);

    // 6. Calcul du nombre total de pages
    const totalPages = Math.ceil(total / limit);

    // 7. Réponse JSON
    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: page,
        limit: limit,
        totalProducts: total,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
});

module.exports = router;