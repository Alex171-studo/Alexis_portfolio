# 🔐 Sécurité des Systèmes d’Information

## 📘 Note de cours complète

---

## I. Introduction à la sécurité des systèmes d’information

La sécurité des systèmes d’information vise à protéger les **données**, les **systèmes** et les **services** contre les accès non autorisés, les altérations et les interruptions.

Elle repose sur le **triptyque CIA** :

### 1. Confidentialité (Confidentiality)

Garantir que seules les personnes autorisées peuvent accéder à l’information.

### 2. Intégrité (Integrity)

Garantir que les données ne sont ni modifiées ni supprimées de manière non autorisée.

### 3. Disponibilité (Availability)

Garantir que les systèmes et les données sont accessibles quand nécessaire.

---

## II. Contrôle d’accès et gestion des privilèges

### 1. Importance du contrôle d’accès

Tous les utilisateurs d’un système n’ont pas les mêmes responsabilités. Il est donc essentiel de **définir précisément les niveaux d’accès** afin de :

* réduire les erreurs humaines
* limiter les abus
* diminuer la surface d’attaque

---

### 2. Facteurs déterminant les niveaux d’accès

Les accès sont définis selon :

1. **Le rôle ou la fonction de l’utilisateur**
2. **La sensibilité des informations**

---

### 3. Principe du moindre privilège (Least Privilege)

Un utilisateur ne doit disposer **que des droits strictement nécessaires** à l’accomplissement de ses tâches.

👉 Ce principe limite les dégâts en cas de compromission.

---

## III. PIM et PAM

### 1. Privileged Identity Management (PIM)

Le **PIM** gère les **identités privilégiées**.

👉 Il détermine **qui a le droit d’être privilégié**, en fonction de son rôle dans l’organisation.

Exemple : attribuer le rôle « administrateur système » à un employé spécifique.

---

### 2. Privileged Access Management (PAM)

Le **PAM** gère **ce que les rôles privilégiés peuvent faire**.

Il inclut :

* gestion des mots de passe privilégiés
* audit et journalisation
* accès temporaires (just-in-time)
* réduction de la surface d’attaque

---

### 3. Différence clé

* **PIM** → Qui est privilégié ?
* **PAM** → Que peut faire le privilégié ?

---

## IV. Modèles de sécurité formels

Les **modèles de sécurité** sont des cadres théoriques permettant d’implémenter concrètement la CIA triad.

---

## V. Modèle de Bell-La Padula

### 1. Objectif

👉 Assurer la **confidentialité** des données.

### 2. Principe

Organisation hiérarchique stricte des utilisateurs (subjects) et des données (objects).

### 3. Règle fondamentale

> **No Read Up, No Write Down**

* Un utilisateur ne peut pas lire des données d’un niveau supérieur
* Il ne peut pas écrire vers un niveau inférieur

---

### 4. Avantages

* Adapté aux structures hiérarchiques
* Simple et éprouvé
* Très utilisé dans les milieux gouvernementaux et militaires

---

### 5. Inconvénients

* Les utilisateurs peuvent connaître l’existence de données sans y accéder
* Fortement basé sur la confiance (vetting)

---

## VI. Modèle de Biba

### 1. Objectif

👉 Assurer l’**intégrité** des données.

### 2. Règle fondamentale

> **No Read Down, No Write Up**

* Un utilisateur ne peut pas lire des données moins fiables
* Il ne peut pas écrire vers un niveau plus élevé

---

### 3. Avantages

* Protège l’intégrité
* Simple conceptuellement
* Complémentaire à Bell-La Padula

---

### 4. Inconvénients

* Peut ralentir les processus métiers
* Complexité liée au nombre de niveaux

---

### 5. Cas d’utilisation

* Développement logiciel
* Systèmes critiques
* Environnements industriels

---

## VII. Threat Modelling (Modélisation des menaces)

### 1. Définition

Processus visant à **identifier, analyser et réduire** les menaces contre un système d’information.

👉 Approche **préventive**.

---

### 2. Étapes du Threat Modelling

1. Preparation
2. Identification
3. Mitigations
4. Review

---

### 3. Éléments d’un Threat Model efficace

* Threat intelligence
* Identification des actifs
* Capacités de mitigation
* Évaluation du risque

Formule :

> **Risque = Probabilité × Impact**

---

## VIII. Framework STRIDE

STRIDE est un modèle de classification des menaces.

| Lettre | Menace                 | Description                |
| ------ | ---------------------- | -------------------------- |
| S      | Spoofing               | Usurpation d’identité      |
| T      | Tampering              | Altération des données     |
| R      | Repudiation            | Négation d’une action      |
| I      | Information Disclosure | Fuite d’informations       |
| D      | Denial of Service      | Indisponibilité du service |
| E      | Elevation of Privilege | Escalade de privilèges     |

👉 STRIDE permet une analyse systématique des menaces.

---

## IX. Incident Response (IR)

### 1. Définition

Un **incident de sécurité** est une violation réelle de la sécurité d’un système.

L’Incident Response regroupe les actions permettant de :

* contenir l’incident
* éliminer la menace
* restaurer les systèmes
* améliorer la sécurité

---

### 2. Classification des incidents

* **Urgency** : vitesse et type d’attaque
* **Impact** : effets sur l’activité de l’organisation

---

### 3. CSIRT

Le **Computer Security Incident Response Team** est une équipe dédiée à la gestion des incidents.

---

## X. Les six phases de l’Incident Response

1. **Preparation**
2. **Identification**
3. **Containment**
4. **Eradication**
5. **Recovery**
6. **Lessons Learned**

---

## XI. Lien global entre les concepts

* PIM & PAM → contrôle des accès
* Modèles de sécurité → protection formelle des données
* Threat Modelling → anticipation
* Incident Response → réaction

---

## 🔑 Conclusion générale

> **La sécurité des systèmes d’information repose sur un contrôle strict des accès, des modèles formels éprouvés, une anticipation des menaces et une réponse structurée aux incidents.**

