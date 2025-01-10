# DEVPOLL

### Langues:
* [English README](./README_EN/README.md)

## Table des matières

1. [Prérequis](#prérequis)
2. [Installation](#installation)
   - [Configuration de la base de données](#1-configuration-de-la-base-de-données)
   - [Installation du serveur](#2-installation-du-serveur)
   - [Installation du client](#3-installation-du-client)
3. [Commandes utiles](#commandes-utiles)
   - [Serveur](#serveur)
   - [Client](#client)
4. [Configuration technique avancée](#configuration-technique-avancée)
5. [Dépannage](#dépannage)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **MySQL** (version 5.7 ou supérieure)
- **Node.js** (version 23.4.0 ou supérieure)
- **npm** (version 11.0.0 ou supérieure, généralement installé avec Node.js)

---

## Installation

### 1. Configuration de la base de données

1. **Installez MySQL** sur votre machine si ce n'est pas déjà fait. Assurez-vous que la version est 5.7 ou supérieure.
2. **Créez une base de données** MySQL pour le projet. Vous pouvez utiliser la commande suivante dans votre terminal MySQL :

   ```sql
   CREATE DATABASE IF NOT EXISTS <DB_name>;
   ```

   Remplacez `<DB_name>` par le nom de votre base de données.

3. **Vérifiez les accès** à la base de données en vous assurant que l'utilisateur MySQL a les permissions nécessaires.

---

### 2. Installation du serveur

1. **Clonez le dépôt** du projet :

   ```bash
   git clone https://github.com/ElectraVote-Web-App/DevPoll.git
   cd votre-projet/server
   ```

2. **Configurez les variables d'environnement** pour le serveur en copiant le fichier `.env.example` vers `.env` et en remplissant les informations nécessaires :

   ```bash
   cp .env.example .env
   ```

   Exemple de contenu pour `.env` :

   ```env
   DB_HOST=<db_host>          # Exemple : localhost
   DB_USER=<user_name>        # Exemple : root
   DB_PASSWORD=<user_password> # Votre mot de passe MySQL
   DB_NAME=<DB_name>          # Nom de la base de données
   DB_PORT=3306               # Port MySQL par défaut

   PORT=3000                  # Port du serveur
   HOST=localhost             # Hôte du serveur

   JWT_SECRET=votre_clé_secrète_jwt # Clé secrète pour JWT

   NODE_ENV=development       # Environnement d'exécution
   ALLOWED_ORIGINS=http://localhost:<port> # Origines autorisées pour CORS
   ```

3. **Installez les dépendances** :

   ```bash
   npm install
   ```

4. **Exécutez les migrations et les seeders** pour créer les tables dans la base de données et peupler la base de données avec des données initiales :

   ```bash
   npm run migration
   npm run seed

   # Ou en une seule commande
   npm run setup
   ```

5. **Démarrez le serveur** en mode développement :

   ```bash
   npm run dev
   ```

   Le serveur devrait maintenant être accessible à l'adresse `http://localhost:3000`.

---

### 3. Installation du client

1. **Accédez au dossier client** :

   ```bash
   cd ../client
   ```

2. **Installez les dépendances** :

   ```bash
   npm install
   ```

3. **Configurez les variables d'environnement** pour le client en copiant le fichier `.env.example` vers `.env` et en remplissant les informations nécessaires :

   ```bash
   cp .env.example .env
   ```

   Exemple de contenu pour `.env` :

   ```env
   VITE_BASE_URL=http://localhost:<port>    # URL de l'API
   VITE_FRONTEND_URL=http://localhost:<port> # URL du frontend
   ```

4. **Démarrez l'application client** en mode développement :

   ```bash
   npm run dev
   ```

   L'application client devrait maintenant être accessible à l'adresse `http://localhost:<port>`.

---

## Commandes utiles

### Serveur

- **Démarrer le serveur en mode développement** : `npm run dev`
- **Exécuter les migrations** : `npm run migration`
- **Annuler la dernière migration** : `npm run rollback`
- **Annuler toutes les migrations** : `npm run rollback-all`
- **Exécuter les seeders** : `npm run seed`
- **Réinitialiser la base de données et la remplir avec les seeders** : `npm run reset-db`

### Client

- **Démarrer l'application en mode développement** : `npm run dev`
- **Construire l'application pour la production** : `npm run build`
- **Lancer un serveur de prévisualisation** : `npm run preview`
- **Linter le code** : `npm run lint`

---

## Configuration technique avancée

### Base de données

- **Migration manuelle** : Si vous devez créer une nouvelle migration, utilisez Sequelize CLI :
  ```bash
  npx sequelize-cli migration:generate --name nom_de_votre_migration
  ```

- **Rollback spécifique** : Pour annuler une migration spécifique :
  ```bash
  npx sequelize-cli db:migrate:undo --name nom_de_la_migration
  ```

### Environnement de production

- **Variables d'environnement** : Assurez-vous de configurer correctement les variables d'environnement pour la production, notamment `NODE_ENV=production` et les clés secrètes.

- **Optimisation du client** : Avant de déployer le client, exécutez la commande suivante pour optimiser le build :
  ```bash
  npm run build
  ```

---

## Dépannage

### Problèmes courants

1. **Erreurs de connexion à la base de données** :
   - Vérifiez que MySQL est en cours d'exécution.
   - Assurez-vous que les informations de connexion dans `.env` sont correctes.

2. **Erreurs de migration** :
   - Si une migration échoue, utilisez `npm run rollback` pour annuler la dernière migration.
   - Vérifiez les logs pour plus de détails.

3. **Problèmes de CORS** :
   - Assurez-vous que `ALLOWED_ORIGINS` dans `.env` contient l'URL correcte du client.


