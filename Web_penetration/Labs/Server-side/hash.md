# ⚡ OPÉRATION : MAÎTRISE DU HACHAGE ⚡
> **Cible** : Chercheur en sécurité / Pentester  
> **Objectif** : Maîtriser les fonctions cryptographiques à sens unique pour l'Intégrité, l'Authentification et le Cassage.

---

## 💀 1. CONCEPTS DE BASE : L'EMPREINTE NUMÉRIQUE
Une **Fonction de Hachage** est un algorithme mathématique qui transforme des données de taille arbitraire en une chaîne de bits de **taille fixe** (le *Digest*).

### 🔑 Les 4 Piliers du Hachage Cryptographique :
1.  **Déterministe** : Une même entrée produit toujours exactement le même hash.
2.  **Résistance à la pré-image** : Étant donné un hash, il est informatiquement impossible de retrouver l'entrée originale (Sens unique).
3.  **Résistance aux collisions** : Trouver deux entrées différentes produisant le même hash est statistiquement "impossible".
4.  **Effet d'avalanche** : Changer 1 seul bit dans l'entrée $\rightarrow$ le hash complet change radicalement.

> 💡 **Conseil de Hacker** : Si le hash ne semble pas complètement différent après un changement minime, l'algorithme est cassé.

---

## 🛡️ 2. INTÉGRITÉ DES DONNÉES (CHECKSUMS)
Utilisé pour s'assurer qu'un fichier n'a pas été corrompu ou piégé lors du transfert.

### Commandes Rapides :
```bash
# Calculer le SHA256 d'un fichier
sha256sum backup.zip

# Vérifier par rapport à un fichier de checksums
sha256sum -c checksums.txt
```

| Niveau de Sécurité | Algorithme | Statut |
| :--- | :--- | :--- |
| ❌ **CRITIQUE** | MD5 / SHA-1 | **CASSÉ** (Attaques par collision faciles) |
| ✅ **SÉCURISÉ** | SHA-256 / SHA-512 | Standard pour l'intégrité |
| 🔥 **ÉLITE** | SHA-3 (Keccak) | Robustesse de nouvelle génération |

---

## 🔐 3. STOCKAGE DES MOTS DE PASSE : L'ART DU SALAGE
Ne stockez jamais de mots de passe en clair ou avec des hashs simples. Les attaquants utilisent des **Rainbow Tables** (bases de données de hashs pré-calculés).

### La Stratégie de Défense :
1.  **Sel (Salt)** : Une chaîne aléatoire ajoutée au mot de passe avant le hachage. Cela rend chaque hash unique, même pour un mot de passe identique.
2.  **Étirement de clé (Key Stretching)** : Utiliser des algorithmes lents pour rendre le brute-force coûteux.

**Algorithmes Recommandés :**
*   **Argon2id** : Vainqueur de la Password Hashing Competition (Le meilleur).
*   **Bcrypt** : Standard de l'industrie, facteur de coût adaptatif.
*   **Scrypt** : Gourmand en mémoire, résiste au cassage par ASIC/GPU.

---

## 🔨 4. CASSAGE DE HASH (PHASE DE PENTEST)
Lorsque vous extrayez des hashs d'une base de données ou du fichier `/etc/shadow`.

### Outils du Métier :
*   **Hashcat** : Basé sur GPU (Le plus rapide).
*   **John The Ripper** : Basé sur CPU (Idéal pour les formats obscurs).

### Aide-mémoire Syntaxe Hashcat :
```bash
# Mode d'attaque 0 (Dictionnaire) | -m [Type]
hashcat -m 1800 -a 0 shadow_hashes.txt rockyou.txt
```

| Hash Cible | Mode Hashcat (-m) |
| :--- | :--- |
| **MD5** | 0 |
| **NTLM (Windows)** | 1000 |
| **SHA-512 (Unix)** | 1800 |
| **Bcrypt** | 3200 |

---

## 🔑 5. HMAC : AUTHENTICITÉ + INTÉGRITÉ
Le **HMAC (Hash-based Message Authentication Code)** utilise une **Clé Secrète** + une **Fonction de Hachage**.
Il prouve que le message n'a pas été modifié ET qu'il provient de quelqu'un connaissant le secret.

*   **Utilisation** : Clés API, JWT (JSON Web Tokens), Webhooks.
*   **Formule** : `HMAC = Hash(Clé + Message)`

---

## 🔄 6. HACHAGE vs ENCODAGE vs CHIFFREMENT
Ne soyez pas un "script kiddie". Apprenez la différence :

| Caractéristique | **Hachage** | **Encodage** | **Chiffrement** |
| :--- | :--- | :--- | :--- |
| **Objectif** | Intégrité / Empreinte | Formatage des données | Confidentialité |
| **Réversible ?** | ❌ Non | ✅ Oui (Sans clé) | ✅ Oui (Avec clé) |
| **Exemple** | SHA-256, Argon2 | Base64, URL Encode | AES, RSA |

> ⚠️ **Attention** : Le Base64 n'est **PAS** une mesure de sécurité. C'est juste une autre façon d'écrire la même donnée.

---

## 🌐 7. LA POIGNÉE DE MAIN SÉCURISÉE (SSL/TLS & PGP)
Comment la crypto asymétrique et symétrique dansent ensemble :

1.  **Identité** : Le serveur envoie son **Certificat** (Clé Publique).
2.  **Confiance** : Le client vérifie le certificat via les Autorités de Certification (CA).
3.  **Échange de Clé** : Le client génère une **Clé Symétrique** aléatoire, la chiffre avec la **Clé Publique** du serveur, et l'envoie.
4.  **Déchiffrement** : Le serveur utilise sa **Clé Privée** pour obtenir la Clé Symétrique.
5.  **Tunnel** : Les deux parties utilisent désormais la **Clé Symétrique** (AES) pour un trafic rapide et chiffré.

---

## 🚀 8. CHECKLIST DU HACKER
- [ ] Utiliser `hashid` ou `hash-identifier` pour détecter les hashs inconnus.
- [ ] Toujours vérifier le `sha256sum` des outils de hacking téléchargés.
- [ ] Comprendre le format `$id$sel$hash` dans le fichier `/etc/shadow` sous Linux.
- [ ] Pour l'OSCP : Maîtriser les attaques par règles avec `hashcat`.

**"En cryptographie nous avons confiance, par les hashs nous vérifions."** 💻

---

## 🔗 9. RESSOURCES UTILES
*   [Exemples de Hashs (Hashcat)](https://hashcat.net/wiki/doku.php?id=example_hashes)
*   [Identification de Hash en ligne](https://hashes.com/en/tools/hash_identifier)
*   [Base de données de déchiffrement](https://hashes.com/en/decrypt/hash)