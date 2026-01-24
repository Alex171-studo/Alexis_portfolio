## 🔷 1. Qu'est-ce qu'une base de données ?

Une base de données est une méthode de stockage électronique organisée de collections de données. Elle est contrôlée par un **DBMS** (*Database Management System* ou SGBD en français).

### 🗄️ Le DBMS (SGBD)
Le DBMS est le logiciel qui interagis avec les utilisateurs, les applications et la base de données elle-même pour capturer et analyser les données.

Il existe deux grandes familles de DBMS :
1. **Relationnels (SQL)** : Stockent les données dans des tables liées entre elles (MySQL, PostgreSQL, SQLite, MS SQL Server).
2. **Non-Relationnels (NoSQL)** : Ne fonctionnent pas par tables/colonnes/lignes, offrant plus de flexibilité (MongoDB, Cassandra, ElasticSearch).

---

## 🔷 2. Structure d’une base de données relationnelle

- **Table** : ensemble de données organisées en lignes et colonnes (ex. : `users`, `products`). Chaque table a un nom unique.
- **Colonne (champ / field)** : attribut d’un objet (ex. : `username`, `password`). On définit un **type** de donnée (INTEGER, STRING/VARCHAR, DATE) pour éviter les erreurs.
- **Ligne (enregistrement / record)** : une entrée individuelle de données.
- **Auto-increment** : fonctionnalité qui attribue un numéro unique croissant à chaque nouvelle ligne (crée un champ clé).
- **Clé primaire (`PRIMARY KEY`)** : identifiant **unique** pour chaque ligne. Essentiel pour les relations.
- **Clé étrangère (`FOREIGN KEY`)** : référence la clé primaire d'une autre table, créant ainsi une **relation**.

> ✅ **Relational vs Non-Relational** : 
> Les bases relationnelles utilisent des colonnes fixes et des relations strictes. Les bases NoSQL n'ont pas de schéma fixe, chaque ligne peut contenir des informations différentes.

---

## 🔷 2. Commandes de gestion (DDL – Data Definition Language)

| Commande | Usage | Exemple |
|--------|------|--------|
| `CREATE DATABASE` | Créer une base | `CREATE DATABASE thm_books;` |
| `USE` | Sélectionner une base | `USE thm_books;` |
| `CREATE TABLE` | Créer une table | `CREATE TABLE books (id INT PRIMARY KEY, name VARCHAR(255));` |
| `DESCRIBE` / `DESC` | Voir la structure d’une table | `DESC books;` |
| `ALTER TABLE ... ADD` | Modifier une table | `ALTER TABLE books ADD price DECIMAL(5,2);` |
| `DROP TABLE` / `DROP DATABASE` | Supprimer (⚠️ irréversible) | `DROP TABLE logs;` |

> 💡 En pentest : ces commandes ne sont **généralement pas accessibles** via injection (droits limités), mais leur compréhension est cruciale pour lire les schémas.

---

## 🔷 3. Opérations CRUD (DML – Data Manipulation Language)

| Opération | Commande | Description |
|---------|--------|------------|
| **Create** | `INSERT INTO` | Ajoute une nouvelle ligne |
| **Read** | `SELECT` | Récupère des données |
| **Update** | `UPDATE ... SET ... WHERE` | Modifie des lignes existantes |
| **Delete** | `DELETE FROM ... WHERE` | Supprime des lignes |

> ⚠️ **Toujours utiliser `WHERE` avec `UPDATE`/`DELETE`** → sans ça, **toutes les lignes** sont affectées !  
> 🔒 En sécurité : une mauvaise validation des entrées dans ces opérations = porte ouverte aux **injections SQL**.

---

## 🔷 4. Clauses essentielles

| Clause | Rôle | Exemple |
|-------|------|--------|
| `WHERE` | Filtre les lignes **avant** regroupement | `WHERE category = "Offensive Security";` |
| `GROUP BY` | Regroupe les lignes par valeur | `GROUP BY category;` |
| `HAVING` | Filtre les groupes **après** regroupement | `HAVING COUNT(*) > 1;` |
| `ORDER BY` | Trie les résultats (`ASC` / `DESC`) | `ORDER BY published_date DESC;` |
| `DISTINCT` | Élimine les doublons | `SELECT DISTINCT name FROM books;` |

> 🧠 Astuce :  
> - `WHERE` → filtre les **lignes brutes**  
> - `HAVING` → filtre les **résultats agrégés** (ex. : après `COUNT`, `SUM`)

---

## 🔷 5. Opérateurs

### Logiques
- `AND` : toutes les conditions vraies
- `OR` : au moins une condition vraie
- `NOT` : inverse la condition
- `LIKE` : recherche par motif (`%` = joker)
- `BETWEEN x AND y` : équivalent à `>= x AND <= y`

### Comparaisons
- `=` , `!=` (ou `<>`)
- `<`, `>`, `<=`, `>=`

> 🔥 En injection SQL :  
> `' OR '1'='1'--` → contourne l’authentification  
> `' AND SUBSTRING(password,1,1)='a'--` → blind SQLi

---

## 🔷 6. Fonctions SQL (clé pour le pentest)

### 🔤 Fonctions sur les chaînes
| Fonction | Usage | Pentest |
|--------|------|--------|
| `CONCAT(a, b)` | Colle deux chaînes | Formater sortie : `CONCAT(user, ':', pass)` |
| `GROUP_CONCAT(col)` | Regroupe plusieurs lignes en une seule chaîne | **Exfiltration massive** : `GROUP_CONCAT(table_name)` |
| `SUBSTRING(str, pos, len)` | Extrait une sous-chaîne | **Blind SQLi** : deviner mot de passe caractère par caractère |
| `LENGTH(str)` | Retourne la longueur | Deviner la taille d’un secret avant extraction |

### 📊 Fonctions d’agrégation
| Fonction | Usage |
|--------|------|
| `COUNT(*)` | Nombre total de lignes |
| `SUM(col)` | Somme des valeurs |
| `MAX(col)` / `MIN(col)` | Valeur maximale / minimale |

> 💡 Exemple puissant en injection :
> ```sql
> ' UNION SELECT GROUP_CONCAT(username,0x3a,password) FROM users--
> ```
> → `0x3a` = `:` en hexadécimal (évite les quotes)

---




