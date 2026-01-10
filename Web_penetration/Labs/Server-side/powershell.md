# Fiche de cours : PowerShell

## Basic Commands

*   **Get-Command** : Affiche les commandes disponibles.
    *   `Get-Command -CommandType <type>` : Filtre par type.
    *   `Get-Command -Name <nom>` : Filtre par nom.
*   **Get-Help** : Affiche l'aide d'une commande.
    *   `Get-Help <commande>`
*   **Get-Alias** : Affiche les alias disponibles.
*   **Find-Module** : Recherche un module.
    *   `Find-Module -Name <nom>`
*   **Install-Module** : Installe un module.
    *   `Install-Module -Name <nom>`

## Navigating the File System

*   **Get-Content** : Affiche le contenu d'un fichier.
    *   `Get-Content <fichier>`
*   **Get-ChildItem** : Liste les fichiers et dossiers.
    *   `Get-ChildItem -Path <dossier>`
    *   `-Recurse` : Inclut les sous-dossiers.
    *   `-Force` : Affiche les fichiers cachés.
*   **Set-Location** : Change le répertoire de travail.
    *   `Set-Location -Path <dossier>`
*   **New-Item** : Crée un nouvel élément (fichier ou dossier).
    *   `New-Item -Path <chemin> -ItemType Directory`
*   **Remove-Item** : Supprime un élément.
    *   `Remove-Item -Path <chemin>`
*   **Copy-Item** : Copie un élément.
    *   `Copy-Item -Path <source> -Destination <dest>`
*   **Move-Item** : Déplace un élément.
    *   `Move-Item -Path <source> -Destination <dest>`

## Filtering and Objects

*   **Sort-Object** : Trie les objets.
    *   `<command> | Sort-Object Length`
*   **Where-Object** : Filtre les objets selon une condition.
    *   `<command> | Where-Object { $_.Length -gt 1000 }`
    *   `<command> | Where-Object "Extension" -eq ".txt"`
    *   `<command> | Where-Object "Name" -like "*.txt"`
*   **Select-Object** : Sélectionne des propriétés spécifiques.
    *   `<command> | Select-Object Name, Length`
*   **Select-String** : Recherche des chaînes de caractères (grep).
    *   `<command> | Select-String -Pattern "chaine"`

## System and Network Information

*   **Get-ComputerInfo** : Informations générales du système.
*   **Get-LocalUser** : Liste les utilisateurs locaux.
    *   `Get-LocalUser -Name <nom>`
*   **Get-LocalGroup** : Liste les groupes locaux.
*   **Get-NetAdapter** : Affiche les adaptateurs réseau.
*   **Get-NetIPAddress** : Affiche les adresses IP.
*   **Get-NetIPConfiguration** : Affiche la configuration réseau détaillée.

## Real-Time System Analysis

*   **Get-Process** : Liste les processus en cours d'exécution.
*   **Get-Service** : Liste les services système.
*   **Get-NetTCPConnection** : Affiche les connexions TCP actives.
*   **Get-FileHash** : Calcule l'empreinte cryptographique d'un fichier.
    *   `Get-FileHash <fichier>`
*   **Get-Item** : Obtient les informations d'un élément.
    *   `Get-Item <fichier> -Stream *` : Affiche les flux de données alternatifs (ADS).

## Scripting

*   **Invoke-Command** : Exécute des commandes sur des ordinateurs locaux ou distants.
    *   `Invoke-Command -ComputerName <nom> -ScriptBlock { <commandes> }`