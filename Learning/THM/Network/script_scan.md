# Script Scan de Nmap


## 2. Architecture Réseau : Ports & États
Un port est une porte logique (0-65535). Nmap définit trois états principaux :
*   **Open** : Un service accepte les connexions.
*   **Closed** : Le port est accessible mais aucun service n'écoute.
*   **Filtered** : Un pare-feu bloque l'accès ou empêche Nmap de déterminer l'état.

---
## 3. Techniques de Scan Fondamentales

### 3.1 Le Scan Furtif (SYN Scan) : `-sS`
C'est le standard industriel. Il ne termine pas la poignée de main TCP (*3-way handshake*), ce qui le rend plus discret et rapide.
*   **Privilèges :** Requis (root/sudo).
*   **Commande :** `sudo nmap -sS <IP>`

### 3.2 Détection de Services & Versions : `-sV`
Indispensable pour identifier les vulnérabilités liées à des versions spécifiques.
*   **Fonctionnement :** Interroge les bannières et analyse les réponses protocolaires.
*   **Intensité :** `--version-intensity <0-9>` (Défaut: 7).

### 3.3 Identification de l'OS : `-O`
Nmap analyse les subtilités de la pile TCP/IP pour deviner le système d'exploitation.
*   **Condition :** Nécessite au moins un port ouvert et un port fermé pour être précis.

---

## 4. Nmap Scripting Engine (NSE)
Le NSE automatise des tâches complexes via des scripts **Lua**.

### Catégories majeures :
| Catégorie | Description |
| :--- | :--- |
| `default` (`-sC`) | Scripts sûrs et essentiels. |
| `vuln` | Recherche de vulnérabilités connues (CVE). |
| `auth` | Teste les mécanismes d'authentification. |
| `brute` | Tentatives de force brute. |
| `exploit` | Tente d'exploiter une faille. |

**Usage :**
```bash
nmap --script "http-*" <IP>          # Tous les scripts commençant par http
nmap --script vuln <IP>              # Recherche de vulnérabilités
```

---

## 5. Optimisation & Sorties

### 5.1 Le Scan "Agressif" : `-A`
Combine quatre options en une seule commande pour un gain de temps :
*   `-sV` (Versions)
*   `-O` (OS)
*   `-sC` (Scripts par défaut)
*   `--traceroute`

### 5.2 Gestion des Flux (Output)
Le stockage des preuves est crucial en audit professionnel.
*   `-oN` : Format normal (lisible).
*   `-oX` : Format XML (pour importation dans Metasploit/Zenmap).
*   `-oG` : Format "Grepable" (pour manipulation en ligne de commande).
*   **`-oA <nom>`** : Génère les trois formats simultanément (**Recommandé**).

---

## 6. Synthèse des Commandes Essentielles

| Commande | Objectif |
| :--- | :--- |
| `nmap -sn <cible>` | **Ping Sweep** : Découverte d'hôtes sans scanner les ports. |
| `nmap -p- <cible>` | Scan de l'intégralité des **65535 ports**. |
| `nmap -T4 <cible>` | Accélère le scan (Timing template de 0 à 5). |
| `nmap -Pn <cible>` | Désactive le ping (Utile si l'hôte bloque l'ICMP). |

### 🏆 Le "Golden Scan" (Professionnel) :
```bash
sudo nmap -sS -sV -sC -O -p- -oA full_report <IP>
```
*Analyse furtive, versions, scripts par défaut, OS, sur tous les ports, avec sauvegarde complète.*

---
