# Protocoles de Messagerie : SMTP, IMAP et POP3

Ce document résume le fonctionnement des principaux protocoles de messagerie électronique et leurs commandes via Telnet.

---

## 1. SMTP (Simple Mail Transfer Protocol)
Utilisé pour l'**envoi** d'emails.
- **Port par défaut :** 25 (TCP)

### Exemple de session Telnet
```bash
telnet smtp.google.com 25
HELO smtp.google.com          # Identification du serveur
MAIL FROM: <alexis@alexis.com> # Expéditeur
RCPT TO: <alexis@alexis.com>   # Destinataire
DATA                          # Début du contenu
Subject: Test                 # Sujet de l'email
Test                          # Corps du message
.                             # Fin de l'email
QUIT                          # Fin de session
```

---

## 2. IMAP (Internet Message Access Protocol)
Utilisé pour l'**accès et la gestion** des emails directement sur le serveur. Permet la synchronisation multi-appareils.
- **Port par défaut :** 143 (TCP)

### Exemple de session Telnet
```bash
telnet imap.google.com 143
LOGIN <user> <password>       # Identification
LIST                          # Lister les dossiers
SELECT INBOX                  # Sélectionner la boîte de réception
FETCH 1                       # Récupérer l'email n°1
MOVE 1 INBOX                  # Déplacer l'email
DELE 1                        # Marquer pour suppression
COPY 1 INBOX                  # Copier l'email
QUIT                          # Fin de session
```

---

## 3. POP3 (Post Office Protocol v3)
Utilisé pour la **récupération** des emails. Généralement, les messages sont téléchargés localement.
- **Port par défaut :** 110 (TCP)

### Exemple de session Telnet
```bash
telnet pop.google.com 110
USER alexis@alexis.com        # Identification utilisateur
PASS alexis                   # Mot de passe
LIST                          # Liste des messages
RETR 1                        # Récupérer l'email n°1
DELE 1                        # Supprimer l'email n°1
QUIT                          # Fin de session (applique les suppressions)
```

---

## 4. Comparaison : IMAP vs POP3

| Caractéristique | IMAP | POP3 |
| :--- | :--- | :--- |
| **Stockage** | Reste sur le serveur | Téléchargé sur le client |
| **Synchronisation** | Oui (multi-appareils) | Non |
| **Suppression** | Manuelle ou via règles | Automatique après téléchargement |
| **Usage idéal** | Accès multi-plateformes | Accès hors-ligne / Stockage limité serveur |

---

## 5. Résumé des Protocoles Réseaux

| Protocole | Transport | Port | Description |
| :--- | :--- | :--- | :--- |
| **TELNET** | TCP | 23 | Administration à distance (non sécurisé) |
| **DNS** | UDP/TCP | 53 | Résolution de noms de domaine |
| **HTTP** | TCP | 80 | Transfert hypertexte |
| **HTTPS** | TCP | 443 | Transfert hypertexte sécurisé (TLS/SSL) |
| **FTP** | TCP | 21 | Transfert de fichiers |
| **SMTP** | TCP | 25 | Envoi d'emails |
| **POP3** | TCP | 110 | Récupération d'emails |
| **IMAP** | TCP | 143 | Consultation/Gestion d'emails |
