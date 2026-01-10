Tableaux JavaScript

## 1. Bases des tableaux
- Collection ordonnée indexée à partir de **0**.
- Les éléments peuvent être de types variés.
- Accès via `array[index]`.
- La propriété `length` donne la taille du tableau.

```js
const developers = ["Jessica", "Naomi", "Tom"];
developers[0]; // "Jessica"
developers.length; // 3
````

## 2. Mise à jour des éléments

```js
const fruits = ['apple', 'banana', 'cherry'];
fruits[1] = 'blueberry';
```

## 3. Tableaux à deux dimensions

* Tableau de tableaux (structure en grille).

```js
console.log(chessboard[0][3]); // "Q"
```

## 4. Déstructuration des tableaux

Permet d’extraire des valeurs rapidement.

```js
const fruits = ["apple", "banana", "orange"];
const [first, second, third] = fruits;
```

### Rest operator

```js
const [a, b, ...rest] = ["apple", "banana", "orange", "mango"];
```

## 5. Méthodes courantes

### push()

Ajoute à la fin du tableau.

```js
desserts.push("ice cream");
```

### pop()

Retire le dernier élément.

```js
desserts.pop();
```

### shift()

Retire le premier élément.

```js
desserts.shift();
```

### unshift()

Ajoute au début.

```js
desserts.unshift("ice cream");
```

### indexOf()

Retourne le premier index trouvé.

```js
fruits.indexOf("banana"); // 1
```

### splice()

Ajoute ou retire des éléments.

```js
colors.splice(1, 0, "yellow", "purple");
```

### includes()

Teste la présence d’un élément.

```js
programmingLanguages.includes("Python"); // true
```

### concat()

Fusionne deux tableaux (nouveau tableau créé).

```js
const newList = programmingLanguages.concat("Perl");
```

### slice()

Retourne une copie partielle (shallow copy).

```js
const newList = languages.slice(1);
```

### Spread syntax

Copie superficielle :

```js
const copy = [...originalArray];
```

### split()

Chaîne → tableau.

```js
"h e l l o".split("");
```

### reverse()

Inverse l’ordre (mutation).

```js
desserts.reverse();
```

### join()

Tableau → chaîne.

```js
["o", "l", "l", "e", "h"].join(""); // "olleh"
```
```