# 🛡️ OWASP API SECURITY TOP 10
---

## 🔰 INTRODUCTION GÉNÉRALE

### Qu’est-ce qu’une API ?

Une **API (Application Programming Interface)** est une interface permettant à deux logiciels de communiquer via :

* des **requêtes** (request)
* des **réponses** (response)
* des **protocoles** (HTTP/HTTPS)
* des **formats** (JSON, XML)

👉 Une API **n’a pas d’interface graphique**, donc **toute la sécurité est côté serveur**.

---

### Pourquoi les API sont une cible majeure ?

* Accès direct aux **données**
* Peu de visibilité pour les utilisateurs
* Utilisées par mobile, web, IoT
* Mauvaise implémentation fréquente

---

# 🔟 OWASP API SECURITY TOP 10 (DÉTAILLÉ)

---

## 1️⃣ BOLA – Broken Object Level Authorization

### 📌 Définition

Un utilisateur accède à **des objets qui ne lui appartiennent pas**, simplement en modifiant un identifiant.

### 🔬 Cause technique

* L’API fait confiance à l’ID envoyé (`/users/1`)
* Pas de vérification :

  > “Est-ce que cet utilisateur a le droit d’accéder à cet objet ?”

### 💥 Impact

* Fuite massive de données
* Account Takeover
* Violation de la confidentialité

### 🧠 Exemple

```http
GET /users/2
Authorization: valid_token_user1
```

➡️ User1 accède aux données de User2

### 🛠️ Mitigations

* Vérification **objet par objet**
* Comparaison : `object.owner_id == authenticated_user.id`
* Jamais se fier à l’ID fourni par le client

---

## 2️⃣ BUA – Broken User Authentication

### 📌 Définition

Le mécanisme d’authentification est mal implémenté ou incomplet.

### 🔬 Causes fréquentes

* Validation partielle (email sans mot de passe)
* Tokens faibles
* Pas d’expiration
* Pas de MFA

### 💥 Impact

* Usurpation d’identité
* Accès non autorisé
* Compromission totale de comptes

### 🛠️ Mitigations

* Hash des mots de passe (bcrypt, argon2)
* JWT sécurisés (signature + expiration)
* MFA
* Protection brute force (captcha, rate limit)

---

## 3️⃣ Excessive Data Exposure

### 📌 Définition

L’API renvoie **plus de données que nécessaire**.

### 🔬 Cause technique

* Sérialisation complète d’un objet
* Filtrage laissé au frontend

### 💥 Impact

* Exposition de tokens
* Données personnelles divulguées

### 🧠 Mauvais exemple

```json
{
  "id": 1,
  "email": "a@b.com",
  "password_hash": "...",
  "role": "admin"
}
```

### 🛠️ Mitigations

* DTO / serializers
* Allowlist stricte des champs
* Revue systématique des réponses API

---

## 4️⃣ Lack of Resources & Rate Limiting

### 📌 Définition

Aucune limite sur :

* le nombre de requêtes
* la taille des payloads
* la fréquence

### 💥 Impact

* DoS
* Épuisement ressources
* Perte financière

### 🛠️ Mitigations

* Rate limiting (IP, user, token)
* Limite taille payload
* Captcha
* Timeouts

---

## 5️⃣ Broken Function Level Authorization

### 📌 Définition

Un utilisateur à faible privilège accède à des **fonctions réservées aux admins**.

### 🔬 Cause

* Vérification basée sur un header manipulable
* Absence de contrôle de rôle serveur

### 💥 Impact

* Escalade de privilèges
* Contrôle total du système

### 🛠️ Mitigations

* RBAC / ABAC
* Vérification du rôle **en base**
* Deny by default

---

## 6️⃣ Mass Assignment

### 📌 Définition

Le client peut modifier des champs **qu’il ne devrait jamais contrôler**.

### 🔬 Cause

* Binding automatique des champs
* Absence de filtrage serveur

### 💥 Impact

* Escalade privilège
* Corruption de données

### 🛠️ Mitigations

* Allowlist champs modifiables
* `fillable / guarded` (Laravel)
* Jamais faire confiance au payload client

---

## 7️⃣ Security Misconfiguration

### 📌 Définition

Configuration incorrecte ou trop permissive.

### 🔬 Exemples

* Stack trace visible
* Debug en production
* CORS ouvert
* Endpoints internes exposés

### 💥 Impact

* Reconnaissance facilitée
* Préparation d’attaques ciblées

### 🛠️ Mitigations

* Désactiver debug
* Messages d’erreur génériques
* Permissions strictes
* Audits réguliers

---

## 8️⃣ Injection

### 📌 Définition

Entrées utilisateur interprétées comme du code.

### 🔬 Types

* SQL Injection
* Command Injection
* XML Injection

### 💥 Impact

* Vol de données
* RCE
* Destruction système

### 🛠️ Mitigations

* Requêtes préparées
* Validation + sanitation
* ORM
* WAF

---

## 9️⃣ Improper Assets Management

### 📌 Définition

Anciennes versions d’API encore accessibles.

### 🔬 Cause

* Mauvaise gestion du cycle de vie
* Documentation incomplète

### 💥 Impact

* Exploitation d’anciennes failles
* Accès non contrôlé

### 🛠️ Mitigations

* Inventaire API
* Désactivation endpoints obsolètes
* Versioning strict

---

## 🔟 Insufficient Logging & Monitoring

### 📌 Définition

Actions malveillantes non détectées ou non traçables.

### 💥 Impact

* Attaques invisibles
* Aucune réponse incident
* Impossible d’identifier l’attaquant

### 🛠️ Mitigations

* Logs API détaillés
* SIEM
* Alertes temps réel
* Protection des logs

---

# 🧠 SYNTHÈSE FINALE (À MÉMORISER)

| Catégorie         | Principe de sécurité |
| ----------------- | -------------------- |
| BOLA, BFLA        | Autorisation         |
| BUA               | Authentification     |
| Data Exposure     | Confidentialité      |
| Rate Limiting     | Disponibilité        |
| Mass Assignment   | Intégrité            |
| Injection         | Intégrité            |
| Assets Management | Gouvernance          |
| Logging           | Détection & réponse  |

---

