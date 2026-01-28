# Reconnaissance Passive

La reconnaissance passive consiste à collecter des informations sur une cible sans jamais interagir directement avec ses systèmes. Cette approche permet de rester discret tout en obtenant une quantité massive de données techniques via des sources publiques.

## Outils et Services Clés

*   **Services Web** : 
    *   **DNSDumpster** : Outil de recherche DNS permettant de cartographier les sous-domaines.
    *   **Shodan.io** : Moteur de recherche pour les appareils connectés à Internet (IoT, serveurs, services exposés).
*   **Outils CLI** : Utilisation de protocoles standards pour interroger les bases de données d'enregistrement et les serveurs DNS.

## Commandes Essentielles

| Objectif | Exemple de Commande |
| :--- | :--- |
| Consulter les informations d'enregistrement (WHOIS) | `whois tryhackme.com` |
| Rechercher les enregistrements DNS de type **A** | `nslookup -type=A tryhackme.com` |
| Rechercher les enregistrements **MX** via un serveur spécifique | `nslookup -type=MX tryhackme.com 1.1.1.1` |
| Rechercher les enregistrements DNS de type **TXT** | `nslookup -type=TXT tryhackme.com` |
| Rechercher les enregistrements **A** (via dig) | `dig tryhackme.com A` |
| Rechercher les enregistrements **MX** via un serveur (via dig) | `dig @1.1.1.1 tryhackme.com MX` |
| Rechercher les enregistrements **TXT** (via dig) | `dig tryhackme.com TXT` |

## Points à Retenir
L'efficacité de la reconnaissance passive repose sur la maîtrise des options de recherche et l'analyse minutieuse des résultats obtenus. Elle constitue la première étape cruciale de toute phase d'audit pour identifier la surface d'attaque sans alerter la cible.
