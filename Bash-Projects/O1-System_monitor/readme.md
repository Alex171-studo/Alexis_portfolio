# System Monitor - Script Bash

Un script Bash simple pour monitorer l'état d'un système Linux.  
Il fournit des informations sur :

- CPU, RAM et Swap
- Utilisation du disque
- Top 5 des processus consommateurs CPU
- État des services critiques
- Les 5 dernières lignes du syslog

## Prérequis

- Linux avec Bash
- `top`, `free`, `df`, `ps`, `systemctl` installés
- Accès à `/var/log/syslog` pour lire les logs

## Utilisation

Rendre le script exécutable :

```bash
chmod +x system_monitor.sh
```

Exécuter

```bash
./system_monitot.sh
```
