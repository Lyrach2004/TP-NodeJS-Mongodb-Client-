# TP NodeJS MongoDB Client - Gestion de Produits

## Auteur
ZOUNGRANA Charly

## Description
Ce projet est une API REST développée avec Node.js, Express et MongoDB pour la gestion de produits. Il met en pratique :
- La connexion à une base de données MongoDB
- La création d'API REST avec Express.js
- L'asynchronisme en Node.js
- Les requêtes avancées MongoDB (pagination, filtrage, recherche, tri)
- L'utilisation du framework d'agrégation MongoDB

## Prérequis
- Node.js (version 14 ou supérieure)
- MongoDB (local ou cluster Atlas)
- npm ou yarn

## Installation

1. Cloner le dépôt :
```bash
git clone [URL_DU_REPO]
cd tp-mongodb-api
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer l'environnement :
Créer un fichier `.env` à la racine du projet avec :
```
MONGODB_URI=votre_uri_mongodb
PORT=3000
```

4. Lancer le serveur en mode développement :
```bash
npm run dev
```

## Peuplement des données
Pour insérer les données de test dans la base de données :
```bash
npm run seed
```

## API Endpoints

### 1. Récupération des produits
**GET** `/api/products`

Paramètres de requête :
- `page` : Numéro de page (défaut: 1)
- `limit` : Nombre d'éléments par page (défaut: 10)
- `category` : Filtrer par catégorie
- `search` : Recherche dans le titre et la description
- `sort` : Tri (ex: `price` pour croissant, `-price` pour décroissant)

Exemple :
```
GET /api/products?page=1&limit=5&category=smartphones&search=iphone&sort=price
```

### 2. Statistiques des produits
**GET** `/api/products/stats`

Retourne des statistiques avancées sur les produits, incluant :
- Statistiques globales par catégorie
- Meilleurs produits par note
- Analyse par marque

## Structure du Projet
```
tp-mongodb-api/
├── config/               # Configuration de la base de données
├── controllers/          # Contrôleurs de l'API
├── models/               # Modèles de données
├── routes/               # Définition des routes
├── scripts/              # Scripts utilitaires
│   └── seedProducts.js   # Script de peuplement des données
├── .env                  # Variables d'environnement
├── server.js             # Point d'entrée de l'application
└── package.json
```

## Technologies Utilisées
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Nodemon (développement)

## Démarrage en Production
```bash
npm install --production
npm start
```

## Licence
Ce projet est sous licence MIT.
