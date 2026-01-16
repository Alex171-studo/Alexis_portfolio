# SIEM

## 🔍 **Comprendre en profondeur le SIEM : du chaos logistique à la vision centralisée**

### 🧩 **1. Introduction : Pourquoi le SIEM est-il le cœur battant d’un SOC ?**

Dans un environnement informatique moderne — qu’il s’agisse d’une entreprise, d’un datacenter ou même d’un laboratoire de cybersécurité comme Exegol — **des milliers d’événements se produisent chaque seconde** :
- Un utilisateur se connecte.
- Un script s’exécute.
- Une requête HTTP est envoyée.
- Un paquet réseau traverse un pare-feu.

Chacun de ces événements laisse une **trace** : un **log**.  
Mais sans outil centralisé, ces logs sont **dispersés, hétérogènes, silotés** — comme des pièces d’un puzzle éparpillées dans 50 pièces différentes.

> 💡 **Le SIEM (Security Information and Event Management)** est l’outil qui **rassemble, structure, corréle et alerte** à partir de ces logs. Il transforme le **bruit** en **signal**.

---

## 📦 **2. Les sources de logs : deux mondes complémentaires**

Les logs proviennent de **deux grandes familles** de dispositifs :

---

### 🔹 **A. Host-Centric Log Sources (logs liés à l’hôte)**

Ces logs décrivent **ce qui se passe à l’intérieur d’un système** (Windows, Linux, serveur, etc.).

#### ✅ Exemples concrets :
| Événement | Log Windows (Event ID) | Log Linux (fichier) |
|----------|------------------------|---------------------|
| Authentification réussie | `EventID 4624` | `/var/log/auth.log` → `Accepted password for alexis from 192.168.1.10` |
| Tentative de connexion échouée | `EventID 4625` | `/var/log/secure` → `Failed password for root` |
| Exécution d’un processus | `EventID 4688` | `auditd` ou `syslog` → `exe="/usr/bin/bash"` |
| Modification de la base de registre | `EventID 4657` | N/A (spécifique à Windows) |
| Suppression des logs | `EventID 104` | `journalctl --vacuum-time=1s` (efface les journaux systemd) |

> 🛠️ **Pourquoi c’est critique ?**  
> Un attaquant qui exécute `whoami`, `net user`, ou `mimikatz.exe` laisse des traces **host-centric**. Sans ces logs, vous ne verrez jamais l’escalade de privilèges.

---

### 🔹 **B. Network-Centric Log Sources (logs liés au réseau)**

Ces logs décrivent **la communication entre systèmes**.

#### ✅ Exemples concrets :
| Événement | Dispositif source | Exemple de log |
|----------|------------------|----------------|
| Connexion SSH | Pare-feu / IDS | `SSH connection from 203.0.113.45 to 10.0.0.10:22` |
| Accès web malveillant | Proxy / WAF | `GET /wp-admin/setup-config.php?step=1` |
| Transfert de fichier via FTP | Serveur FTP | `USER anonymous → RETR secret.zip` |
| Accès VPN | Gateway VPN | `User 'jdoe' connected via IP 89.234.12.56` |
| Partage de fichiers SMB | Contrôleur de domaine | `SMB2 Create Request for \\server\confidential\report.docx` |

> 🌐 **Cas réel :**  
> Si un attaquant utilise **Cobalt Strike** pour exfiltrer des données via HTTPS, vous verrez :
> - Un **host log** : `powershell.exe` lance un script encodé.
> - Un **network log** : connexion sortante vers `malicious-domain[.]com:443`.
> Seul le **SIEM** peut relier ces deux événements.

---

## ⚠️ **3. Le chaos sans SIEM : 5 problèmes critiques**

### ❌ Problème 1 : **Trop de sources, trop de volume**
- Un petit réseau de 50 machines génère **+100 000 logs/minute**.
- Un analyste ne peut pas ouvrir 50 sessions SSH/RDP simultanément.

### ❌ Problème 2 : **Pas de centralisation**
- Logs Windows → Event Viewer
- Logs Linux → `/var/log/`
- Logs pare-feu → interface web du firewall
- **Temps perdu = risque accru**

### ❌ Problème 3 : **Manque de contexte**
> 🎯 **Exemple d’attaque par mouvement latéral :**
> - Machine A : `EventID 4624` → connexion normale.
> - Machine B : `EventID 4624` → même utilisateur, mais venant de Machine A.
> - Machine C : `EventID 4688` → `mimikatz.exe` lancé.
>
> **Individuellement : rien de suspect.**  
> **Corrélés : compromission complète.**

### ❌ Problème 4 : **Analyse manuelle impossible**
- L’humain traite ~50 logs/minute.  
- Le réseau en produit 10 000/minute.  
→ **99,5 % des menaces passent inaperçues.**

### ❌ Problème 5 : **Formats incompatibles**
- Windows : XML structuré avec `EventID`, `Computer`, `User`.
- Linux : texte brut non structuré.
- Pare-feu Cisco : format propriétaire.
- Apache : format CLF (Common Log Format).
> 🔄 Sans normalisation, impossible de faire des requêtes globales.

---

## 🛡️ **4. Le SIEM : la solution intégrée**

### ✅ Fonction 1 : **Collecte centralisée**
- **Agents légers** (ex: Splunk Universal Forwarder, Wazuh Agent) installés sur chaque hôte.
- **Protocoles standards** : Syslog (UDP/TCP 514), API REST, SNMP.
- **Résultat** : tous les logs arrivent dans **une seule plateforme**.

> 📥 **Exemple d’ingestion dans Splunk :**
> ```bash
> # Sur Linux, on configure rsyslog pour envoyer à Splunk
> *.* @@splunk-server:514
> ```
> → Tous les logs de `/var/log/` partent automatiquement.

