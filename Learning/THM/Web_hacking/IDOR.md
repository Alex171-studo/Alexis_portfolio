# IDOR

## 🔍 Qu’est-ce qu’une IDOR ? 

**IDOR = Insecure Direct Object Reference**  
C’est une **vulnérabilité de contrôle d’accès** qui survient lorsqu’une application web utilise **des identifiants directs** (comme des numéros, des noms de fichiers, des clés primaires de base de données) fournis par l’utilisateur **sans vérifier si cet utilisateur a le droit d’accéder à la ressource ciblée**.

> En d’autres termes : l’application fait **trop confiance** à l’identifiant envoyé par le client, sans valider que la ressource appartient bien à l’utilisateur authentifié.

---

## 🧠 Pourquoi est-ce grave ?

- **Accès non autorisé à des données sensibles** : profils utilisateurs, documents privés, factures, messages, etc.
- **Violation de la confidentialité** (RGPD, HIPAA, etc.)
- **Porte d’entrée vers des attaques plus larges** (exfiltration massive, pivot dans un système)
- **Très courant dans les applications web mal sécurisées**, même modernes

---

## 🧪 Exemple simple (le classique)

Tu es connecté sur un site de gestion de comptes bancaires.  
L’URL pour consulter ton relevé est :

```
https://banque.exemple.com/releve?compte_id=789
```

Tu changes `789` en `790` :

```
https://banque.exemple.com/releve?compte_id=790
```

Et **boum** — tu vois le relevé d’un autre client.  
→ **C’est une IDOR.**

> L’application n’a **pas vérifié** que le compte 790 appartient à ton utilisateur. Elle a juste utilisé l’ID fourni.

---

## ⚙️ Comment fonctionne une IDOR techniquement ?

### 1. **Flux normal (sécurisé attendu)**
```http
GET /profile?user_id=1305 HTTP/1.1
Cookie: sessionid=abc123
```
→ Serveur :
- Vérifie que `sessionid=abc123` correspond à l’utilisateur **1305**
- Renvoie les données **seulement si OK**

### 2. **Flux vulnérable (IDOR)**
```http
GET /profile?user_id=1000 HTTP/1.1
Cookie: sessionid=abc123   ← toujours toi
```
→ Serveur :
- Lit `user_id=1000`
- **Ne compare pas** avec l’ID de la session
- Renvoie les données de l’utilisateur 1000 → **FAILLE**

---

## 🕵️‍♂️ Formes courantes d’IDOR

### A. **IDOR avec identifiants numériques simples**
- `?user_id=123`
- `?doc_id=456`
- `?invoice=789`

👉 Très facile à tester : incrémenter/décrémenter les valeurs.

---

### B. **IDOR avec identifiants encodés (ex: Base64)**

Parfois, les développeurs pensent que **cacher** l’ID derrière un encodage suffit à le protéger.  
Exemple :
```
/profile?user_id=TTEzMDU=   ← Base64 de "1305"
```

#### 🔓 Exploitation :
1. Décoder avec [base64decode.org](https://www.base64decode.org/) → `1305`
2. Modifier → `1000`
3. Ré-encoder avec [base64encode.org](https://www.base64encode.org/) → `MTAwMA==`
4. Requête :
   ```
   /profile?user_id=MTAwMA==
   ```
5. Si ça marche → **IDOR confirmée**

> ⚠️ **Encodage ≠ Chiffrement**. Base64 est réversible par n’importe qui. Ce n’est **pas une protection**.

---

### C. **IDOR avec identifiants hachés (ex: MD5, SHA1)**

Exemple :
```
/user?id=202cb962ac59075b964b07152d234b70   ← MD5 de "123"
```

#### 🔓 Exploitation :
1. Identifier le type de hash (longueur, caractères → souvent MD5 ou SHA1)
2. Utiliser un service comme [CrackStation.net](https://crackstation.net/)
   - Il contient **15 milliards de mots de passe/hashes précalculés**
   - Si le hash provient d’un entier faible (`1`, `100`, `1234`), il sera **trouvé en <1 seconde**
3. Une fois le vrai ID récupéré (ex: `123`), essayer `124`, `122`, etc.
4. Hasher la nouvelle valeur (avec `echo -n "124" | md5sum`) → injecter

> 💡 Astuce : les IDs hachés sont souvent **prévisibles** car issus de séquences simples (auto-increment SQL).

---

### D. **IDOR avec identifiants "imprévisibles" (UUID, tokens aléatoires)**

Exemple :
```
/document?id=a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8
```

Ici, deviner l’ID est **quasiment impossible**… mais **pas inutile à tester**.

#### 🔍 Méthode de détection :
1. Crée **deux comptes** (A et B)
2. Dans le compte A, note l’ID d’un document privé : `doc_A = X`
3. Dans le compte B, note l’ID d’un document : `doc_B = Y`
4. Connecté en tant que **A**, accède à `/document?id=Y`
   - Si tu vois le doc de B → **IDOR**
5. Même test **non connecté** → pire : fuite publique !

> ✅ C’est la méthode **la plus fiable** quand les IDs sont aléatoires.

---

## 🌐 Où chercher les IDOR ? (Au-delà de l’URL)

Les IDOR ne se trouvent **pas seulement dans l’adresse du navigateur**.

### Endroits à inspecter :
| Lieu | Exemple |
|------|--------|
| **Paramètres GET** | `?user_id=123` |
| **Paramètres POST** | Formulaire de modification de mot de passe |
| **Corps JSON (API REST)** | `{ "target_user": "456" }` |
| **En-têtes HTTP** | Rare, mais possible |
| **Cookies** | `current_profile=789` |
| **Fichiers JS** | `fetch('/api/user/'+userId)` |
| **Requêtes AJAX/XHR** | Observables via DevTools > Network |

> 🔎 **Conseil pro** : utilise **Burp Suite** ou **OWASP ZAP** pour intercepter/modifier toutes les requêtes, pas seulement celles visibles.

---

## 🏁 Résumé (pour ton mental model de pentester)

| Type d’ID | Risque IDOR | Méthode de test |
|----------|-------------|------------------|
| Numérique (`123`) | 🔴 Très élevé | +1, -1, bruteforce léger |
| Encodé (Base64) | 🔴 Élevé | Décoder → modifier → ré-encoder |
| Haché (MD5/SHA1) | 🟠 Moyen | CrackStation + re-hash |
| Aléatoire (UUID) | 🟢 Faible | Test croisé avec 2 comptes |
| Absence de contrôle | 🔴 Critique | Tester tous les paramètres sensibles |

---
