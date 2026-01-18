# OWASP IAAA

## 🧠 **Fondement théorique : Le modèle IAAA**

Avant d’aborder chaque vulnérabilité, il faut maîtriser le **cadre conceptuel IAAA**, car c’est la colonne vertébrale de la sécurité applicative :

| Composante | Rôle | Exemple |
|-----------|------|--------|
| **Identity** | Identifier *qui* est l’utilisateur | `user@domain.com`, `UID=1234` |
| **Authentication** | Prouver que cette identité est légitime | Mot de passe, OTP, clé FIDO2 |
| **Authorisation** | Définir ce que cette identité *peut faire* | Admin vs utilisateur standard |
| **Accountability** | Tracer *qui a fait quoi, quand, et d’où* | Logs d’accès, alertes SIEM |

> 🔑 **Principe fondamental** : Ces étapes sont **séquentielles et dépendantes**. Si l’**identité** n’est pas correctement établie, l’**authentification** est inutile. Si l’**authentification** échoue, l’**autorisation** ne peut être fiable. Et sans **accountability**, on ne peut ni détecter ni répondre à un incident.

---

## 🎯 **A01: Broken Access Control**  
### *(Contrôle d’accès rompu)*

### 🔍 **Définition**
Il s’agit d’un **échec à appliquer correctement les règles d’autorisation** côté serveur. L’application **fait confiance au client** (navigateur, requête HTTP) pour respecter les limites d’accès — ce qui est une erreur fatale.

### ⚠️ **Conséquences**
- **Escalade horizontale** : accéder aux données d’un autre utilisateur du même rôle (ex. : voir le compte bancaire de `id=6` alors que tu es `id=7`).
- **Escalade verticale** : accéder à des fonctions réservées aux admins (ex. : `/admin/delete_user`).

### 🧪 **Exemple concret : IDOR (Insecure Direct Object Reference)**
```http
GET /profile?id=123 HTTP/1.1
Host: bank.example.com
Cookie: session=abc123
```
→ Si tu changes `id=123` en `id=124` et que tu vois un autre profil → **Broken Access Control**.


---

## 🔐 **A07: Authentication Failures**  
### *(Échecs d’authentification)*

### 🔍 **Définition**
L’application **ne vérifie pas correctement l’identité** de l’utilisateur, soit par mauvaise conception, soit par absence de mécanismes de sécurité.

### ⚠️ **Vecteurs d’attaque courants**
| Vulnérabilité | Explication |
|---------------|------------|
| **Enumeration d’utilisateurs** | Messages d’erreur différents (`"Email inconnu"` vs `"Mot de passe incorrect"`) → fuite d’identités valides. |
| **Mots de passe faibles / devinables** | Pas de politique de complexité, pas de verrouillage après X tentatives. |
| **Sessions non sécurisées** | Cookies sans `HttpOnly`, `Secure`, `SameSite`; sessions persistantes; fixation de session. |
| **Logique métier défectueuse** | Réinitialisation de mot de passe sans vérification suffisante (ex. : token dans l’URL, pas de timeout). |

---

## 📜 **A09: Logging & Alerting Failures**  
### *(Échecs de journalisation et d’alerte)*

### 🔍 **Définition**
L’application **ne trace pas les événements critiques** ou ne les alerte pas, ce qui **brise l’accountability**. Sans logs fiables, on ne peut ni **détecter**, ni **enquêter**, ni **corriger** une attaque.

### ⚠️ **Signes d’un mauvais logging**
- Aucun log lors de :
  - Échecs de login
  - Changements de rôle ou de permissions
  - Accès à des ressources sensibles (`/admin`, `/api/export`)
- Logs trop vagues : `"Erreur"` au lieu de `"Tentative de login échouée pour user@x.com depuis 192.168.1.100"`
- Logs stockés localement, sans sauvegarde, sans intégrité (modifiable par un attaquant).
- Pas d’intégration avec un **SIEM** (ex. : ELK, Splunk, Wazuh).
---

## 🔗 **Lien entre les 3 catégories et IAAA**

| Catégorie OWASP | Composante IAAA affectée | Conséquence si absente |
|------------------|--------------------------|------------------------|
| **A01** | **Authorisation** | N’importe qui peut faire n’importe quoi |
| **A07** | **Authentication** | N’importe qui peut *devenir* n’importe qui |
| **A09** | **Accountability** | On ne sait *jamais* qui a fait quoi |



 **Challenge A09 : Analyser les logs**
- Chercher un endpoint `/logs` ou `/debug`.
- Voir si tes actions (même malveillantes) sont tracées.
- Essayer de supprimer un log via une requête POST.


