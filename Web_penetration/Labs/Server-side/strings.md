# 📘 Strings en JavaScript

## 1. Définition

Une **string** est une **séquence immuable de caractères**.
Elle peut être déclarée avec des **guillemets simples**, **doubles** ou des **backticks**.

```js
const a = "hello";
const b = "hello";
const c = `hello`;
```

L’**immutabilité** signifie qu’une string ne peut pas être modifiée après création :
toute opération renvoie une _nouvelle_ string.

---

## 2. Accès aux caractères

Les caractères sont accessibles par **index**, en utilisant des **crochets**.
L’indexation démarre à **0**.

```js
const developer = "Jessica";
developer[0]; // J
```

---

## 3. Caractères spéciaux

### Nouvelle ligne : `\n`

```js
const poem = "Roses are red,\nViolets are blue.";
```

### Échappement

On utilise `\` pour échapper des guillemets ou caractères spéciaux.

```js
const s = 'She said, "Hello!"';
```

---

## 4. Template Literals et Interpolation

Les **template literals** (backticks) facilitent la composition de chaînes.

```js
const name = "Jessica";
const greeting = `Hello, ${name}!`; // "Hello, Jessica!"
```

Ils permettent :

- l’interpolation (`${...}`)
- des strings multilignes
- l’inclusion d'expressions

---

## 5. ASCII, `charCodeAt()` et `fromCharCode()`

### ASCII

Norme de codage associant à chaque caractère un **code numérique**.

### `charCodeAt()`

Renvoie le code ASCII/UTF-16 du caractère à un index donné.

```js
"A".charCodeAt(0); // 65
```

### `fromCharCode()`

Convertit un code en caractère.

```js
String.fromCharCode(65); // "A"
```

---

## 6. Méthodes courantes des strings

### `indexOf()`

Cherche un sous-texte et renvoie son index, ou `-1` s’il n’existe pas.

```js
text.indexOf("fox"); // 16
```

### `includes()`

Renvoie `true` si le sous-texte est trouvé.

```js
text.includes("fox"); // true
```

### `slice(start, end?)`

Extrait une portion sans modifier l’original.

```js
"freeCodeCamp".slice(0, 4); // "free"
```

### Changement de casse

```js
"Hello".toUpperCase(); // "HELLO"
"HELLO".toLowerCase(); // "hello"
```

### `replace()` et `replaceAll()`

- `replace()` modifie seulement la **première** occurrence.
- `replaceAll()` modifie **toutes** les occurrences.

```js
"I like cats".replace("cats", "dogs"); // "I like dogs"
"I like cats, cats".replaceAll("cats", "dogs"); // "I like dogs, dogs"
```

### `repeat()`

Répète une string _n_ fois.

```js
"Hi".repeat(3); // "HiHiHi"
```

### Méthodes de nettoyage d'espaces

- `trim()` : début + fin
- `trimStart()` : début
- `trimEnd()` : fin

```js
"  Hello  ".trim(); // "Hello"
```

---

## 7. `prompt()` (API du navigateur)

Affiche une boîte de dialogue demandant une saisie utilisateur.

```js
const answer = prompt("What's your favorite animal?");
```
