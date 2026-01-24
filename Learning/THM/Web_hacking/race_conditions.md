# Race Conditions

## 🔹 1. Concepts Fondamentaux 

### 📌 Programme
Un **programme** est un ensemble statique d’instructions stockées sur disque.  
Exemple : le fichier `app.py` contenant ton code Flask.

> ⚠️ Un programme ne fait **rien** tant qu’il n’est pas exécuté.

### 📌 Processus
Un **processus** est une **instance en cours d’exécution** d’un programme.  
Il possède :
- Son propre espace mémoire (isolé des autres processus)
- Son propre compteur de programme (PC), pile, registres, etc.
- Un état (New → Ready → Running → Waiting → Terminated)

> 💡 Exemple : quand tu lances `python app.py`, le système crée un **processus** qui exécute ce programme.

### 📌 Thread
Un **thread** est une **unité d’exécution légère** à l’intérieur d’un processus.  
Tous les threads d’un même processus **partagent** :
- Le code
- Les données globales
- Le tas (heap)
- Les fichiers ouverts

Mais chaque thread a :
- Sa propre pile (stack)
- Son propre registre de programme

> ☕ Analogie café :  
> - Le **processus** = la machine à café allumée  
> - Chaque **thread** = un portafiltre en action  
> Plusieurs cafés peuvent être préparés **en parallèle** sur la même machine.

### 📌 Multithreading
Le **multithreading** permet à un processus de gérer **plusieurs tâches simultanément**.  
Dans les serveurs web (Flask, Gunicorn, etc.), cela signifie que **plusieurs requêtes HTTP** peuvent être traitées **en même temps**.

> ⚠️ C’est là que naît le danger : si deux threads accèdent/modifient **la même donnée partagée**, sans synchronisation → **race condition**.

---

## 🔹 2. Qu’est-ce qu’une Race Condition ?

### 📌 Définition formelle
Une **race condition** se produit lorsqu’un comportement du système dépend de **l’ordre ou du timing relatif** de plusieurs événements concurrents (ex. : deux threads lisant/écrivant une variable partagée).

> 🎯 **Le cœur du problème** : une opération **non atomique** composée de plusieurs étapes (lecture → calcul → écriture) peut être **interrompue** entre ces étapes.

### 📌 TOCTOU (Time-of-Check to Time-of-Use)
C’est une sous-catégorie critique de race condition :
- Le système **vérifie** une condition (ex. : solde ≥ 50 €)
- Puis **utilise** cette condition pour agir
- Mais **entre les deux**, un autre thread a modifié la donnée

> 🧨 Résultat : la vérification est **obsolète** au moment de l’action.

---

## 🔹 3. Analogies Réelles

### 🍽️ Restaurant & Table 17
- Deux hôtes réservent **la même table** en même temps
- Aucun ne voit l’autre mettre la pancarte “Réservé”
- Résultat : **double réservation**

> Même logique qu’un coupon appliqué deux fois.

### 💳 Banque & Retraits Concurrents
Compte : **100 €**

| Thread | Action |
|--------|--------|
| T1     | Lit solde = 100 € |
| T2     | Lit solde = 100 € |
| T1     | Retire 45 € → nouveau solde = 55 € |
| T2     | Retire 35 € → nouveau solde = **65 €** (car il pensait que le solde était encore 100 €) |

> 💥 Total retiré : 80 €, mais solde final = 65 € → **15 € ont disparu !**

---

## 🔹 4. Code Vulnérable : Exemple Concret en Python

```python
import threading

balance = 100  # Variable partagée

def withdraw(amount, name):
    global balance
    if balance >= amount:
        print(f"[{name}] Solde suffisant ({balance} ≥ {amount})")
        # ⚠️ Zone critique non protégée
        new_balance = balance - amount
        # Simule un délai (ex. : appel DB, calcul)
        threading.Event().wait(0.01)
        balance = new_balance
        print(f"[{name}] Nouveau solde : {balance}")
    else:
        print(f"[{name}] Refusé : solde insuffisant")

# Lancement de deux retraits concurrents
t1 = threading.Thread(target=withdraw, args=(60, "T1"))
t2 = threading.Thread(target=withdraw, args=(50, "T2"))

t1.start()
t2.start()
t1.join()
t2.join()

print(f"Solde final : {balance}")
```

### 🔥 Résultat possible :
```
[T1] Solde suffisant (100 ≥ 60)
[T2] Solde suffisant (100 ≥ 50)
[T1] Nouveau solde : 40
[T2] Nouveau solde : 50   ← ERREUR ! Le solde devrait être -10 ou refusé
Solde final : 50
```

> ❌ Deux retraits autorisés alors que le total dépasse le solde.

---

## 🔹 5. Application Web : Coupon ou Carte-Cadeau

Imaginons une API :

```http
POST /apply-coupon
{
  "coupon_code": "GIFT10",
  "user_id": 123
}
```

