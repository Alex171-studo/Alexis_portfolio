# Authentication bypass

## 🔐 Pourquoi l’authentification est une cible critique ?

L’authentification est le **premier rempart** entre un attaquant et les données sensibles d’un système. Si elle est mal conçue, elle devient la porte ouverte à :
- L’accès non autorisé à des comptes utilisateurs
- La fuite de données personnelles (RGPD, confidentialité, réputation)
- L’élévation de privilèges (ex. : accès admin)
- La compromission totale de l’application

Les vulnérabilités d’authentification sont classées parmi les **Top 10 OWASP**, notamment sous **"Broken Authentication"**.
---

## 1️⃣ Énumération de noms d’utilisateurs (Username Enumeration)

### 📌 Concept
L’énumération consiste à **identifier des identifiants valides** (ex. : `admin`, `robert`) en observant les **réponses différentielles** du serveur.

> ⚠️ Une bonne application **ne doit jamais confirmer** si un utilisateur existe ou non.

### 💡 Exemple concret
Sur la page d’inscription (`/customers/signup`), si tu saisis `admin` :
```text
An account with this username already exists.
```
→ Cela révèle que `admin` est un compte **valide**.

### 🔧 Automatisation avec `ffuf`
Tu utilises **`ffuf`** (Fuzz Faster U Fool) pour tester une liste de noms d’utilisateurs :

```bash
ffuf -w /usr/share/wordlists/SecLists/Usernames/Names/names.txt \
     -X POST \
     -d "username=FUZZ&email=x&password=x&cpassword=x" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -u http://10.65.187.107/customers/signup \
     -mr "username already exists"
```

#### 🔍 Décryptage des options :
- `-w` : charge une wordlist (ici, des prénoms courants)
- `-X POST` : envoie une requête POST (car le formulaire l’exige)
- `-d` : corps de la requête. `FUZZ` = placeholder remplacé par chaque entrée de la wordlist
- `-H` : définit le type de contenu (obligatoire pour les formulaires HTML)
- `-mr` (**match regex**) : ne retient que les réponses contenant cette chaîne → preuve d’un compte existant

### ✅ Résultat
Tu obtiens une liste de **noms d’utilisateurs valides** → base pour les attaques suivantes.

---

## 2️⃣ Attaque par force brute (Brute Force)

### 📌 Concept
Une fois les **utilisateurs valides connus**, on tente de deviner leurs **mots de passe** en testant une liste de candidats probables.

> ⚠️ C’est efficace **seulement si** :
> - Pas de verrouillage de compte
> - Pas de CAPTCHA
> - Mots de passe faibles

### 🔧 Attaque multi-cible avec `ffuf`
```bash
ffuf -w valid_usernames.txt:W1,/usr/share/wordlists/SecLists/Passwords/Common-Credentials/10-million-password-list-top-100.txt:W2 \
     -X POST \
     -d "username=W1&password=W2" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -u http://10.65.187.107/customers/login \
     -fc 200
```

#### 🔍 Explication :
- Deux wordlists : `W1` = utilisateurs, `W2` = mots de passe
- `-fc 200` (**filter code**) : **exclut** les réponses avec statut HTTP 200  
  → Pourquoi ? Parce qu’une **connexion échouée** renvoie souvent **200 OK** avec un message d’erreur,  
  tandis qu’une **connexion réussie** redirige (302) ou affiche un tableau de bord (200 mais avec contenu différent).

> 🎯 Astuce : Si `-fc 200` ne fonctionne pas, utilise `-fr "Invalid credentials"` ou `-mc 302` selon le comportement.

### ✅ Résultat
Tu identifies un couple `(username, password)` fonctionnel → accès au compte.


---

## 3️⃣ Faille de logique (Logic Flaw)

### 📌 Concept
Une **faille de logique** survient quand le développeur fait une **hypothèse erronée** sur le flux applicatif, permettant à un attaquant de **détourner le comportement prévu**.

### 💡 Exemple : Réinitialisation de mot de passe biaisée

#### 🔁 Processus normal :
1. Saisir email → vérifie existence
2. Saisir username → vérifie correspondance
3. Envoi d’un lien de réinitialisation **à l’email fourni à l’étape 1**

