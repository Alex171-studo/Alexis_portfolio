 # 💀 John the Ripper : Le Guide Ultime du Pentester

## 🧠 1. Comprendre le Hachage
Un hash n'est pas un chiffrement, c'est une empreinte unidirectionnelle. La sécurité repose sur la complexité algorithmique :
*   **P (Facile) :** Calculer le hash de "password" est instantané.
*   **NP (Difficile) :** Retrouver "password" à partir de son hash est un problème complexe qui nécessite de tester des milliards de combinaisons.

> 💡 **John the Ripper (JtR)** automatise ce processus en comparant des millions de hashs de candidats (dictionnaires) avec votre cible.

---

## 🚀 2. Configuration & Syntaxe de Base

### Emplacement des Wordlists
La liste la plus célèbre est `rockyou.txt`. Pour des listes plus exhaustives, utilisez [SecLists](https://github.com/danielmiessler/SecLists).
*   **Kali Linux :** `/usr/share/wordlists/rockyou.txt`

### Commandes Fondamentales
```bash
# Attaque basique avec dictionnaire
john --wordlist=/path/to/wordlist.txt hash.txt

# Spécifier un format précis (recommandé)
john --format=raw-md5 --wordlist=rockyou.txt hash.txt

# Lister les formats supportés
john --list=formats | grep -i "sha1"
```

---

## 🔍 3. Identification du Hash
Si John ne détecte pas automatiquement le type de hash, utilisez ces outils :
1.  **En ligne :** [Hashes.com](https://hashes.com/en/tools/hash_identifier)
2.  **CLI :** `hash-identifier` ou `hashid`
3.  **Interne :** `john --list=formats`

---

## 🖥️ 4. Attaques Spécifiques par Système

### 🪟 Windows (NTLM / NThash)
Windows stocke les mots de passe en NTLM (MD4 en UTF-16LE). Récupérables via **Mimikatz** ou dump de la base **SAM**.
```bash
john --format=nt --wordlist=rockyou.txt ntlm_hashes.txt
```

### 🐧 Linux (/etc/shadow)
John a besoin du fichier `/etc/passwd` pour le contexte et du `/etc/shadow` pour les hashs.
1.  **Fusionner les fichiers :**
    ```bash
    unshadow /etc/passwd /etc/shadow > local_john.txt
    ```
2.  **Cracker :**
    ```bash
    john --format=sha512crypt --wordlist=rockyou.txt local_john.txt
    ```

---

## 📂 5. Extraction de Hashs (Fichiers & Clés)
Avant de cracker, il faut convertir le fichier cible en un format lisible par John.

| Cible | Outil de conversion | Commande de cracking |
| :--- | :--- | :--- |
| **Archive ZIP** | `zip2john test.zip > zip.hash` | `john zip.hash` |
| **Archive RAR** | `rar2john test.rar > rar.hash` | `john rar.hash` |
| **Clé SSH** | `ssh2john test.id_rsa > ssh.hash` | `john ssh.hash` |

---

## ⚡ 6. Modes d'Attaque Avancés

### Single Crack Mode
Utilise les informations de l'utilisateur (Username, GECOS comme le nom réel ou téléphone) pour générer des variations intelligentes.
*   **Logique :** Si l'user est "Mike", John testera "Mike123", "M1ke!", etc.
```bash
john --single --format=sha512crypt hash.txt
```

### Custom Rules (Mangling)
Vous pouvez définir vos propres règles de transformation dans `john.conf` pour ajouter des caractères spéciaux ou des années à la fin de chaque mot du dictionnaire.
```bash
# Utilisation d'une règle personnalisée
john --wordlist=words.txt --rules=MyCustomRule hash.txt
```

---

## 🛠️ 7. Boîte à outils du Pentester
*   **HashID :** Identifier le type de hash.
*   **Mimikatz :** Extraction de hashs Windows en mémoire.
*   **Impacket-secretsdump :** Extraction à distance des hashs NTDS.dit.
*   **Hashcat :** Alternative ultra-rapide utilisant la puissance du GPU.

---

## 📝 8. Résumé des commandes
| Action | Commande |
| :--- | :--- |
| **Dictionnaire** | `john --wordlist=[path] [file]` |
| **Voir le mot de passe trouvé** | `john --show [file]` |
| **Forcer le format** | `--format=[format-name]` |
| **Mode intelligent** | `--single` |