### Logique métier (vulnérable) :
1. Vérifier si le coupon existe et n’a pas été utilisé
2. Si oui, appliquer la réduction
3. Marquer le coupon comme "utilisé"

### Problème :
Si deux requêtes arrivent **en même temps** :
- Les deux passent l’étape 1 (coupon non utilisé)
- Les deux appliquent la réduction
- Les deux marquent le coupon comme utilisé → **mais trop tard**

> 💸 Résultat : un coupon de **10 €** utilisé **10 fois** → perte financière.

---

## 🔹 6. Exploitation avec Burp Suite

### Étapes :
1. Intercepter une requête valide (`POST /apply-coupon`)
2. Envoyer à **Repeater**
3. Créer un **groupe de 20 requêtes identiques**
4. Utiliser **"Send group in parallel"**

### Pourquoi ça marche ?
- Burp utilise la technique **last-byte sync** (HTTP/1.1) :
  - Envoie toutes les requêtes **sauf le dernier octet**
  - Puis envoie **tous les derniers octets en rafale**
  - → Toutes les requêtes arrivent **quasi-simultanément** au serveur

### Résultat observé :
- 20 requêtes → 20 réductions appliquées
- Le serveur n’a **pas eu le temps** de marquer le coupon comme utilisé entre les requêtes

> 🛠️ Outil clé : **Burp Suite Professional** (fonctionnalité "Request Grouping")

---

## 🔹 7. Architecture Web & États Cachés

Une application web semble avoir **2 états** :
- Coupon non appliqué
- Coupon appliqué

Mais en réalité, il y a **des états intermédiaires** :
1. Reçu la requête
2. Vérification en cours (DB query)
3. Validation OK
4. Application de la réduction
5. Mise à jour du statut du coupon

> ⏱️ **Fenêtre de vulnérabilité** = entre (2) et (5)

Si une deuxième requête arrive **pendant cette fenêtre**, elle repasse par (2) → voit encore "non utilisé".

---

## 🔹 8. Causes Profondes

| Cause | Explication |
|------|-------------|
| **Accès concurrent à ressources partagées** | Base de données, variables globales, fichiers |
| **Opérations non atomiques** | Lecture → modification → écriture |
| **Absence de verrous (locks)** | Pas de mécanisme pour sérialiser l’accès |
| **Transactions mal configurées** | Niveau d’isolation trop faible (ex. : READ COMMITTED au lieu de SERIALIZABLE) |
| **API tierces non idempotentes** | Appel externe qui ne gère pas la duplication |

---

## 🔹 9. Mitigation : Comment se protéger ?

### ✅ 1. Verrous (Locks)
```python
import threading

lock = threading.Lock()

def withdraw(amount):
    global balance
    with lock:  # Seul thread autorisé ici
        if balance >= amount:
            balance -= amount
        else:
            raise Exception("Insufficient funds")
```

### ✅ 2. Opérations Atomiques en Base de Données
Utiliser des requêtes **atomiques** :
```sql
UPDATE coupons 
SET used = TRUE 
WHERE code = 'GIFT10' AND used = FALSE;

-- Vérifier ROW_COUNT() == 1 → succès
```

> 🛡️ Si `used = TRUE`, la requête ne modifie **aucune ligne** → échec silencieux.

### ✅ 3. Transactions avec Isolation SERIALIZABLE
```python
with db.transaction(isolation_level="SERIALIZABLE"):
    coupon = db.query("SELECT * FROM coupons WHERE code = ? AND used = FALSE", code)
    if coupon:
        apply_discount()
        db.execute("UPDATE coupons SET used = TRUE WHERE id = ?", coupon.id)
```

### ✅ 4. Idempotence
Concevoir les API pour être **idempotentes** :
- Même requête envoyée 100 fois → même effet qu’une seule fois
- Utiliser des **ID de requête unique** (`X-Request-ID`) pour dédupliquer

### ✅ 5. Rate Limiting & Anti-Automation
- Limiter les requêtes par utilisateur/seconde
- Détecter les comportements anormaux (ex. : 20 requêtes en 10 ms)

---

## 🔹 10. Pour Toi, Alexis (Pentester en Devenir)

Tu suis **Web Application Pentesting** et **Red Teaming** sur TryHackMe → cette vulnérabilité est **critique** dans les CTFs et audits réels.

### 🔍 À tester :
- Paiements, transferts, votes, likes, réservations
- Toute fonctionnalité avec **état limité** ("une fois", "solde", "quota")

### 🛠️ Outils :
- **Burp Suite Repeater** (group + parallel)
- **Turbo Intruder** (plus puissant, scriptable en Python)
- **ffuf** ou **parallel** pour attaques custom

### 📚 Bonnes pratiques :
- Toujours chercher les **états intermédiaires**
- Mesurer le **temps de réponse** : si > 100 ms → fenêtre exploitable
- Tester avec **2, 10, 50, 100 requêtes en parallèle**

