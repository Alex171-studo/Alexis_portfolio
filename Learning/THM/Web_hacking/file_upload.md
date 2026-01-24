# Vulnérabilités de Téléversement de Fichiers (File Upload)

## Objectif du cours

Comprendre **en profondeur** les mécanismes de défense liés aux uploads de fichiers, leurs **failles conceptuelles**, et maîtriser une **méthodologie rigoureuse** pour identifier, analyser et contourner ces protections dans un cadre d’audit de sécurité.

---

## 1. Concepts fondamentaux

### 1.1 Qu’est-ce qu’une vulnérabilité de file upload ?

Une vulnérabilité de téléversement de fichiers survient lorsqu’une application web permet à un utilisateur d’envoyer un fichier **sans validation correcte**, conduisant potentiellement à :

* l’exécution de code arbitraire
* la divulgation d’informations
* la compromission du serveur

L’upload est une surface d’attaque **critique**, car il crée une passerelle directe entre l’utilisateur et le système de fichiers du serveur.

---

## 2. Client-side vs Server-side filtering

### 2.1 Filtrage côté client

**Définition** : validation effectuée dans le navigateur de l’utilisateur (principalement via JavaScript).

**Caractéristiques** :

* Visible (code accessible)
* Contrôlable par l’attaquant
* Purement cosmétique en matière de sécurité

**Conclusion** :

> Le filtrage côté client **ne protège rien**. Il améliore seulement l’expérience utilisateur.

---

### 2.2 Filtrage côté serveur

**Définition** : validation exécutée sur le serveur avant stockage du fichier.

**Caractéristiques** :

* Invisible (boîte noire)
* Plus difficile à contourner
* Rarement parfait

**Principe clé** :

> Un filtre serveur ne peut être contourné qu’en **respectant sa logique interne**.

---

## 3. Types de filtres utilisés lors des uploads

### 3.1 Validation par extension

#### 3.1.1 Blacklist

* Extensions interdites explicites (ex : .php, .phtml)
* Tout le reste est accepté

**Faiblesse majeure** : extensions alternatives non prévues

Exemples exploitables :

* .php3
* .php5
* .phar
* .pht

---

#### 3.1.2 Whitelist

* Seules certaines extensions sont acceptées (ex : .jpg, .png)

**Plus sécurisant**, mais vulnérable si la validation est naïve (string matching, regex faible).

---

### 3.2 Filtrage par type MIME

* Basé sur l’en-tête HTTP `Content-Type`
* Exemple : image/jpeg

**Faiblesse critique** :

> Le type MIME peut être **modifié arbitrairement** par l’attaquant.

---

### 3.3 Filtrage par magic numbers

#### Définition

Les *magic numbers* sont des octets placés au début d’un fichier permettant d’identifier son type réel.

Exemples :

* JPEG : `FF D8 FF`
* PNG : `89 50 4E 47`

#### Avantages

* Plus fiable que l’extension

#### Limites

* Facilement falsifiable
* Inefficace si le serveur exécute le fichier selon l’extension

---

### 3.4 Filtrage par taille

Objectif : éviter le déni de service.

Conséquence offensive :

* Payload limité
* Shells minimisés requis

---

### 3.5 Filtrage par nom de fichier

Techniques défensives courantes :

* Renommage aléatoire
* Suppression de caractères spéciaux
* Interdiction de certains symboles

Impact offensif :

* Nécessité de **relocaliser le fichier**
* Accès indirect ou bruteforce d’URI

---

### 3.6 Filtrage par contenu

Analyse complète du contenu du fichier.

* Coûteux
* Rarement implémenté correctement
* Hors périmètre des filtres basiques

---

## 4. Bypass des filtres côté client

### 4.1 Désactivation de JavaScript

* Fonctionne si le site n’est pas dépendant de JS

### 4.2 Modification de la réponse serveur

* Interception avec Burp Suite
* Suppression ou altération du script JS

### 4.3 Interception de la requête d’upload

* Changement d’extension
* Changement de MIME type

### 4.4 Envoi direct (curl)

* Bypass total de l’interface
* Nécessite connaissance des paramètres POST

---

## 5. Bypass des filtres serveur : extensions

### 5.1 Analyse comportementale

Tests empiriques :

* extension invalide
* extension double
* extension alternative

Exemples :

* shell.jpg.php
* shell.php.jpg

---

### 5.2 Problèmes de parsing

* Dernier point uniquement analysé
* Recherche naïve de sous-chaîne (.jpg)

**Erreur logique fréquente** :

> “Si le nom contient .jpg alors le fichier est sûr”

---

## 6. Bypass des filtres serveur : magic numbers

### 6.1 Principe

Falsifier l’identité binaire du fichier pour correspondre au format autorisé.

### 6.2 Méthode

1. Ajouter des octets factices au début
2. Modifier ces octets en hexadécimal
3. Conserver le reste du payload intact

### 6.3 Conséquence

Le fichier est reconnu comme image **mais exécuté comme script**.

---

## 7. Méthodologie complète d’audit (black-box)

### Étape 1 : Reconnaissance

* Langage
* Framework
* Serveur

### Étape 2 : Analyse client-side

* JS
* Validations visibles

### Étape 3 : Upload innocent

* Fichier valide
* Observation du stockage

### Étape 4 : Localisation

* URL directe
* Gobuster (-x)

### Étape 5 : Tentative malveillante

* Shell simple
* Analyse du rejet

### Étape 6 : Identification du filtre

* Extension
* MIME
* Magic number
* Taille

### Étape 7 : Construction du payload

### Étape 8 : Exploitation

---

## 8. Principes clés à retenir

* Aucun filtre n’est parfait
* La sécurité repose sur des hypothèses
* L’attaque consiste à violer une hypothèse
* L’approche doit être **scientifique, itérative et méthodique**