#### 🕳️ Vulnérabilité :
Le backend utilise `$_REQUEST` en PHP, qui fusionne **GET + POST**.  
Et **POST écrase GET** en cas de conflit de clé.

Donc :
- URL : `?email=robert@acmeitsupport.thm` (GET)
- Corps POST : `username=robert&email=attacker@hacker.com`

→ Le backend lit `email` depuis **POST**, donc envoie le lien à **l’attaquant** !

### 🔧 Exploitation avec `curl`
```bash
curl 'http://10.65.187.107/customers/reset?email=robert%40acmeitsupport.thm' \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -d 'username=robert&email={ton_email}@customer.acmeitsupport.thm'
```

→ Tu reçois un lien de réinitialisation **pour le compte de Robert** → tu deviens Robert.

### ✅ Résultat
Accès complet au compte victime **sans connaître son mot de passe**.

---

## 4️⃣ Manipulation de cookies (Cookie Tampering)

### 📌 Concept
Les cookies stockent souvent l’**état de session**. Si mal sécurisés, ils peuvent être **modifiés** pour :
- Se faire passer pour un utilisateur connecté
- Obtenir des droits admin

### 🔹 Cas 1 : Cookies en clair
Exemple :
```http
Set-Cookie: logged_in=true; admin=false
```

→ Il suffit de modifier `admin=false` → `admin=true`.

#### Test avec `curl` :
```bash
curl -H "Cookie: logged_in=true; admin=true" http://10.65.187.107/cookie-test
```
→ Réponse : `"Logged In As An Admin"` + flag.

> ❌ Erreur critique : stocker des rôles **directement dans le cookie client**.

### 🔹 Cas 2 : Données encodées (ex. : Base64)
Cookie :
```http
session=eyJpZCI6MSwiYWRtaW4iOmZhbHNlfQ==
```

Décodage Base64 :
```json
{"id":1,"admin":false}
```

→ Modifie en `{"id":1,"admin":true}` → ré-encode en Base64 → injecte le nouveau cookie.

> ⚠️ Base64 **n’est pas du chiffrement** ! C’est juste de l’encodage réversible.

### 🔹 Cas 3 : Hashes (et CrackStation)
Parfois, les cookies contiennent des **hashes** (ex. : MD5, SHA1).  
Même si le hash est "irréversible", il peut être **cassé** via des tables arc-en-ciel ou des bases comme **[CrackStation](https://crackstation.net/)**.

> 🔍 Selon ton extrait, CrackStation possède :
> - **15 milliards** d’entrées pour MD5/SHA1 (190 Go)
> - **1.5 milliard** pour autres algorithmes (19 Go)
> → Basé sur Wikipedia + wordlists + mangling intelligent

Exemple :
- Hash : `c4ca4238a0b923820dcc509a6f75849b` (MD5)
- CrackStation → retourne `"1"`

> 🛡️ **Bonnes pratiques** :  
> - **Jamais** stocker de données sensibles dans les cookies  
> - Utiliser des **sessions côté serveur** (ID aléatoire stocké en BDD)  
> - Signer les cookies (ex. : JWT avec HMAC)  
> - Utiliser des **selles (salt)** pour les hash → rend inutilisable les tables précalculées

---

## 🧠 Synthèse : Tableau comparatif des vulnérabilités

| Technique | Cause racine | Impact | Détection | Remédiation |
|---------|--------------|--------|----------|-------------|
| **Énumération** | Messages d’erreur trop verbeux | Identification de comptes valides | Analyse des réponses HTTP | Messages génériques, rate limiting |
| **Force brute** | Absence de protection contre les tentatives | Accès compte | Logs d’auth, monitoring | Verrouillage, MFA, délais |
| **Faille logique** | Mauvaise gestion des paramètres (GET/POST) | Contournement total d’auth | Revue de code, tests de flux | Validation stricte, séparation claire des sources |
| **Cookie tampering** | Données critiques stockées côté client | Escalade de privilèges | Inspection des cookies | Sessions serveur, signature, chiffrement |

---

