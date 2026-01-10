# 💀 [METASPLOIT FRAMEWORK] - HANDBOOK 💀

> Un guide complet sur les concepts fondamentaux, l'exploitation et la post-exploitation avec le MSF.

---

## ☣️ Concepts Fondamentaux

| Terme | Définition | Analogie |
| :--- | :--- | :--- |
| **Vulnérabilité** | Défaut logiciel ou configuration (bug, faille). | Une serrure cassée 🔓 |
| **Exploit** | Code profitant de la vulnérabilité pour entrer. | La clé qui ouvre la serrure 🔑 |
| **Payload** | Code exécuté après l'intrusion (Reverse Shell, etc.). | Ce qu'on fait à l'intérieur 📂 |

---

## 🧩 Architecture des Modules

Metasploit est structuré en modules spécialisés :

*   `auxiliary/` : Scans, énumération, fuzzing, brute-force.
*   `exploits/` : Code d'exploitation ciblant une vulnérabilité.
*   `payloads/` : Shells, Meterpreter, injection de DLL.
*   `encoders/` : Obscurcissement pour bypasser les signatures AV.
*   `evasion/` : Techniques avancées anti-Défense.
*   `nops/` : Instructions de remplissage pour l'alignement mémoire.
*   `post/` : Collecte de données, persistance, pivot.

---

## 🎯 Stratégie des Payloads : Singles vs Staged

Il est crucial de distinguer la structure du payload pour réussir l'exploitation.

### 1. Singles (Inline) `_`
*   **Format** : `windows/x64/shell_reverse_tcp`
*   **Concept** : Tout-en-un. Le code complet est envoyé d'un coup.
*   **Usage** : Idéal pour les vulnérabilités avec un buffer large.

### 2. Staged `/`
*   **Format** : `windows/x64/shell/reverse_tcp`
*   **Concept** : Divisé en deux. Un **Stager** (petit) appelle un **Stage** (gros).
*   **Usage** : Indispensable quand l'espace mémoire est restreint.

---

## 🖥️ Maîtrise de `msfconsole`

### 🛠️ Workflow de Base
```bash
msf6 > search [vuln_name/cve]          # Trouver le module
msf6 > use [index/path]                # Charger le module
msf6 exploit(...) > show options       # Lister les variables
msf6 exploit(...) > set RHOSTS [IP]    # Configurer la cible
msf6 exploit(...) > set LHOST [IP]     # Configurer l'attaquant
msf6 exploit(...) > exploit -z         # Lancer en arrière-plan
```

### 💡 Astuces Pro
*   `setg` : Définit une variable **globale** (persiste entre les modules).
*   `info` : Affiche les détails complets (CVE, auteur, fiabilité).
*   `check` : Vérifie si la cible est vulnérable sans lancer l'exploit.

---

## ⚡ Étude de Cas : MS17-010 (EternalBlue)

Focus sur la faille SMBv1 exploitée par WannaCry.

### Modules Utiles
| Module Path | Type | Rôle |
| :--- | :--- | :--- |
| `auxiliary/scanner/smb/smb_ms17_010` | Scanner | Vérifie la vulnérabilité 🔍 |
| `exploit/windows/smb/ms17_010_eternalblue` | Exploit | Buffer Overflow (RCE) 💥 |
| `exploit/windows/smb/ms17_010_psexec` | Exploit | EternalRomance/Synergy (Stable) 🛠️ |

### CVE Associées
*   **RCE** : CVE-2017-0143, 0144, 0145, 0146, 0148.
*   **Info Leak** : CVE-2017-0147 (Bypass ASLR).

---

## 🔄 Gestion des Sessions

Une fois l'accès obtenu, on gère les sessions actives.

| Commande | Action |
| :--- | :--- |
| `sessions` | Lister toutes les sessions actives. |
| `sessions -i <ID>` | Interagir avec une session spécifique. |
| `background` | Mettre la session actuelle en pause (Ctrl+Z). |
| `sessions -k <ID>` | Tuer une session. |

### 🚨 Meterpreter vs Shell
*   **Shell (`C:\>`)** : Basique, limité aux commandes OS.
*   **Meterpreter (`meterpreter >`)** : Agent puissant en mémoire (In-memory execution, Keylogging, Dump de hashes, Pivot réseau).

---
*Generated for Metasploit Mastery* 💀
