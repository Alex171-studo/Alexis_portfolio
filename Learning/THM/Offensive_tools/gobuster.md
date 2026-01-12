

## 🔍 1. Introduction à Gobuster

### Qu’est-ce que Gobuster ?
- Outil open-source de **brute force ciblé**.
- Fonctionne avec des **wordlists** (pas de génération aléatoire).
- Modes principaux :
  - `dir` → dossiers/fichiers web
  - `dns` → sous-domaines (via DNS)
  - `vhost` → virtual hosts (via en-tête HTTP `Host`)
  - `s3` / `gcs` → buckets cloud (hors scope ici)

> ⚠️ **Pas de magie** : la qualité des résultats dépend **100 % de la wordlist** et de la configuration.

---

## 🗂️ 2. Mode `dir` – Énumération Web

### Objectif
Découvrir les **chemins web accessibles** (`/admin`, `/backup.zip`, `/config.php`…).

### Commande de base
```bash
gobuster dir -u http://cible/ -w /chemin/wordlist.txt
```

### Flags essentiels
| Flag | Usage |
|------|-------|
| `-u` | URL cible (**obligatoire**, avec `http://` ou `https://`) |
| `-w` | Wordlist (**obligatoire**) |
| `-x .php,.txt,.bak` | Chercher aussi des **fichiers** avec ces extensions |
| `-r` | Suivre les redirections (301/302) |
| `-s 200,301` | N’afficher que ces codes HTTP |
| `-b 403,404` | Ignorer ces codes (réduit le bruit) |
| `-k` | Ignorer les erreurs SSL/TLS (utile en CTF) |
| `-t 50` | Nombre de threads (défaut : 10) |
| `-o resultat.txt` | Sauvegarder les résultats |

### Bonnes pratiques
- Commencer avec `common.txt` ou `small.txt`.
- Si tu trouves `/api`, relance un scan **dedié** sur `http://cible/api/`.
- Toujours vérifier manuellement les chemins sensibles dans le navigateur.

> 💡 **Wordlists recommandées** :
> - `/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt`
> - `/usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt`
> - Pour WordPress : `wp-content/plugins/` + wordlist spécialisée

---

## 🌐 3. Mode `dns` – Découverte de Sous-Domaines

### Objectif
Trouver des **sous-domaines** (`dev.site.com`, `staging.site.com`) qui peuvent héberger des services vulnérables.

### Commande de base
```bash
gobuster dns -d site.com -w /chemin/wordlist.txt
```

### Flags essentiels
| Flag | Usage |
|------|-------|
| `-d` | Domaine cible (**obligatoire**) |
| `-w` | Wordlist de sous-domaines (**obligatoire**) |
| `-i` | Afficher les **IP résolues** |
| `-c` | Afficher les **CNAME** (pas compatible avec `-i`) |
| `-r 8.8.8.8` | Utiliser un DNS personnalisé |

### Bonnes pratiques
- Une IP privée (`10.x.x.x`, `192.168.x.x`) dans les résultats = **fuite d’architecture** → très critique.
- Croiser avec `amass`, `subfinder`, ou `crt.sh` pour une reconnaissance complète.
- Scanner chaque sous-domaine trouvé avec `gobuster dir`.

> 💡 **Wordlist recommandée** :
> - `/usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt`
> - `/usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt`
> - `/usr/share/seclists/Discovery/DNS/subdomains-top1million.txt` (complet)

---

## 🏢 4. Mode `vhost` – Énumération de Virtual Hosts

### Objectif
Découvrir des **sites web différents** hébergés sur **la même IP**, mais accessibles uniquement via un **en-tête `Host` spécifique**.

### Différence clé
- `dns` → interroge le **DNS** (existe-t-il un enregistrement ?)
- `vhost` → envoie une requête HTTP avec `Host: xxx.cible.com` → le serveur peut répondre **même si le DNS n’existe pas**.

### Commande typique (cas réel)
```bash
gobuster vhost -u http://10.10.10.10 \
               -w /chemin/wordlist.txt \
               --domain cible.com \
               --append-domain \
               --exclude-length 250-320
```

### Flags essentiels
| Flag | Rôle |
|------|------|
| `-u` | IP ou URL du serveur (**obligatoire**) |
| `-w` | Wordlist (**obligatoire**) |
| `--domain cible.com` | Spécifie le domaine de base |
| `--append-domain` | Transforme `dev` → `dev.cible.com` dans l’en-tête `Host` |
| `--exclude-length X,Y,Z` | Filtre les **faux positifs** (pages d’erreur de même taille) |
| `-r` | Suit les redirections |

### Comment trouver la bonne plage pour `--exclude-length` ?
1. Lance une première fois **sans** `--exclude-length`.
2. Observe les tailles des réponses **404** (ex: toutes font ~279 octets).
3. Relance avec `--exclude-length 279`.

> ✅ **Cas d’usage typique en CTF** :  
> L’IP ne résout aucun nom, mais `gobuster vhost` révèle `secret.cible.thm` → accès à un panel admin.

> 💡 **Wordlists recommandées** :
> - `/usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt`


---

## 🧪 5. Workflow Recommandé en Pentest

1. **Recon passive**  
   → `dnsdumpster`, `crt.sh`, `amass` → liste initiale de sous-domaines.

2. **Brute force actif**  
   ```bash
   gobuster dns -d cible.com -w subdomains-top1million-5000.txt -i
   ```

3. **Pour chaque sous-domaine ou IP trouvée** :  
   ```bash
   gobuster dir -u http://sous.cible.com/ -w common.txt -x .php,.txt -r
   ```

4. **Si tu as seulement une IP (pas de DNS)** :  
   ```bash
   gobuster vhost -u http://IP -w wordlist.txt --domain cible.com --append-domain --exclude-length ...
   ```

5. **Validation manuelle**  
   → Ouvre chaque chemin/sous-domaine dans le navigateur.  
   → Cherche : `.git`, `robots.txt`, `backup`, panels d’admin, erreurs détaillées.

---

## 🛡️ 6. Conseils de Pro (Sécurité & Efficacité)

- **Respecte la cible** : trop de threads (`-t 100`) = risque de DoS.
- **Adapte la wordlist** au contexte (CMS, techno, environnement).
- **Toujours filtrer les faux positifs** (`--exclude-length`, `-b 403,404`).
- En HTTPS avec certificat auto-signé → **ajoute `-k`**.
- En cas de WAF → réduis `-t`, augmente `--delay` (si disponible), change le `User-Agent`.

---

