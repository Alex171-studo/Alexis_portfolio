# Cours Nmap : Maîtriser le Network Mapper

Nmap est l'outil de référence pour l'exploration réseau et l'audit de sécurité. Il permet d'identifier les hôtes actifs, les ports ouverts et les services en cours d'exécution.

## 1. Découverte d'Hôtes (Host Discovery)

Avant de scanner les ports, on cherche souvent à savoir quelles machines sont en ligne.

*   **`-sn` (Ping Scan)** : Désactive le scan de ports. Utile pour lister les machines actives sur un réseau.
    ```bash
    nmap -sn 192.168.1.0/24
    ```
*   **`-Pn`** : Force le scan même si l'hôte ne répond pas au ping (utile contre les pare-feu).

## 2. Techniques de Scan de Ports

*   **`-sS` (TCP SYN Scan)** : Le scan par défaut (furtif). Il n'établit pas de connexion complète.
*   **`-sT` (TCP Connect Scan)** : Établit une connexion TCP complète. Plus lent et plus facilement détectable.
*   **`-sU` (UDP Scan)** : Utilisé pour les services comme DNS, DHCP ou SNMP.
*   **`-sL` (List Scan)** : Liste simplement les cibles sans envoyer de paquets.
*   **`-F` (Fast Scan)** : Scan rapide limité aux 100 ports les plus fréquents.

### Sélection des ports
*   **`-p [port]`** : Scan d'un port spécifique (ex: `-p 80`).
*   **`-p [range]`** : Plage de ports (ex: `-p 1-1024`).
*   **`-p-`** : Scan de l'intégralité des 65535 ports.

## 3. Détection de Services et OS

*   **`-sV`** : Détecte la version des services tournant sur les ports ouverts.
*   **`-O`** : Tente d'identifier le système d'exploitation (OS Detection).
*   **`-A` (Aggressive Scan)** : Combine la détection d'OS, de version, le scan de scripts (NSE) et le traceroute.

## 4. Optimisation et Performance

Le paramètre **`-T[0-5]`** règle l'agressivité temporelle du scan :

| Niveau | Nom | Usage |
| :--- | :--- | :--- |
| **T0 / T1** | Paranoid / Sneaky | Contournement d'IDS / Discrétion maximale |
| **T2** | Polite | Réduction de la bande passante |
| **T3** | Normal | Mode par défaut |
| **T4** | Aggressive | Recommandé pour les réseaux rapides et fiables |
| **T5** | Insane | Très rapide, peut sacrifier la précision |

### Contrôle fin du débit
*   `--min-rate` / `--max-rate` : Nombre de paquets par seconde.
*   `--min-parallelism` : Nombre minimum de requêtes simultanées.

## 5. Formats de Sortie (Output)

Il est crucial de sauvegarder les résultats pour une analyse ultérieure.

*   **`-v`** : Mode verbeux (affiche les résultats au fur et à mesure).
*   **`-oN [file]`** : Sortie normale (format texte).
*   **`-oX [file]`** : Sortie XML (pour intégration dans d'autres outils).
*   **`-oG [file]`** : Sortie "Grepable" (facile à manipuler avec `grep` ou `awk`).
*   **`-oA [basename]`** : Génère les trois formats précédents simultanément.

---

## Synthèse des Commandes

| Option | Description |
| :--- | :--- |
| `-sn` | Scan Ping (découverte d'hôtes) |
| `-sS` | Scan SYN (furtif) |
| `-sV` | Détection de version des services |
| `-O` | Détection du système d'exploitation |
| `-p-` | Scan de tous les ports |
| `-A` | Scan complet (OS, Version, Scripts) |
| `-Pn` | Ignore la découverte d'hôte (considère l'hôte comme actif) |
