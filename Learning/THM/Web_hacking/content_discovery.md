# 1️⃣ Qu’est-ce que le *Content Discovery* (découverte de contenu) ?

## Définition claire

En **sécurité des applications web**, le *Content Discovery* est le processus qui consiste à **trouver des ressources cachées ou non exposées volontairement** sur un site web.

👉 Ce ne sont **PAS** les pages visibles via les menus.
👉 Ce sont des éléments **existants**, mais **non annoncés**.

---

## 🔍 Qu’est-ce que le “contenu” ici ?

Le contenu peut être :

* 📄 Pages web cachées (`/admin`, `/staff`, `/internal`)
* 🗄️ Fichiers sensibles (`backup.zip`, `.env`, `config.php`)
* ⚙️ Interfaces d’administration
* 🧪 Anciennes versions du site
* ☁️ Fichiers stockés dans le cloud (AWS S3)
* 🧠 Code source publié par erreur

💡 **Principe clé**

> *Si un fichier existe sur le serveur et n’est pas correctement protégé, alors il est potentiellement attaquable.*

---

## 🎯 Objectif du Content Discovery

Pour un pentester ou un attaquant :

* Trouver **des points d’entrée**
* Accéder à des **fonctionnalités non protégées**
* Obtenir des **informations sensibles**
* Préparer une **exploitation (ex: SQLi, LFI, RCE)**

---

# 2️⃣ Les 3 grandes méthodes de Content Discovery

1. 🧑‍💻 **Manuelle**
2. 🌐 **OSINT (Open-Source Intelligence)**
3. 🤖 **Automatisée**

---

# 🧑‍💻 3️⃣ Content Discovery MANUEL

## 3.1 📜 robots.txt

### Qu’est-ce que c’est ?

`robots.txt` est un fichier situé à la racine du site :

```
https://site.com/robots.txt
```

Il indique aux **moteurs de recherche** ce qu’ils **n’ont pas le droit d’indexer**.

### Exemple réel :

```txt
User-agent: *
Disallow: /admin/
Disallow: /staff/
Disallow: /backup/
```

### ⚠️ Erreur classique des développeurs

Ils pensent que **Disallow = sécurité** ❌
En réalité, cela **montre exactement où regarder**.

### 🎯 Pour un pentester

* Liste directe de zones sensibles
* Accès parfois **sans authentification**
* Très forte valeur informationnelle

---

## 3.2 🎨 Favicon (icône du site)

### C’est quoi ?

La petite icône affichée dans l’onglet du navigateur.

### Pourquoi c’est important ?

Certains frameworks laissent leur favicon par défaut.

### Exemple :

* WordPress
* Joomla
* Laravel
* Tomcat
* phpMyAdmin

👉 Chaque favicon a une **signature (hash)**.

### 🔗 Base de données OWASP

OWASP maintient une base de correspondance favicon ↔ framework ([OWASP_favicon_database](https://wiki.owasp.org/index.php/OWASP_favicon_database)).

💡 **Impact**
Si tu connais le framework :

* Tu connais ses **failles connues**
* Tu connais ses **chemins par défaut**
* Tu sais quoi chercher (`/wp-admin`, `/phpmyadmin`…)

---

## 3.3 🗺️ sitemap.xml

### Différence avec robots.txt

| robots.txt          | sitemap.xml     |
| ------------------- | --------------- |
| Cache               | Révèle          |
| Bloque l’indexation | Liste les pages |
| Défensif            | Informatif      |

### Exemple :

```
https://site.com/sitemap.xml
```

### Contenu possible :

```xml
<url>
  <loc>https://site.com/old_admin</loc>
</url>
```

💣 Page supprimée du menu… mais toujours accessible !

---

## 3.4 📡 En-têtes HTTP (HTTP Headers)

Quand tu fais une requête HTTP, le serveur répond avec des **métadonnées**.

### Exemple :

```http
Server: nginx/1.18.0
X-Powered-By: PHP/7.4.3
```

### Informations critiques :

* Type de serveur
* Version exacte
* Langage backend

### 🎯 Exploitation

Si tu vois :

* PHP 7.4.3 → tu cherches les **CVE connues**
* Nginx ancien → mauvaises configurations possibles

👉 **Reconnaissance passive extrêmement puissante**

---

## 3.5 🧱 Stack technologique (Framework Stack)

À partir de :

* Favicon
* Code source HTML
* Commentaires
* Footers

Tu peux identifier :

* CMS (WordPress, Drupal)
* Framework (Laravel, Django)
* Librairies JS

💡 Une fois le framework connu :

* Tu sais **où sont les fichiers sensibles**
* Tu connais les **routes internes**
* Tu sais **comment attaquer intelligemment**

---

# 🌐 4️⃣ Content Discovery via OSINT

## 4.1 🔍 Google Hacking / Dorking

Google est une **arme de reconnaissance**.

### Exemples puissants :

```text
site:example.com admin
inurl:login
filetype:pdf site:example.com
intitle:index of
```

### Résultats possibles :

* Interfaces admin
* Documents internes
* Backups publics
* Dossiers ouverts

⚠️ **Google indexe ce que les admins oublient de protéger**

---

## 4.2 🧠 Wappalyzer

Outil d’identification technologique :

* CMS
* Frameworks
* Serveurs
* Version exacte

🎯 Gain énorme de temps pour la phase reconnaissance. Il permet d'obtenir les versions exactes des frameworks utilisés.

---

## 4.3 ⏳ Wayback Machine

Archive historique du web.

### Utilité offensive :

* Pages supprimées mais toujours actives
* Anciennes routes non protégées
* Fichiers oubliés

💣 Beaucoup de failles viennent de **pages “mortes” mais accessibles**.

Site : https://web.archive.org/web/
---

## 4.4 🧑‍💻 GitHub

### Erreur humaine classique :

* Code source public
* `.env`
* Mots de passe
* Clés API
* URLs internes

### Recherche :

* Nom du site
* Nom de l’entreprise
* Nom de domaine

👉 **OSINT = hacking sans attaquer**

---

## 4.5 ☁️ AWS S3 Buckets

### Format :

```
https://nom-bucket.s3.amazonaws.com
```

### Mauvaise configuration fréquente :

* Buckets publics
* Fichiers sensibles
* Upload autorisé

💥 Conséquence :

* Fuite massive de données
* Parfois RCE indirecte

---

# 🤖 5️⃣ Content Discovery AUTOMATISÉ

## Principe

Tu envoies **des milliers de requêtes** pour tester si :

* `/admin`
* `/backup`
* `/config`
* `/login_old`

existent.

---

## 📚 Wordlists

Listes de noms de :

* Fichiers
* Dossiers
* Extensions

🔗 **SecLists** = référence mondiale.

---

## 🔧 Outils d’automatisation

### 1️⃣ ffuf (rapide, moderne)

```bash
ffuf -w common.txt -u http://site/FUZZ
```

### 2️⃣ dirb (simple)

```bash
dirb http://site/ common.txt
```

### 3️⃣ gobuster (robuste)

```bash
gobuster dir -u http://site/ -w common.txt
```

### Résultats typiques :

* `/admin`
* `/uploads`
* `/backup.zip`
* `/config.php`

💣 **C’est ici que tombent la majorité des compromissions web**

---
