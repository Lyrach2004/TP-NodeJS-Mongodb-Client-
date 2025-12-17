<div align="center">
  <h1>🛍️ API REST Node.js & MongoDB</h1>
  <p>Gestion avancée de produits avec des requêtes puissantes</p>
  
  [![Node.js](https://img.shields.io/badge/Node.js-14%2B-68a063?style=flat&logo=node.js)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-5.0%2B-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

  <img src="https://img.shields.io/badge/status-en%20cours-developpement-yellow" alt="Status">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
</div>

---

## ✨ Fonctionnalités

- **🔍 Recherche avancée** avec filtres multiples
- **📊 Statistiques** détaillées sur les produits
- **⚡ Performances optimisées** avec pagination
- **🔒 Gestion des erreurs** complète
- **📱 API RESTful** conforme aux standards

## 🌱 Peuplement des données

Le projet inclut un script de peuplement qui récupère des exemples de produits depuis une API externe et les insère dans votre base de données MongoDB.

```bash
# Lancer le script de peuplement
npm run seed
```

> Ce script va :
> - Se connecter à votre base de données MongoDB
> - Récupérer des données de produits depuis une API externe
> - Nettoyer la collection existante
> - Insérer les nouveaux produits

## 🚀 Démarrage rapide

### Prérequis
- Node.js 14+
- MongoDB (local ou Atlas)
- npm ou yarn

### Installation

1. **Cloner le projet**
   ```bash
   git clone [URL_DU_REPO]
   cd tp-mongodb-api
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   Créer un fichier `.env` :
   ```env
   MONGODB_URI=mongodb://localhost:27017/tp-mongodb
   PORT=3000
   DB_NAME=tp-mongodb
   ```

4. **Lancer le serveur**
   ```bash
   npm start
   ```
   > Le serveur sera disponible sur `http://localhost:3000`

## 📚 Documentation API

### Produits

#### Lister les produits
```http
GET /api/products
```

**Paramètres :**
| Paramètre | Type    | Description                          |
|-----------|---------|--------------------------------------|
| `page`    | number  | Page (défaut: 1)                    |
| `limit`   | number  | Résultats par page (défaut: 10)     |
| `category`| string  | Filtrer par catégorie              |
| `search`  | string  | Recherche dans titre/description   |
| `sort`    | string  | Tri (`price`, `-price`, `rating`, etc.) |

**Exemple :**
```bash
curl "http://localhost:3000/api/products?page=1&limit=5&category=smartphones&search=iphone&sort=price"
```

#### Statistiques avancées
```http
GET /api/products/stats
```

**Retourne :**
- 📊 Statistiques par catégorie
- 🏆 Top produits par note (prix > 500$)
- 🏷️ Analyse par marque (stock et valeur totale)

## 🛠 Structure du code

```
📁 tp-mongodb-api/
├── 📁 routes/
│   └── products.js      # Routes et logique métier
├── 📁 scripts/
│   └── seedProducts.js  # Script de peuplement des données
├── 📄 server.js         # Configuration du serveur
├── 📄 .env      # Variables d'environnement
└── 📦 package.json      # Dépendances et scripts
```

## 🚦 Tests

Pour lancer les tests :
```bash
npm test
```

## 🤝 Contribution

1. Fork le projet
2. Crée ta branche (`git checkout -b feature/AmazingFeature`)
3. Commit tes changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvre une Pull Request

---

<div align="center">
  <p>Réalisé avec ❤️ par <strong>ZOUNGRANA Charly</strong></p>
  <p>TP Node.js/MongoDB - GLSID2</p>
</div>
