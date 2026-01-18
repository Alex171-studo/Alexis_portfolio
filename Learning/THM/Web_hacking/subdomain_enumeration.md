# 🔍 Subdomain Enumeration 

## 1️⃣ Définition fondamentale

### Qu’est-ce qu’un **subdomain** ?

Un sous-domaine est une **extension du domaine principal**.

Exemples :

* `domain.com` → domaine principal
* `www.domain.com` → sous-domaine
* `api.domain.com`
* `admin.domain.com`
* `dev.domain.com`

### Qu’est-ce que le **Subdomain Enumeration** ?

C’est le processus qui consiste à **découvrir tous les sous-domaines existants** d’un domaine cible.

---

## 2️⃣ Pourquoi c’est CRITIQUE en cybersécurité

### 🎯 Objectif principal : **augmenter la surface d’attaque**

Chaque sous-domaine est potentiellement :

* Un serveur différent
* Une application différente
* Une configuration différente
* Une faille différente

👉 **Plus de sous-domaines = plus de failles possibles**

---

### 🔥 Exemples réels de risques

| Sous-domaine       | Risque                     |
| ------------------ | -------------------------- |
| `dev.domain.com`   | Code non sécurisé          |
| `admin.domain.com` | Interface d’administration |
| `api.domain.com`   | API mal protégée           |
| `old.domain.com`   | Logiciel obsolète          |
| `test.domain.com`  | Debug activé               |

---

## 3️⃣ Les 3 grandes méthodes d’énumération

---

# 🧠 MÉTHODE 1 : OSINT (Open Source Intelligence)

➡️ **Sans attaquer directement la cible**
➡️ Basée sur des **données publiques**

---

## 🔐 OSINT via SSL/TLS Certificates (Certificate Transparency)

### Principe scientifique

Lorsqu’un site utilise HTTPS :

* Un **certificat SSL/TLS** est créé
* Il est **obligatoirement enregistré** dans des **CT Logs**
* Ces logs sont **publics**

📌 Objectif : empêcher les faux certificats
📌 Conséquence : **on peut voir tous les sous-domaines certifiés**

---

### Outil : **crt.sh**

### Exemple

Recherche :

```
%.acmeitsupport.thm
```

Résultat :

```
www.acmeitsupport.thm
api.acmeitsupport.thm
vpn.acmeitsupport.thm
dev.acmeitsupport.thm
```

👉 Même des sous-domaines **invisibles dans le DNS** peuvent apparaître.

---

### ⚠️ Avantages / Limites

✔ Très discret
✔ Historique complet
❌ Ne montre que les sous-domaines ayant un certificat SSL

---

## 🔎 OSINT via moteurs de recherche

### Principe

Google indexe :

* Pages web
* Liens
* Sous-domaines

On utilise des **Google Dorks**.

---

### Commande logique (Google)

```
site:*.domain.com -site:www.domain.com
```

### Explication

| Élément  | Rôle                   |
| -------- | ---------------------- |
| `site:`  | Limite à un domaine    |
| `*.`     | Tous les sous-domaines |
| `-site:` | Exclusion              |

---

### Exemple

```
site:*.acmeitsupport.thm -site:www.acmeitsupport.thm
```

Résultats :

* `portal.acmeitsupport.thm`
* `mail.acmeitsupport.thm`

---

## 🤖 OSINT automatisé : Sublist3r

### Pourquoi automatiser ?

Parce que Sublist3r interroge :

* Google
* Bing
* Yahoo
* Baidu
* VirusTotal
* Netcraft
* CT Logs
* Passive DNS

---

### Commande

```bash
./sublist3r.py -d acmeitsupport.thm
```

### Résultat

```
web55.acmeitsupport.thm
www.acmeitsupport.thm
```

---

### Analyse

✔ Très rapide
✔ Silencieux
❌ Peut manquer des sous-domaines internes

---

# ⚔️ MÉTHODE 2 : DNS Bruteforce

---

## Principe

On teste **des milliers de noms possibles** :

```
www
admin
dev
api
test
mail
vpn
```

➡️ On demande au DNS :

> “Est-ce que ce sous-domaine existe ?”

---

## Outil : dnsrecon

### Commande

```bash
dnsrecon -t brt -d acmeitsupport.thm
```

### Explication

| Option   | Rôle          |
| -------- | ------------- |
| `-t brt` | Bruteforce    |
| `-d`     | Domaine cible |

---

### Résultat

```
A api.acmeitsupport.thm 10.10.10.10
A www.acmeitsupport.thm 10.10.10.10
```

---

### Analyse

✔ Découvre des sous-domaines DNS publics
❌ Bruyant (beaucoup de requêtes)
❌ Bloqué par rate-limiting parfois

---

# 🕶️ MÉTHODE 3 : Virtual Host Enumeration (VHOST)

---

## Problème clé

Certains sous-domaines :

* ❌ N’existent PAS dans le DNS public
* ✔️ Sont reconnus **uniquement par le serveur web**

---

## Principe HTTP (fondamental)

Le serveur web choisit le site à afficher via :

```
Host: nomdusite
```

Exemple :

```
Host: admin.acmeitsupport.thm
```

👉 Même IP, sites différents

---

## Attaque : manipulation du header `Host`

---

## Outil : ffuf

### Commande de base

```bash
ffuf -w /usr/share/wordlists/SecLists/Discovery/DNS/namelist.txt \
-H "Host: FUZZ.acmeitsupport.thm" \
-u http://10.65.128.111
```

---

### Décomposition scientifique

| Élément | Rôle              |
| ------- | ----------------- |
| `-w`    | Wordlist          |
| `FUZZ`  | Variable injectée |
| `-H`    | Header HTTP       |
| `-u`    | IP du serveur     |

---

## Problème : faux positifs

➡️ Le serveur répond toujours
➡️ Il faut filtrer

---

## Filtrage par taille de page

### Commande avancée

```bash
ffuf -w /usr/share/wordlists/SecLists/Discovery/DNS/namelist.txt \
-H "Host: FUZZ.acmeitsupport.thm" \
-u http://10.65.128.111 \
-fs 154
```

| Option | Rôle                             |
| ------ | -------------------------------- |
| `-fs`  | Ignore pages de taille identique |

---

### Résultat attendu

```
admin.acmeitsupport.thm
dev.acmeitsupport.thm
```

🔥 **Sous-domaines invisibles au DNS**

---

## 🧠 RÉSUMÉ STRATÉGIQUE (Pentest Pro)

| Méthode        | Bruit     | Efficacité | Cas d’usage          |
| -------------- | --------- | ---------- | -------------------- |
| OSINT          | 🔇 Faible | ⭐⭐⭐⭐       | Reconnaissance       |
| DNS Bruteforce | 🔊 Moyen  | ⭐⭐⭐        | DNS public           |
| Virtual Host   | 🔊 Moyen  | ⭐⭐⭐⭐⭐      | Sous-domaines cachés |

---


