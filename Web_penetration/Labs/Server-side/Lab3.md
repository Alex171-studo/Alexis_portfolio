# 🧪 Lab PortSwigger – 2FA simple bypass

## 🎯 Objectif

Exploiter une faiblesse dans le mécanisme d’authentification à deux facteurs (2FA) pour accéder à un compte sans fournir le code de vérification.

---

## 🧩 Contexte

- Fonctionnalité observée : formulaire de connexion avec étape 2FA.
- Problème : l’application exige un code de vérification envoyé par mail, mais il est possible d’accéder directement aux pages protégées en contournant l’étape 2FA.
- Vulnérabilité : **2FA bypass**.

---

## 🚀 Proof of Concept (PoC)

1. Connexion avec les identifiants valides de la victime.
2. Au lieu de saisir le code 2FA, accéder directement à l’URL de la ressource protégée (`/my-account`).
3. Résultat : accès accordé sans validation du code de vérification.

---

## ⚠️ Impact

- Un attaquant qui vole ou devine des identifiants peut se connecter sans jamais passer par la 2FA.
- Cela annule complètement la protection offerte par le mécanisme 2FA.
- Risque : compromission totale du compte utilisateur.

Gravité estimée : **Critique (CVSS ~9.0)**.

---

<!-- ## 📸 Preuves

- Capture d’écran montrant la tentative de connexion sans code 2FA.
- Capture d’écran montrant l’accès direct à la ressource protégée. -->

---

## 🔒 Remédiation

- Vérifier côté serveur que l’étape 2FA est validée avant d’autoriser l’accès aux ressources.
- Implémenter une **politique stricte de 2FA** :
  - Génération de tokens temporaires.
  - Expiration rapide des codes.
  - Vérification obligatoire avant toute action sensible.
- Bloquer l’accès direct aux pages protégées sans validation du code.

---

## 📌 Résumé

- **Vulnérabilité :** 2FA bypass (authentification faible)
- **Impact :** Compromission totale des comptes utilisateurs malgré la présence d’un mécanisme 2FA
- **Gravité :** Critique
- **Outils utilisés :** Burp Suite, navigateur
- **Niveau de difficulté :** ⭐⭐✩✩✩
