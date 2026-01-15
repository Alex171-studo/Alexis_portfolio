# Incident Response

## 🏠 Analogie : Ta maison = Ton système informatique

Imagine que ta maison est pleine d’objets de valeur. Tu installes :
- Des caméras (CCTV)
- Un gardien
- Une pièce secrète pour cacher tes trésors

Mais… **et si un cambrioleur réussit quand même à entrer ?**  
Tu dois aussi avoir un **plan d’urgence** : appeler la police, sécuriser ce qui reste, comprendre comment il est entré, etc.

En cybersécurité, c’est exactement la même chose :
- Tes systèmes = ta maison
- Les attaques (phishing, malware, etc.) = les cambrioleurs
- La **réponse aux incidents** = ton plan d’urgence

---

## 🔍 Qu’est-ce qu’un **incident de sécurité** ?

Un **incident** est un **événement malveillant confirmé** qui menace la sécurité de tes systèmes ou données.

### ⚠️ Événement → Alerte → Incident
1. **Événement** : n’importe quelle action sur un système (ex. : un fichier est ouvert).
2. **Alerte** : un outil de sécurité détecte quelque chose de suspect (ex. : transfert massif de données).
3. **Analyse** :
   - **Faux positif** : l’alerte semble dangereuse, mais c’est normal (ex. : sauvegarde cloud).
   - **Vrai positif** : c’est bien une menace → **c’est un incident**.

### 📊 Niveaux de gravité
Les incidents sont classés par **sévérité** :
- **Faible** : peu d’impact
- **Moyen**
- **Élevé**
- **Critique** : arrête tout ! (ex. : fuite de données clients)

> Cela permet à l’équipe de sécurité de **prioriser** ses actions.

---

## 🦹‍♂️ Types courants d’incidents

| Type | Description | Exemple |
|------|-------------|--------|
| **Malware** | Logiciel malveillant (virus, ransomware, etc.) | Un fichier .exe infecté ouvre une porte dérobée |
| **Violation de sécurité** | Accès non autorisé à des données sensibles | Un hacker vole des mots de passe |
| **Fuite de données** | Données exposées (volontairement ou par erreur) | Un employé envoie un fichier confidentiel par erreur |
| **Attaque interne** | Menace venant de l’intérieur (employé mécontent) | Un salarié copie des données avant de partir |
| **Déni de service (DoS)** | Rendre un service indisponible | Un site web submergé de requêtes inutiles |

> **Important** : L’impact dépend du contexte. Une fuite de données peut être catastrophique pour une banque, mais mineure pour une petite entreprise.

---

## 🔄 Le processus de réponse aux incidents

Deux cadres principaux existent : **SANS** et **NIST**. Ils sont très similaires.

### 🟢 Cadre **SANS** (6 phases – mémorisez **PICERL**)

| Phase | Objectif | Exemple |
|------|--------|--------|
| **P**réparation | Être prêt avant l’attaque | Former les employés au phishing, avoir un plan |
| **I**dentification | Détecter l’incident | Un SIEM alerte sur un comportement anormal |
| **C**ontainment | Limiter les dégâts | Isoler la machine infectée du réseau |
| **E**radication | Supprimer la menace | Nettoyer le malware avec un antivirus |
| **R**ecouvrement | Remettre en service | Restaurer les données depuis une sauvegarde |
| **L**eçons apprises | S’améliorer | Réunion post-incident : "Comment éviter ça demain ?" |

### 🔵 Cadre **NIST** (4 phases)

1. **Préparation**
2. **Détection et analyse**
3. **Contenance, éradication et récupération**
4. **Post-incident (leçons apprises)**

> En pratique, beaucoup d’organisations mélangent les deux approches.

---

## 🛠️ Outils et documents clés

### Outils de détection/réponse
- **SIEM** : Centralise les logs et détecte les anomalies (ex. : Splunk, Microsoft Sentinel)
- **Antivirus (AV)** : Détecte les malwares connus
- **EDR** : Surveille les terminaux en temps réel, bloque et nettoie les menaces avancées

### 📘 **Playbooks** vs **Runbooks**
- **Playbook** = Guide stratégique pour un type d’incident  
  *Exemple : "Que faire en cas de phishing ?"*
  - Analyser l’e-mail
  - Vérifier si quelqu’un a cliqué
  - Isoler la machine
  - Bloquer l’expéditeur

- **Runbook** = Procédures techniques détaillées, étape par étape  
  *Exemple : "Commandes exactes à taper dans l’EDR pour isoler un poste Windows"*

---

## 📄 Plan de réponse aux incidents (Incident Response Plan)

C’est un **document officiel** approuvé par la direction, qui contient :
- Qui fait quoi (rôles et responsabilités)
- Comment communiquer (avec les employés, la presse, la police)
- Comment escalader un incident critique
- Les procédures à suivre à chaque phase

> Sans ce plan, l’équipe réagit dans le chaos.

---

