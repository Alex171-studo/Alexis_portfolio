# Cours : Protocoles de Sécurité Réseau

## 1. TLS (Transport Layer Security)
Le **TLS** est un protocole de sécurité conçu pour sécuriser les communications entre deux machines. Il intervient au niveau de la **couche transport** du modèle OSI.

### Processus d'obtention et d'utilisation d'un certificat
Pour utiliser TLS, un serveur doit posséder un certificat SSL/TLS valide. Voici les étapes :
1. **Génération du CSR** : Le serveur génère une demande de signature de certificat (*Certificate Signing Request*) contenant sa clé publique et ses informations d'identification.
2. **Envoi à la CA** : Le serveur transmet le CSR à une Autorité de Certification (CA).
3. **Signature** : La CA vérifie l'identité du serveur et signe le certificat.
4. **Stockage** : Le serveur reçoit et installe le certificat signé.
5. **Transmission** : Lors d'une connexion, le serveur envoie son certificat au client.
6. **Vérification** : Le client valide l'authenticité du certificat auprès de la CA avant d'établir la session.

---

## 2. HTTPS (HTTP Secure)
Le protocole **HTTPS** est la version sécurisée du protocole HTTP. Il combine HTTP avec une couche de chiffrement **SSL/TLS**.

### Étapes d'établissement de la connexion
1. **Connexion TCP** : Établissement de la liaison de base (Three-way handshake).
2. **Session TLS** : Négociation des algorithmes de chiffrement et échange de clés.
3. **Communication sécurisée** : Transfert des données HTTP chiffrées.

---

## 3. Protocoles de Transfert de Fichiers

### SFTP (Secure File Transfer Protocol)
Protocole de transfert de fichiers sécurisé s'appuyant sur **SSH**.
- **Port par défaut** : 22
- **Exemple d'URL** : `sftp://user:password@host:port`

### FTPS (File Transfer Protocol Secure)
Extension du protocole FTP classique qui ajoute le support du chiffrement **TLS/SSL**.
- **Exemple d'URL** : `ftps://user:password@host:port`

---

## 4. Récapitulatif des Ports Sécurisés

| Protocole | Description | Port(s) |
| :--- | :--- | :--- |
| **HTTPS** | HTTP sécurisé | 443 |
| **SMTPS** | SMTP sécurisé (Email sortant) | 465 & 587 |
| **POP3S** | POP3 sécurisé (Email entrant) | 995 |
| **IMAPS** | IMAP sécurisé (Email entrant) | 993 |