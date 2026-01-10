# 🔐 Cryptographie Asymétrique & PKI

## 🏗️ 1. RSA : Le Pilier de l'Asymétrique

RSA repose sur la difficulté de la **factorisation de grands nombres entiers**.

### 🧮 Le Concept Mathématique
*   **Facile :** Multiplier deux nombres premiers $p \times q = n$.
*   **Difficile :** Retrouver $p$ et $q$ à partir de $n$ (si $n$ est très grand, ex: 2048 bits).

### 🛠️ Fonctionnement en 3 étapes
1.  **Génération :**
    *   $n = p \times q$
    *   $\phi(n) = (p-1)(q-1)$
    *   $e$ (exposant public) choisi tel que $gcd(e, \phi(n)) = 1$
    *   $d$ (clé privée) tel que $e \times d \equiv 1 \pmod{\phi(n)}$
2.  **Chiffrement :** $c = m^e \pmod n$
3.  **Déchiffrement :** $m = c^d \pmod n$

> 💡 **Exemple :** $p=157, q=199 \implies n=31243$. Si $m=13$ et $e=163$, alors $c=16341$.

---

## 🤝 2. Diffie-Hellman (DH) : L'Échange de Clés

L'objectif est de créer un secret partagé sur un canal non sécurisé sans jamais transmettre le secret lui-même.

### 🤯 Le "Coup de Génie"
Basé sur le **problème du logarithme discret** :
1.  Alice et Bob conviennent d'un nombre premier $p$ et d'une base $g$.
2.  Alice choisit un secret $a$, Bob choisit $b$.
3.  Alice envoie $A = g^a \pmod p$.
4.  Bob envoie $B = g^b \pmod p$.
5.  **Secret commun :** Alice calcule $B^a \pmod p$ et Bob calcule $A^a \pmod p$. Les deux obtiennent $g^{ab} \pmod p$.

---

## ✍️ 3. Signatures & Certificats

La cryptographie ne sert pas qu'à cacher, elle sert aussi à **prouver**.

*   **Signature Numérique :** On chiffre le **hash** d'un document avec sa **clé privée**. N'importe qui avec la clé publique peut vérifier l'intégrité et l'origine.
*   **Certificat (X.509) :** Une "carte d'identité" numérique liant une clé publique à une identité, signée par une **Autorité de Certification (CA)**.
*   **Chaîne de Confiance :** Navigateur ➔ CA Racine ➔ CA Intermédiaire ➔ Certificat du Site.

---

## 🛠️ 4. Guide Pratique & CTF

### 🐧 SSH (Secure Shell)
*   **Clé Privée :** Votre identité (`chmod 600 id_rsa`).
*   **Clé Publique :** À copier sur le serveur dans `~/.ssh/authorized_keys`.
*   **Fingerprint :** Vérifié à la première connexion pour éviter les attaques Man-in-the-Middle.

### 🔐 GPG (GNU Privacy Guard)
Outil standard pour chiffrer des fichiers et des emails.
```bash
# Importer une clé
gpg --import key.asc

# Déchiffrer un fichier
gpg --decrypt secret.gpg

# Cracker une passphrase GPG
gpg2john private.key > hash
john --wordlist=rockyou.txt hash
```

---

## 🧠 Résumé pour l'Examen / CTF

| Concept | Sécurité basée sur... | Usage principal |
| :--- | :--- | :--- |
| **RSA** | Factorisation ($p \times q$) | Chiffrement & Signature |
| **Diffie-Hellman** | Logarithme discret | Échange de clés (TLS/SSH) |
| **AES** | Substitution/Permutation | Chiffrement de masse (Rapide) |
| **ECC** | Courbes elliptiques | Clés plus courtes, même sécurité |

### 🧰 Boîte à outils indispensable
*   **[RsaCtfTool](https://github.com/Ganapati/RsaCtfTool)** : L'outil ultime pour attaquer RSA.
*   **[Factordb](https://factordb.com/)** : Base de données de nombres déjà factorisés.
*   **OpenSSL** : Pour manipuler certificats et clés en ligne de commande.
```bash
# Extraire des infos d'un certificat
openssl x509 -in cert.pem -text -noout
```
---
_Document généré pour l'apprentissage de la cryptographie appliquée._
