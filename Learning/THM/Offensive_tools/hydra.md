
# 📚 **Note de Cours : Hydra – Brute Force d’Authentification en Ligne**


## 1. 🔍 **Qu’est-ce que Hydra ?**

**Hydra** (aussi appelé **THC-Hydra**) est un outil open source de **brute force en ligne** développé par le *The Hacker Choice (THC)*. Il permet de **tester la robustesse des identifiants** sur des services réseau ou web en automatisant les tentatives de connexion avec des listes de mots de passe.

> ⚠️ **Important** : Hydra ne fonctionne **qu’en ligne** (live attack). Il interagit directement avec le service cible → il ne peut pas casser des hashs hors ligne (contrairement à `hashcat` ou `john`).

---

## 2. 🎯 **Cas d’usage légitimes**

- **Pentest autorisé** : vérifier si des comptes utilisent des mots de passe faibles.
- **CTF** : récupérer des identifiants sur des machines vulnérables.
- **Vérification post-déploiement** : s’assurer qu’aucun compte n’utilise un mot de passe par défaut (`admin:admin`, `root:password`, etc.).

> ❌ **Jamais utilisé sans autorisation explicite** – illégal et contraire à l’éthique du pentester.

---

## 3. 🌐 **Protocoles pris en charge**

Hydra supporte **50+ protocoles**, notamment :

| Catégorie | Protocoles |
|---------|----------|
| **Réseau** | SSH, Telnet, FTP, RDP, SMB, VNC |
| **Web** | HTTP/HTTPS (GET, POST, formulaires), Proxy |
| **Bases de données** | MySQL, PostgreSQL, MS-SQL, Oracle |
| **Messagerie** | IMAP, POP3, SMTP |
| **Autres** | SNMP, LDAP, Cisco (enable/auth), XMPP |

→ Voir la liste complète avec `hydra -h` ou [GitHub officiel](https://github.com/vanhauser-thc/thc-hydra).

---

## 4. 🛠️ **Syntaxe de base**

```bash
hydra [options] <cible> <protocole>
```

### Options essentielles :
| Option | Description |
|-------|-------------|
| `-l USER` | **Un seul** identifiant |
| `-L FILE` | Fichier contenant **plusieurs identifiants** |
| `-p PASS` | **Un seul** mot de passe |
| `-P FILE` | Fichier de **mots de passe** (ex. : `rockyou.txt`) |
| `-t N` | Nombre de **threads par hôte** (par défaut : 16, mais souvent réduit à 4 pour éviter les dénis de service) |
| `-f` | **Arrêter dès la première réussite** |
| `-V` | Mode **verbeux** (affiche chaque tentative) |
| `-s PORT` | Spécifier un **port non standard** |

---

## 5. 💻 **Exemples concrets**

### ✅ **Attaque SSH**
```bash
hydra -l root -P /usr/share/wordlists/rockyou.txt 10.67.142.78 -t 4 ssh
```
- Cible : `10.67.142.78`
- Identifiant : `root`
- Liste : `rockyou.txt`
- 4 threads pour éviter de surcharger le service

> 💡 Astuce OSCP : toujours tester `root`, `admin`, `user` + mots de passe courants.

---

### ✅ **Attaque formulaire web (POST)**

#### Étapes de reconnaissance :
1. Identifier l’URL du formulaire (ex. : `/login.php`)
2. Identifier les **noms des champs** (via DevTools → Network)
3. Identifier une **chaîne unique dans la réponse en cas d’échec** (ex. : `"Invalid credentials"`)

#### Commande :
```bash
hydra -l admin -P passlist.txt 10.67.142.78 http-post-form "/login.php:username=^USER^&password=^PASS^:F=Invalid" -V
```

- `^USER^` et `^PASS^` sont remplacés automatiquement
- `F=Invalid` → échec si la réponse contient "Invalid"
- `-V` → utile pour debugger

> 🔍 Si le formulaire utilise du **JSON**, du **token CSRF**, ou du **JavaScript pur**, Hydra ne suffit pas → nécessite un script personnalisé (Python + `requests`).

---

## 6. ⚠️ **Limites & contre-mesures**

| Problème | Solution / Contournement |
|--------|------------------------|
| **Blocage après X tentatives** | Réduire `-t`, utiliser `-w` (délai entre tentatives) |
| **CAPTCHA** | Hydra inutilisable → attaque manuelle ou IA |
| **Champs dynamiques (CSRF token)** | Hydra ne gère pas nativement → script Python requis |
| **HTTPS avec certificat auto-signé** | Ajouter `https-post-form` au lieu de `http-post-form` |
| **Mauvaise chaîne d’échec (`F=`)** | Tester manuellement → observer la réponse exacte |

---

