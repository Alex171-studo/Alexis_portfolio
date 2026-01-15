# Logs

## 🌟 **1. Introduction : Pourquoi les logs sont essentiels ?**

### 🔍 L’analogie policière
Imagine un cambriolage dans une cabane isolée :
- La porte est enfoncée → trace physique.
- Le plafond s’est effondré → autre indice.
- Des empreintes dans la neige → preuve de passage.
- Une vidéo de caméra de surveillance → confirmation visuelle.

En combinant **toutes ces traces**, la police reconstitue ce qui s’est passé et identifie le coupable.

> **Dans le monde numérique**, il n’y a pas de neige ni de caméras partout… mais il y a des **logs** :  
> **Les logs sont les "empreintes numériques" laissées par chaque action sur un système informatique.**

Même si un attaquant essaie de se cacher, il laisse presque toujours **des traces dans les logs** (accès, erreurs, connexions, etc.).

---

## 📋 **2. Qu’est-ce qu’un log ?**

Un **log** (ou journal) est un **fichier ou un enregistrement automatique** qui capture :
- Qui a fait quoi ?
- Quand ?
- Où ?
- Avec quel résultat ?

✅ Peut concerner :
- Des actions normales (connexion utilisateur, démarrage d’un service).
- Des actions malveillantes (tentative de piratage, exécution de malware).

> **Objectif principal** : permettre aux équipes de sécurité ou aux administrateurs de **comprendre ce qui s’est passé**, même après coup.

---

## 🛠️ **3. À quoi servent les logs ? (Cas d’usage)**

| Cas d’usage | Explication |
|------------|-------------|
| **Surveillance de la sécurité** | Détecter en temps réel des comportements anormaux (ex : 100 tentatives de connexion en 1 minute). |
| **Investigation d’incident** | Après une attaque, les logs permettent de retracer **l’origine**, **les actions effectuées**, et **l’étendue** du dommage. |
| **Dépannage (troubleshooting)** | Si une application plante, les logs montrent l’erreur exacte (ex : "fichier manquant", "accès refusé"). |
| **Surveillance des performances** | Identifier les ralentissements, pics de charge, ou ressources saturées. |
| **Audit et conformité** | Prouver que les règles de sécurité sont respectées (ex : RGPD, ISO 27001). Obligatoire dans beaucoup de secteurs. |

---

## 🗂️ **4. Types de logs (catégorisés par fonction)**

Pour ne pas se perdre dans des millions de lignes, les logs sont **classés par type** :

| Type de log | Utilisation | Exemples concrets |
|------------|-------------|------------------|
| **System Logs** | Fonctionnement du système d’exploitation | Démarrage/arrêt, erreur matériel, pilote corrompu |
| **Security Logs** | Événements liés à la sécurité | Connexion réussie/échouée, création de compte, changement de mot de passe |
| **Application Logs** | Activités propres à une application | Erreur dans un logiciel, clic utilisateur, mise à jour |
| **Audit Logs** | Suivi détaillé des modifications | Qui a accédé à quel fichier ? Qui a modifié une règle de pare-feu ? |
| **Network Logs** | Trafic réseau entrant/sortant | Connexions vers des IP suspectes, ports ouverts, alertes de pare-feu |
| **Access Logs** | Accès à des ressources spécifiques | Qui a visité une page web ? Qui a interrogé une base de données ? |

> 💡 **Astuce** : Si tu cherches une connexion utilisateur, va directement dans les **Security Logs**, pas dans les logs système !

---

## 💻 **5. Analyse des logs Windows (Event Viewer)**

Windows stocke ses logs dans un outil intégré appelé **Event Viewer** (Observateur d’événements).

### 🔧 Comment y accéder ?
1. Clique sur **Démarrer**.
2. Tape **"Event Viewer"**.
3. Ouvre l’application.

### 📁 Principaux dossiers de logs dans Windows :
- **Application** : erreurs/logiciels.
- **Système** : noyau, pilotes, services.
- **Sécurité** : **le plus important pour la cybersécurité**.

### 🔎 Structure d’un événement Windows :
Chaque entrée contient :
- **Log Name** : type de log (ex : Security).
- **Event ID** : **code unique** qui identifie l’action.
- **Logged** : date et heure précise.
- **Description** : détails lisibles (nom d’utilisateur, IP, etc.).

---

## 🔢 **6. Event IDs clés à connaître (sécurité Windows)**

| Event ID | Signification |
|--------|----------------|
| **4624** | ✅ Connexion **réussie** |
| **4625** | ❌ Connexion **échouée** (tentative de brute force ?) |
| **4634** | Déconnexion |
| **4720** | Création d’un compte utilisateur |
| **4722** | Compte **activé** |
| **4725** | Compte **désactivé** |
| **4726** | Compte **supprimé** |
| **4724** | Réinitialisation de mot de passe |

> Ces ID sont comme des **codes-barres** : ils te permettent de filtrer rapidement ce qui t’intéresse.

---

## 🔍 **7. Comment filtrer les logs dans Event Viewer ?**

1. Dans **Event Viewer**, clique droit sur **"Security"** (ou autre log).
2. Choisis **"Filter Current Log..."**.
3. Dans le champ **"Event IDs"**, tape par exemple : `4624, 4625`.
4. Clique **OK** → tu vois **uniquement** les connexions réussies et échouées.

👉 Cela permet d’**accélérer l’investigation** sans lire des milliers de lignes inutiles.

---

