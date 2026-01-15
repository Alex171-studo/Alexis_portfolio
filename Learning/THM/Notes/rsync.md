## 1️⃣ Qu’est-ce que `rsync` ?

`rsync` est un **outil de synchronisation et de transfert de fichiers** extrêmement puissant sous Linux, macOS, et même Windows (via Cygwin ou WSL).

**Objectifs principaux :**

* Copier des fichiers ou dossiers **localement** ou vers un **serveur distant**.
* Faire des **sauvegardes incrémentales** (ne transférer que ce qui a changé).
* Conserver les permissions, les dates, les liens symboliques, etc.

💡 **Exemple simple :** tu as un dossier sur ton ordinateur et tu veux le copier sur un serveur. Avec rsync, seulement les fichiers nouveaux ou modifiés seront transférés, ce qui économise beaucoup de temps et de bande passante.

---

## 2️⃣ Principe de fonctionnement

Rsync fonctionne avec trois concepts clés :

1. **Comparaison des fichiers** : rsync compare le fichier source et le fichier destination en utilisant soit la taille + date, soit un checksum (md5-like).
2. **Transfert différentiel** : si un fichier est partiellement modifié, rsync envoie **uniquement les différences**, pas le fichier entier.
3. **Options de sauvegarde** : rsync peut préserver les droits, les liens symboliques, les propriétaires, et même supprimer les fichiers de destination qui n’existent plus dans la source.

---

## 3️⃣ Syntaxe de base

La syntaxe générale est :

```bash
rsync [options] source destination
```

* `source` : dossier ou fichier à copier
* `destination` : dossier local ou distant (via SSH)
* `[options]` : contrôlent le comportement de rsync (compression, sauvegarde, permissions…)

---

## 4️⃣ Les options les plus importantes

Voici les options les plus utilisées, avec explications :

| Option                | Description                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `-a`                  | **Archive** : copie récursive + conserve permissions, dates, liens symboliques, etc. C’est un raccourci très utilisé.       |
| `-v`                  | **Verbose** : affiche ce que rsync fait.                                                                                    |
| `-z`                  | **Compression** : compresse les données pendant le transfert pour économiser de la bande passante.                          |
| `-P`                  | Affiche la progression et permet de reprendre un transfert interrompu. Equivalent à `--partial --progress`.                 |
| `--delete`            | Supprime les fichiers dans la destination qui n’existent plus dans la source. Très utile pour les synchronisations exactes. |
| `-e "ssh"`            | Utilise SSH pour le transfert distant.                                                                                      |
| `--exclude 'pattern'` | Exclut certains fichiers ou dossiers selon un motif.                                                                        |

---

## 5️⃣ Commandes pratiques

### 5.1 Copier un dossier localement

```bash
rsync -av /chemin/source/ /chemin/destination/
```

* `/chemin/source/` : le `/` final est important. Il signifie “copier le contenu du dossier”.
* Sans `/` : rsync crée un sous-dossier dans la destination.

💡 Exemple :

```bash
rsync -av /home/user/Documents/ /media/usb_backup/Documents/
```

Cela va copier **tous les fichiers de Documents** sur la clé USB.

---

### 5.2 Copier un dossier vers un serveur distant

```bash
rsync -avz /home/user/Documents/ utilisateur@serveur:/home/utilisateur/sauvegarde/
```

* `utilisateur` : ton login SSH sur le serveur
* `serveur` : adresse IP ou nom de domaine
* `-z` : compresse les données pendant le transfert

💡 Exemple :

```bash
rsync -avz /home/user/Projet/ alice@192.168.1.50:/home/alice/BackupProjet/
```

---

### 5.3 Synchronisation exacte (supprimer les fichiers obsolètes)

```bash
rsync -av --delete /home/user/Documents/ /media/usb_backup/Documents/
```

* Les fichiers supprimés dans `Documents` seront aussi supprimés dans `usb_backup`.

---

### 5.4 Exclure certains fichiers

```bash
rsync -av --exclude '*.tmp' /home/user/Documents/ /backup/Documents/
```

* Ici, tous les fichiers `.tmp` seront ignorés.
* On peut utiliser plusieurs `--exclude`.

---

### 5.5 Reprendre un transfert interrompu

```bash
rsync -avP /home/user/GrandsFichiers/ serveur:/backup/
```

* `-P` = `--progress` + `--partial`, donc si le transfert est coupé, rsync reprend là où il s’était arrêté.

---

## 6️⃣ Astuces puissantes

1. **Simulation avant transfert**
   Pour vérifier ce qui sera copié sans rien toucher :

```bash
rsync -avn source/ destination/
```

* `-n` = "dry run" (simulation)

2. **Limiter la bande passante**

```bash
rsync -av --bwlimit=500 source/ destination/
```

* Limite à 500 KB/s pour ne pas saturer le réseau.

3. **Rsync sur port SSH spécifique**

```bash
rsync -av -e "ssh -p 2222" source/ user@serveur:/dest/
```

---


