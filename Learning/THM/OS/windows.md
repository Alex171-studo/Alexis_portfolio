# Fiche de Révision : Commandes Windows (CMD)

## 1. Informations Système
*   `ver` : Affiche la version actuelle du système d'exploitation.
*   `systeminfo` : Fournit des informations détaillées sur la configuration du système (processeur, mémoire, BIOS, correctifs, etc.).

## 2. Réseau
*   `ipconfig` : Affiche la configuration réseau (adresses IP, DNS, passerelle).
*   `tracert <destination>` : Trace l'itinéraire des paquets vers une destination.
*   `netstat` : Affiche les statistiques de protocole et les connexions réseau actuelles.
    *   `-a` : Affiche toutes les connexions et les ports d'écoute.
    *   `-n` : Affiche les adresses et les numéros de port sous forme numérique.
    *   `-o` : Affiche le PID (Identifiant de Processus) associé à chaque connexion.
    *   `-p <proto>` : Filtre par protocole (TCP, UDP, etc.).
    *   `-b` : Affiche l'exécutable impliqué dans la création de chaque connexion.

## 3. Gestion des Fichiers et Dossiers
*   `dir` : Liste les fichiers et dossiers du répertoire actuel.
    *   `/a` : Affiche tous les fichiers (y compris cachés).
    *   `/s` : Affiche les fichiers dans le répertoire spécifié et tous ses sous-répertoires.
*   `type <fichier>` : Affiche le contenu textuel d'un fichier.
*   `copy <source> <destination>` : Copie un ou plusieurs fichiers.
*   `move <source> <destination>` : Déplace ou renomme des fichiers/dossiers.
*   `del <fichier>` : Supprime un ou plusieurs fichiers.

## 4. Tâches et Processus
*   `tasklist` : Liste tous les processus en cours d'exécution.
    *   `/FI "imagename eq <nom>"` : Filtre la liste pour afficher un processus spécifique.
*   `taskkill` : Termine un processus.
    *   `/f` : Force la fermeture du processus.
    *   `/im <nom>` : Tue le processus par son nom d'image.
    *   `/PID <n°>` : Tue le processus par son identifiant numérique (PID).

## 5. Utilitaires Divers
*   `net user` : Affiche la liste des comptes utilisateurs de la machine.
*   `chkdsk` : Vérifie l'intégrité du système de fichiers sur un disque.
*   `driverquery` : Répertorie tous les pilotes installés et leurs propriétés.
*   `sfc /scannow` : Analyse et répare les fichiers système Windows corrompus.
*   `shutdown` : Permet d'éteindre ou redémarrer l'ordinateur.
    *   `/s` : Arrête le système.
    *   `/r` : Redémarre le système.
    *   `/t <secondes>` : Définit un délai avant l'exécution.
    *   `/a` : Annule un arrêt programmé.