---

### ✅ Fonction 2 : **Normalisation (Parsing + Normalization)**
Le SIEM **transforme** les logs bruts en **champs structurés**.

#### Avant (log Apache brut) :
```
192.168.21.200 - - [21/Mar/2022:10:17:10 -0300] "GET /cgi-bin/try/ HTTP/1.0" 200 3395
```

#### Après (normalisé dans Splunk) :
| Champ | Valeur |
|------|--------|
| `src_ip` | `192.168.21.200` |
| `method` | `GET` |
| `uri` | `/cgi-bin/try/` |
| `status` | `200` |
| `bytes` | `3395` |

> 🔍 **Avantage** : vous pouvez maintenant faire :
> ```spl
> index=web_logs status=200 uri="*/cgi-bin/*"
> ```
> → Détectez les accès à des scripts CGI vulnérables.

---

### ✅ Fonction 3 : **Corrélation temporelle et logique**
Le SIEM applique des **règles de détection** (detection rules) basées sur **plusieurs logs**.

#### 📜 Règle SIEM : **Détection de vidage de logs**
```yaml
Rule Name: "Suspicious Log Clearing"
Condition:
  - Log source = "Windows"
  - EventID = 104
  - User != "SYSTEM"
Action: Trigger Alert
```

#### 📜 Règle SIEM : **Exécution de commandes post-exploitation**
```yaml
Rule Name: "Post-Exploitation Command Detected"
Condition:
  - EventID = 4688
  - NewProcessName IN ("whoami.exe", "ipconfig.exe", "net.exe", "tasklist.exe")
  - ParentProcess = "powershell.exe" OR "cmd.exe"
  - NOT User IN ("admin", "svc_backup")
Action: Trigger High Severity Alert
```

> 🕵️‍♂️ **Cas réel TryHackMe** :  
> Dans un CTF, un attaquant exécute `certutil.exe -decode payload.b64 malware.exe`.  
> Une règle SIEM bien conçue détecte `certutil` utilisé pour du décodage → **alerte immédiate**.

---

### ✅ Fonction 4 : **Alerting en temps réel**
- Les règles tournent **en continu**.
- Dès qu’un pattern est détecté → **alerte générée**.
- Intégration possible avec **Slack, email, Jira, SOAR**.

> 🚨 **Exemple d’alerte dans Splunk ES (Enterprise Security)** :
> ```
> [ALERT] Multiple Failed Logins Followed by Success
> User: jsmith
> Source IP: 91.234.56.78
> Target Host: DC01.corp.local
> Timeline:
>   - 10:01:02 → Failed login (EventID 4625)
>   - 10:01:05 → Failed login
>   - 10:01:08 → Failed login
>   - 10:01:12 → SUCCESS (EventID 4624)
> ```

---

### ✅ Fonction 5 : **Tableaux de bord (Dashboards)**
Les dashboards offrent une **vision synthétique** :

| Widget | Utilité |
|-------|--------|
| Top 10 IPs bloquées | Identifier les scanners |
| Évolution des alertes/jour | Mesurer l’activité malveillante |
| Failed logins par utilisateur | Repérer les comptes ciblés |
| Volume de données sortantes | Détecter l’exfiltration |

> 📊 **Splunk Dashboard example** :
> ![Dashboard fictif : graphiques en temps réel, cartes géographiques, listes d’alertes]

---

## 📥 **5. Ingestion des logs : comment les amener dans le SIEM ?**

| Méthode | Description | Cas d’usage |
|--------|-------------|-------------|
| **Agent** | Logiciel installé sur l’hôte (ex: Wazuh, Splunk UF) | Endpoints Windows/Linux |
| **Syslog** | Protocole standard UDP/TCP | Pare-feu, routeurs, serveurs |
| **API** | Intégration via REST (ex: CrowdStrike, Okta) | Solutions cloud/SaaS |
| **Port listening** | SIEM écoute sur un port (ex: 5140) | Applications personnalisées |
| **Upload manuel** | Fichiers CSV/JSON importés | Analyse forensique post-incident |

> 🐧 **Exemple Linux : ingestion de `/var/log/auth.log` via rsyslog**
> ```bash
> # /etc/rsyslog.d/50-splunk.conf
> $ModLoad imfile
> $InputFileName /var/log/auth.log
> $InputFileTag auth:
> $InputFileStateFile stat-auth
> $InputFileSeverity info
> $InputFileFacility auth
> $InputRunFileMonitor
> *.* @@splunk-server:514
> ```

---

## 🔎 **6. Analyse des alertes : du signal à la décision**

### Étapes typiques d’un analyste SOC :
1. **Recevoir l’alerte** (via dashboard ou notification).
2. **Vérifier la règle** : quels champs ont déclenché ?
3. **Enquêter** :
   - Qui ? (`user`, `src_ip`)
   - Quoi ? (`process`, `url`)
   - Quand ? (`timestamp`)
   - Où ? (`host`, `destination`)
4. **Classer** :
   - **Faux positif** → affiner la règle.
   - **Vrai positif** → containment, eradication, reporting.

> 🛑 **Réponse à un vrai positif** :
> - Isoler la machine (via VLAN, EDR, ou switch ACL).
> - Bloquer l’IP malveillante au pare-feu.
> - Réinitialiser les mots de passe de l’utilisateur.
> - Documenter l’incident (IR report).

---

## 🧠 **Conclusion : Le SIEM, cerveau du SOC**

Le SIEM n’est **pas juste un agrégateur de logs**.  
C’est un **système cognitif** qui :
- **Voit tout** (centralisation),
- **Comprend tout** (normalisation),
- **Relie tout** (corrélation),
- **Agit vite** (alerting),
- **Apprend** (amélioration continue des règles).
