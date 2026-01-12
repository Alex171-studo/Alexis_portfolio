## 📘 **Cours : enum4linux – Énumération SMB**

### 🔹 1. **Qu’est-ce que enum4linux ?**
`enum4linux` est un **outil de reconnaissance** écrit en Perl qui permet d’extraire des informations depuis des serveurs **SMB (Server Message Block)** ou **Samba**.

Il exploite diverses commandes système comme :
- `nmblookup`
- `net`
- `rpcclient`
- `smbclient`

… pour automatiser l’énumération de :
- Utilisateurs
- Groupes
- Partages réseau
- Politiques de mot de passe
- Domaines/workgroups

> 💡 **SMB** est le protocole utilisé pour partager fichiers, imprimantes, etc. sur un réseau local (port **445/TCP**, parfois **139/TCP**).

---

### 🔹 2. **Pourquoi l’utiliser ?**
Dans les tests d’intrusion ou CTF (Capture The Flag), les serveurs SMB mal configurés peuvent fuiter :
- Des **listes d’utilisateurs** → utile pour brute-force
- Des **partages accessibles anonymement** → accès à des fichiers sensibles
- Des **noms de machine/domaine** → aide à la cartographie du réseau

> ⚠️ Beaucoup de machines CTF (ex: "Relevant", "Legacy", "Blue") ont des vulnérabilités ou mauvaises configurations SMB.

---

### 🔹 3. **Installation**
Sur Kali Linux ou Parrot :
```bash
sudo apt install enum4linux
```

Ou depuis GitHub (version plus récente) :
```bash
git clone https://github.com/CiscoCXSecurity/enum4linux.git
```

---

### 🔹 4. **Syntaxe de base**
```bash
enum4linux [options] <IP_cible>
```

#### Options courantes :
| Option | Description |
|-------|-------------|
| `-a` | Exécute **toutes** les vérifications (équivalent à `-U -S -G -P -o -n`) |
| `-U` | Énumère les **utilisateurs** |
| `-S` | Énumère les **partages (shares)** |
| `-G` | Énumère les **groupes** |
| `-P` | Récupère les **politiques de mot de passe** |
| `-n` | Effectue une **recherche NetBIOS** |
| `-o` | Détecte le **système d’exploitation** |
| `-r` | Énumère les **relations de confiance** (trusts) |
| `-v` | Mode verbeux |

> ✅ En CTF, on utilise presque toujours **`-a`** pour tout récupérer d’un coup.

---

### 🔹 5. **Exemple concret**
```bash
enum4linux -a 10.65.157.250
```

Cela va :
1. Vérifier si SMB est actif
2. Lister le **workgroup/domaine**
3. Tenter une **connexion anonyme**
4. Si possible, lister :
   - Les **partages** (`IPC$`, `ADMIN$`, `C$`, ou partages personnalisés)
   - Les **noms d’utilisateurs** via `RID cycling`
   - Les **membres des groupes**
   - La **longueur minimale du mot de passe**, s’il expire, etc.

---

### 🔹 6. **Interprétation des résultats clés**

#### ✅ **Partages accessibles**
```
Sharename       Type      Comment
---------       ----      -------
IPC$            IPC       Remote IPC
development     Disk
```
→ Si tu vois un partage comme `development`, **accède-y avec `smbclient`** :
```bash
smbclient //10.65.157.250/development -N
```
(`-N` = pas de mot de passe → connexion anonyme)

#### ✅ **Utilisateurs trouvés**
```
index: 0x3e8 RID: 0x3e8 ACB: 0x00000010 Account: jan
```
→ Confirme que le compte **`jan` existe** → parfait pour SSH brute-force ciblé.

#### ✅ **Connexion anonyme autorisée**
```
Anonymous login successful
```
→ Très bon signe ! Tu peux souvent lire des fichiers sans auth.

#### ❌ **Accès refusé / "NT_STATUS_ACCESS_DENIED"**
→ Le serveur bloque les requêtes anonymes. Tu devras peut-être utiliser un compte valide (mais rare en CTF débutant).

---

### 🔹 7. **Cas d’usage typique en CTF**
1. Tu trouves dans un fichier web : *"SMB has been configured"* → piste !
2. Tu lances `enum4linux -a <IP>`
3. Tu découvres un partage `confidential` accessible anonymement
4. Tu utilises `smbclient` pour te connecter
5. Tu télécharges un fichier `creds.txt` contenant un mot de passe
6. Tu te connectes en SSH avec ces identifiants

---

### 🔹 8. **Limites & alternatives modernes**
- `enum4linux` est un peu ancien (dernière maj ~2019).
- Alternative plus récente : **`enum4linux-ng`** (en Python, plus fiable) :
  ```bash
  pip3 install enum4linux-ng
  enum4linux-ng -A 10.65.157.250
  ```

Mais `enum4linux` reste très utilisé car **préinstallé** et **efficace** sur les CTF classiques.

---

### 🔹 9. **Bonnes pratiques**
- Toujours tester **l’accès anonyme** d’abord.
- Sauvegarder la sortie avec `| tee rapport.log`.
- Croiser les infos avec `nmap -p 445 --script smb-*`.
- Si tu trouves des utilisateurs, les utiliser pour brute-force **SSH** ou **SMB**.

