
# Firewalls

## 🔥 **1. Qu’est-ce qu’un pare-feu ?**

### 🧍‍♂️ **Analogie physique : le gardien de sécurité**
Imagine un centre commercial avec un **gardien à l’entrée** :
- Il **vérifie** chaque personne qui entre ou sort.
- Il **autorise** les clients normaux.
- Il **refuse** les individus suspects ou non autorisés.
- Il **ne laisse passer** que ce qui est conforme aux règles établies.

> Le **pare-feu** joue exactement ce rôle, mais **dans le monde numérique** : il surveille **tout le trafic réseau** entrant et sortant d’un système ou d’un réseau.

---

## 🎯 **2. Objectif principal d’un pare-feu**

> **Filtrer le trafic réseau** selon des **règles de sécurité prédéfinies**, afin de :
- Bloquer les connexions non sollicitées ou malveillantes.
- Protéger les systèmes internes contre les attaques externes.
- Contrôler les communications sortantes (ex : empêcher un malware de télécharger des données).
- Appliquer une **politique de sécurité réseau**.

Il agit comme **première ligne de défense** dans la **cybersécurité périmétrique**.

---

## 📡 **3. Fonctionnement technique : comment ça marche ?**

Un pare-feu examine **chaque paquet de données** (ou flux) qui traverse la frontière entre :
- Un **réseau interne** (ex : ton PC, ton serveur, ton LAN)
- Et un **réseau externe** (ex : Internet)

### 📦 Ce qu’il inspecte :
- **Adresse IP source** (d’où vient le paquet ?)
- **Adresse IP destination** (où va-t-il ?)
- **Port source/destination** (quelle application/service ?)
- **Protocole** (TCP, UDP, ICMP…)
- (Dans les cas avancés) : **contenu du paquet**, **état de la connexion**, **signature de menace**, etc.

### ⚖️ Décision :
- **Autoriser** (`ALLOW`) → le paquet passe.
- **Bloquer** (`DENY`/`DROP`) → le paquet est rejeté silencieusement ou avec un message.
- **Rediriger** (`FORWARD`) → le paquet est envoyé ailleurs (ex : vers un serveur web).

> **Tout le trafic passe par le pare-feu avant d’atteindre ton système.**

---

## 🧱 **4. Types de pare-feu (avec couche OSI et exemples)**

Les pare-feu évoluent avec la **pile OSI**. Plus on monte dans les couches, plus l’inspection est fine.

| Type | Couches OSI | Fonctionnement | Avantages | Inconvénients |
|------|-------------|----------------|----------|---------------|
| **Stateless (sans état)** | L3 (Réseau), L4 (Transport) | Filtre paquet par paquet, **sans mémoire** des connexions précédentes. | Rapide, léger, bon pour trafic intense. | Ne comprend pas les sessions → vulnérable aux attaques fragmentées ou multi-paquets. |
| **Stateful (avec état)** | L3, L4 | Garde un **tableau d’état** des connexions actives. Un paquet est évalué **dans le contexte** d’une session. | Plus intelligent : si une connexion TCP est légitime, les paquets suivants sont automatiquement autorisés. | Plus gourmand en ressources. |
| **Proxy (Application-level gateway)** | L7 (Application) | Agit comme **intermédiaire** : ton client parle au proxy, qui parle à Internet. Inspecte **le contenu réel** (ex : requêtes HTTP, emails). | Peut bloquer du code malveillant dans un fichier, filtrer du contenu, cacher ton IP. | Très lent, complexe à configurer, ne supporte pas tous les protocoles. |
| **Next-Generation Firewall (NGFW)** | L3 à L7 | Combine **stateful inspection + DPI (Deep Packet Inspection) + IPS (Intrusion Prevention System) + décryptage SSL/TLS + intégration threat intel**. | Protection avancée contre APT, ransomwares, zero-days. | Coûteux, complexe, nécessite maintenance. |

### 🔍 Exemple concret :
- Tu visites `https://evil.com/malware.exe`
  - **Stateless** : voit "port 443 → OK"
  - **Stateful** : voit "connexion TCP établie → OK"
  - **Proxy** : déchiffre le TLS, lit l’URL → bloque `malware.exe`
  - **NGFW** : compare le hash du fichier avec VirusTotal → bloque + alerte SOC

