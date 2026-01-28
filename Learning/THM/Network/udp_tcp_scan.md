#  Port Scanning (TCP & UDP)

---

## 1️⃣ Rappels fondamentaux

* Une **adresse IP** identifie une machine sur le réseau
* Un **port** identifie un **service** sur cette machine
* Un service peut être :

  * **TCP** (HTTP, SSH, FTP…)
  * **UDP** (DNS, DHCP, SNMP…)

👉 Objectif du port scanning :
**Découvrir quels services sont actifs sur une machine cible**

---

## 2️⃣ États des ports (selon Nmap)

| État           | Signification                       |                                          |
| -------------- | ----------------------------------- | ---------------------------------------- |
| **open**       | Un service écoute sur le port       |                                          |
| **closed**     | Aucun service, mais port accessible |                                          |
| **filtered**   | Port bloqué par un firewall         |                                          |
| **unfiltered** | Accessible mais état inconnu        |                                          |
| **open         | filtered**                          | Ouvert ou bloqué (impossible à trancher) |
| **closed       | filtered**                          | Fermé ou bloqué                          |

---

## 3️⃣ Types de scans vus dans le cours

---

### 🔹 1. TCP Connect Scan (`-sT`)

📌 **Principe**

* Utilise le **TCP 3-way handshake complet**
* SYN → SYN/ACK → ACK
* Puis Nmap ferme avec **RST**

📌 **Caractéristiques**

* Ne nécessite **pas les droits root**
* Plus **bruyant** (connexions réelles)
* Plus facilement **loggé**

📌 **Commande**

```bash
nmap -sT TARGET_IP
```

📌 **Utilisation**

* Quand tu n’as pas accès à sudo/root

---

### 🔹 2. TCP SYN Scan (`-sS`) ✅ (le plus important)

📌 **Principe**

* Scan **half-open**
* SYN → SYN/ACK → **RST**
* ❌ Pas de connexion complète

📌 **Caractéristiques**

* Nécessite **root ou sudo**
* Plus **rapide**
* Plus **discret**
* Mode **par défaut** quand Nmap est lancé en root

📌 **Commande**

```bash
sudo nmap -sS TARGET_IP
```

📌 **Utilisation**

* Scan TCP standard en pentest
* Très fiable

---

### 🔹 3. UDP Scan (`-sU`)

📌 **Principe**

* UDP est **sans connexion**
* Un port fermé répond par :

  * **ICMP Type 3 Code 3 (Port Unreachable)**
* Un port ouvert → souvent **aucune réponse**

📌 **Interprétation**

| Réponse            | État   |          |
| ------------------ | ------ | -------- |
| ICMP type 3 code 3 | closed |          |
| Réponse UDP        | open   |          |
| Aucune réponse     | open   | filtered |

📌 **Caractéristiques**

* Très **lent**
* Souvent **incertain**
* Souvent bloqué par firewall

📌 **Commande**

```bash
sudo nmap -sU TARGET_IP
```

---

## 4️⃣ Options importantes de Nmap

---

### 🔹 Sélection des ports

| Option     | Rôle                       |
| ---------- | -------------------------- |
| `-p-`      | Tous les ports (1–65535)   |
| `-p1-1023` | Ports 1 à 1023             |
| `-F`       | 100 ports les plus communs |

📌 Exemples :

```bash
nmap -sS -p- TARGET_IP
nmap -sS -F TARGET_IP
```

---

### 🔹 Ordre de scan

| Option | Rôle                                 |
| ------ | ------------------------------------ |
| `-r`   | Ports scannés dans l’ordre croissant |

📌 Utile pour tester des comportements dépendants du boot

---

### 🔹 Vitesse et timing

| Option | Description           |
| ------ | --------------------- |
| `-T0`  | Très lent (furtif)    |
| `-T3`  | Par défaut            |
| `-T5`  | Très rapide (bruyant) |

📌 Exemple :

```bash
nmap -sS -T4 TARGET_IP
```

---

### 🔹 Contrôle du débit

| Option                  | Rôle                    |
| ----------------------- | ----------------------- |
| `--max-rate 50`         | Max 50 paquets/sec      |
| `--min-rate 15`         | Min 15 paquets/sec      |
| `--min-parallelism 100` | 100 sondes en parallèle |

📌 Exemple :

```bash
nmap -sS --max-rate 50 TARGET_IP
```

---

## 5️⃣ Combinaisons courantes en pratique

🔹 **Reconnaissance rapide**

```bash
nmap -sS -F TARGET_IP
```

🔹 **Scan complet TCP**

```bash
nmap -sS -p- TARGET_IP
```

🔹 **UDP rapide**

```bash
sudo nmap -sU -F TARGET_IP
```

🔹 **Scan discret**

```bash
sudo nmap -sS -T1 TARGET_IP
```

---

## 6️⃣ Résumé final (à mémoriser)

* **-sT** → TCP complet, sans root
* **-sS** → TCP half-open, root requis ✅
* **-sU** → UDP, lent et incertain
* **-F** → rapide, 100 ports
* **-p-** → tous les ports
* **-T** → contrôle de la vitesse

