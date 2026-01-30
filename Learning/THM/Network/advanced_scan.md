# Advanced Nmap Scan



## 1. FONDAMENTAUX : LA PILE TCP/IP COMME VECTEUR D'INFORMATION

### 1.1 Le Modèle de Référence
Nmap opère principalement aux couches **Internet (IP)** et **Transport (TCP/UDP)**. L'analyse repose sur l'exploitation des implémentations de la RFC 793 (TCP).

### 1.2 Le "Three-Way Handshake" et les Flags
La communication TCP est régie par des drapeaux (Flags) dans l'en-tête du segment :
1.  **SYN (Synchronize)** : Demande de connexion.
2.  **ACK (Acknowledgment)** : Accusé de réception.
3.  **RST (Reset)** : Interruption immédiate/Refus de connexion.
4.  **FIN (Finish)** : Fin de transmission.
5.  **PSH (Push)** / **URG (Urgent)** : Gestion du flux de données.

**Logique de réponse standard :**
*   **Port Ouvert :** Répond par `SYN/ACK`.
*   **Port Fermé :** Répond par `RST` (généré par la pile réseau de l'hôte).
*   **Port Filtré :** Aucune réponse (DROP par le firewall) ou message ICMP *Destination Unreachable*.

---

## 2. TAXONOMIE DES SCANS TCP

### 2.1 TCP SYN Scan (`-sS`) - Le standard "Half-Open"
C'est le scan par défaut. Nmap envoie un `SYN` et attend.
*   S'il reçoit `SYN/ACK`, le port est ouvert. Nmap envoie alors immédiatement un `RST` pour ne pas établir la connexion (discrétion relative).
*   **Avantages :** Rapide, ne crée pas de session applicative (évite certains logs applicatifs).

### 2.2 TCP Connect Scan (`-sT`)
Utilise l'appel système `connect()` du système d'exploitation. La connexion est totalement établie (`SYN` -> `SYN/ACK` -> `ACK`).
*   **Usage :** Utilisé quand l'utilisateur n'a pas les privilèges `raw socket` (non-root).
*   **Inconvénient :** Très bruyant, facilement logué par les services cibles.

### 2.3 TCP ACK Scan (`-sA`)
Ici, on n'envoie qu'un flag `ACK`. 
*   **Finalité :** Ce scan ne détermine pas si un port est ouvert. Il sert à cartographier les règles de firewall.
*   **Interprétation :** 
    *   Réponse `RST` : Le port est `unfiltered` (le paquet a traversé le firewall).
    *   Pas de réponse : Le port est `filtered`.

---

## 3. SCANS "STEALTH" ET EXPLOITATION DE LA RFC 793

Ces scans envoient des combinaisons de flags illogiques pour observer comment la cible réagit. Selon la RFC 793, un port fermé **doit** répondre par un `RST`, tandis qu'un port ouvert doit ignorer un paquet ne contenant pas SYN, RST ou ACK.

| Type de Scan | Option | Flags activés | Comportement Port Ouvert |
| :--- | :--- | :--- | :--- |
| **NULL Scan** | `-sN` | Aucun | Pas de réponse |
| **FIN Scan** | `-sF` | FIN | Pas de réponse |
| **Xmas Scan** | `-sX` | FIN, PSH, URG | Pas de réponse |

**Note critique :** Ces techniques sont inefficaces contre les systèmes Microsoft Windows, qui ne respectent pas strictement cette partie de la RFC et répondent par un `RST` même si le port est ouvert.

---

## 4. TECHNIQUES D'ÉVASION ET DE DISSIMULATION

### 4.1 Fragmentation IP (`-f`, `-ff`)
Nmap divise les en-têtes TCP en plusieurs fragments IP.
*   **Objectif :** Empêcher les IDS/Firewalls "stateless" d'analyser les flags TCP, car l'en-tête complet n'est reconstitué que sur l'hôte final.

### 4.2 Decoy Scan (`-D`)
Envoie des scans provenant de plusieurs adresses IP usurpées en plus de la vôtre.
*   **Syntaxe :** `nmap -D decoy1,decoy2,ME,decoy3 cible`
*   **Effet :** L'administrateur réseau voit 10 attaques simultanées et ne peut pas facilement identifier la source réelle.

### 4.3 Idle Scan (`-sI`) - L'attaque Zombie
La technique la plus anonyme. Elle utilise un hôte tiers (le "Zombie") pour scanner la cible.
1.  On vérifie l'**IP ID** (identifiant de fragment IP) du Zombie.
2.  On envoie un paquet `SYN` à la cible en usurpant l'IP du Zombie.
3.  Si le port de la cible est ouvert, elle envoie un `SYN/ACK` au Zombie.
4.  Le Zombie, surpris, répond par un `RST` à la cible, ce qui incrémente son propre IP ID.
5.  On ré-interroge le Zombie : si son IP ID a augmenté de 2, le port de la cible est ouvert.

---

## 5. ANALYSE DES RÉSULTATS ET DIAGNOSTIC AVANCÉ

Pour comprendre réellement ce qui se passe, l'utilisation de flags de verbosité et de diagnostic est impérative :

*   `--reason` : Affiche explicitement le paquet reçu qui a conduit Nmap à sa conclusion (ex: "syn-ack", "no-response", "admin-prohibited").
*   `--packet-trace` : Affiche en temps réel chaque paquet envoyé et reçu par Nmap.
*   `-vv` : Niveau de verbosité 2, essentiel pour suivre la progression.
*   `-T[0-5]` : Profils de temporisation (0 = paranoïaque/lent, 5 = agressif/rapide).

---

## 6. SYNTHÈSE MÉTHODOLOGIQUE

1.  **Reconnaissance passive** (DNS, WHOIS).
2.  **Découverte d'hôtes** (`-sn`) : Qui est en ligne ?
3.  **Scan de ports discret** (`-sS`) : Quels services sont exposés ?
4.  **Analyse de filtrage** (`-sA`, `-f`) : Y a-t-il un firewall ?
5.  **Versionnage et OS Fingerprinting** (`-sV`, `-O`) : Quelles sont les versions précises ?
6.  **Scripting (NSE)** (`--script`) : Automatisation de la détection de vulnérabilités.

> **Règle d'or :** La connaissance du protocole TCP/IP est la seule limite à l'efficacité de l'utilisation de Nmap. Un scan n'est jamais une certitude, c'est une déduction basée sur une réponse réseau.