---

## 📜 **5. Règles de pare-feu : structure et logique**

Une règle est une **instruction conditionnelle** :

> **SI** [source] → [destination] sur [port] via [protocole] **ALORS** [action]

### 🔧 Composants clés :
| Champ | Description | Exemple |
|------|-------------|--------|
| **Source** | IP ou plage d’IPs source | `192.168.1.0/24`, `10.0.0.5`, `any` |
| **Destination** | IP ou plage d’IPs cible | `192.168.1.10`, `any` |
| **Port** | Numéro de port (ou plage) | `22`, `80-443`, `any` |
| **Protocole** | TCP, UDP, ICMP, etc. | `TCP`, `UDP` |
| **Direction** | Entrant (`inbound`) ou sortant (`outbound`) | `inbound` |
| **Action** | `ALLOW`, `DENY`, `DROP`, `FORWARD` | `DENY` |

### 🛑 Types d’actions :
- **ALLOW** : autorise le trafic.
- **DENY / DROP** :
  - `DENY` → envoie un message de rejet (ex : RST en TCP).
  - `DROP` → silence total (meilleur pour la sécurité : l’attaquant ne sait pas si la machine existe).
- **FORWARD** : redirige vers un autre hôte (utile en NAT ou reverse proxy).

### 📌 Ordre des règles :
> **Premier match gagne !**  
Les règles sont lues **du haut vers le bas**. Une règle générale (`allow any`) en haut rend inutiles toutes les règles suivantes.

> ✅ Bonne pratique : **politique par défaut = DENY ALL**, puis **autoriser uniquement ce qui est nécessaire** (principe du moindre privilège).

---

## 💻 **6. Mise en pratique : Windows Defender Firewall**

### 🔧 Interface graphique :
- Accès via : `Windows Security > Firewall & network protection`
- Profils :
  - **Private** : réseau de confiance (maison)
  - **Public** : réseau non fiable (café, aéroport) → règles plus strictes

### 🛠️ Création d’une règle personnalisée (exemple blocage HTTP/HTTPS) :
1. Ouvrir **Advanced Settings**
2. **Outbound Rules > New Rule**
3. Type : **Custom**
4. Programme : **All programs**
5. Protocole : **TCP**, ports distants : `80,443`
6. Action : **Block the connection**
7. Appliquer à tous les profils
8. Nom : `Block Web Browsing`

→ Résultat : impossible d’accéder à un site web → excellent test de contrôle sortant.

> 💡 Astuce pentest : si tu bloques tout le trafic sortant sauf DNS, tu peux détecter les exfiltrations via DNS tunneling.

---

## 🐧 **7. Mise en pratique : Pare-feu Linux (iptables / ufw)**

### 🔧 Architecture sous-jacente : **Netfilter**
- Framework noyau Linux pour le filtrage réseau.
- **iptables** : interface classique (syntaxe complexe).
- **nftables** : remplaçant moderne (plus performant).
- **ufw** : wrapper simplifié pour débutants.

### 🛠️ Exemples avec **ufw** (Uncomplicated Firewall) :

```bash
# Activer le pare-feu
sudo ufw enable

# Politique par défaut : bloquer tout entrant, autoriser sortant
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Bloquer SSH depuis l’extérieur
sudo ufw deny 22/tcp

# Autoriser uniquement ton IP sur SSH
sudo ufw allow from 192.168.1.50 to any port 22

# Voir les règles
sudo ufw status numbered

# Supprimer une règle
sudo ufw delete 1
```

### 🔍 Avec **iptables** (plus puissant, mais complexe) :
```bash
# Bloquer tout le trafic entrant sauf SSH
sudo iptables -P INPUT DROP
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

---


## 📚 **8. Synthèse visuelle (mental model)**

```
[Internet]
    │
    ▼
[FIREWALL] ←→ Règles : Source, Dest, Port, Proto, Action
    │
    ├── ALLOW → vers serveur web (port 80)
    ├── DROP  → tentative SSH brute-force
    └── FORWARD → vers DMZ
                │
                ▼
          [Serveurs internes]
```

