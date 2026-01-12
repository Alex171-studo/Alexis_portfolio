# Guide Complet : Maîtriser tcpdump

`tcpdump` est l'outil en ligne de commande de référence pour l'analyse de trafic réseau. Basé sur la bibliothèque `libpcap`, il permet de capturer et d'analyser les paquets circulant sur une interface réseau.

## 1. Utilisation de Base

### Gestion des Interfaces
*   `tcpdump -i <interface>` : Écouter sur une interface spécifique (ex: `eth0`).
*   `tcpdump -i any` : Capturer sur toutes les interfaces actives.
*   `tcpdump -D` : Lister les interfaces disponibles.

### Lecture et Écriture
*   `tcpdump -w capture.pcap` : Enregistrer les paquets dans un fichier au format binaire (lisible par Wireshark).
*   `tcpdump -r capture.pcap` : Lire et analyser un fichier de capture existant.

### Contrôle du Flux
*   `tcpdump -c <nombre>` : S'arrêter après avoir capturé un nombre spécifique de paquets.

## 2. Options d'Affichage et de Résolution

*   `-n` : Ne pas résoudre les adresses IP en noms de domaine (gain de performance).
*   `-nn` : Ne pas résoudre les adresses IP ni les numéros de ports (ex: affiche `80` au lieu de `http`).
*   `-v`, `-vv`, `-vvv` : Augmenter progressivement le niveau de détail des paquets.
*   `-q` : Mode "quiet" (affichage minimaliste).

## 3. Filtrage Standard

### Par Hôte et Direction
*   `tcpdump host 192.168.1.1` : Trafic entrant ou sortant pour cette IP.
*   `tcpdump src 192.168.1.1` : Uniquement le trafic provenant de cette source.
*   `tcpdump dst 192.168.1.1` : Uniquement le trafic vers cette destination.

### Par Port et Protocole
*   `tcpdump port 80` : Filtrer le trafic sur un port spécifique.
*   `tcpdump src port 80` : Port source uniquement.
*   `tcpdump portrange 1-1024` : Filtrer sur une plage de ports.
*   `tcpdump icmp` : Filtrer par protocole (tcp, udp, icmp, arp, etc.).

## 4. Filtrage Avancé et Opérateurs Logiques

Il est possible de combiner les filtres pour plus de précision :
*   `and` (`&&`) : Les deux conditions doivent être vraies.
*   `or` (`||`) : Au moins une condition doit être vraie.
*   `not` (`!`) : Inverse la condition.

**Exemple :** `tcpdump src 192.168.1.1 and port 80`

### Filtrage par Taille
*   `tcpdump greater <length>` : Paquets plus grands que X octets.
*   `tcpdump less <length>` : Paquets plus petits que X octets.

## 5. Analyse des En-têtes (Header Filtering)

La syntaxe `proto[expr:size]` permet d'inspecter des octets spécifiques dans l'en-tête d'un protocole.
*   **proto** : Le protocole (ip, tcp, udp, icmp, etc.).
*   **expr** : L'offset (décalage) depuis le début de l'en-tête.
*   **size** : Le nombre d'octets à lire (1 par défaut).

### Focus sur les Flags TCP
Les flags TCP se situent à l'**offset 13** de l'en-tête TCP.

| Bit | Flag | Valeur Décimale |
| :--- | :--- | :--- |
| 0 | CWR | 128 |
| 1 | ECE | 64 |
| 2 | URG | 32 |
| 3 | ACK | 16 |
| 4 | PSH | 8 |
| 5 | RST | 4 |
| 6 | SYN | 2 |
| 7 | FIN | 1 |

#### Exemples de masquage binaire :
1.  **Détecter tous les paquets avec le flag SYN activé :**
    `tcpdump "tcp[tcpflags] & tcp-syn != 0"`
    *Utilise l'opérateur ET (`&`) pour isoler le bit SYN. Si le résultat n'est pas 0, le flag est présent.*

2.  **Capturer le Handshake TCP (SYN ou ACK) :**
    `tcpdump "tcp[tcpflags] & (tcp-syn|tcp-ack) != 0"`
    *Ici, on crée un masque (18 en décimal) pour vérifier si l'un des deux bits est à 1.*

## 6. Inspection du Contenu des Paquets

*   `-e` : Afficher les en-têtes de la couche liaison (adresses MAC).
*   `-A` : Afficher le contenu en ASCII (utile pour HTTP, SMTP).
*   `-x` : Afficher en hexadécimal.
*   `-X` : Afficher en hexadécimal **et** ASCII côte à côte.
