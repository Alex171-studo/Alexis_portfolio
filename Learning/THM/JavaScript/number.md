# JavaScript – Cours sur les Nombres, Opérateurs et Logique

## 1. Le type Number

JavaScript utilise le type **Number** pour représenter :

* Les entiers
* Les nombres à virgule flottante
* `Infinity` et `-Infinity`
* `NaN` (Not-a-Number)

`Infinity` apparaît notamment lors d'une division par zéro.
`NaN` représente une valeur numérique invalide :
Ex.: `"Jessica" * 3` → `NaN`.

---

## 2. Opérations arithmétiques

| Opérateur | Nom            | Description                   |
| --------- | -------------- | ----------------------------- |
| `+`       | Addition       | Somme de deux valeurs         |
| `-`       | Soustraction   | Différence entre deux valeurs |
| `*`       | Multiplication | Produit                       |
| `/`       | Division       | Quotient                      |
| `%`       | Reste          | Reste de la division          |
| `**`      | Exponentiation | Puissance                     |

### Division par zéro

```js
console.log(10 / 0); // Infinity
```

---

## 3. Interactions entre nombres et chaînes

* Avec `+` : **concaténation** si l’un des opérandes est une string.
* Avec `-`, `*`, `/` : JavaScript convertit la string en nombre.

```js
5 + "10"   // "510"
"10" - 5   // 5
```

### Cas particuliers

* `null` → 0
* `undefined` → NaN

---

## 4. Priorité et associativité des opérateurs

### Priorité

1. Parenthèses
2. Exponentiation
3. Multiplication / Division
4. Addition / Soustraction

```js
(2 + 3) * 4 // 20
```

### Associativité

* La plupart des opérateurs sont **gauche → droite**
* `**` est **droite → gauche**

```js
2 ** 3 ** 2  // 2 ** 9 = 512
```

---

## 5. Incrémentation et décrémentation

| Forme | Effet                                      |
| ----- | ------------------------------------------ |
| `++x` | Incrémente puis renvoie la nouvelle valeur |
| `x++` | Renvoie l’ancienne valeur puis incrémente  |
| `--x` | Décrémente puis renvoie                    |
| `x--` | Renvoie puis décrémente                    |

---

## 6. Opérateurs d’affectation combinés

| Opérateur | Equivalent   |
| --------- | ------------ |
| `+=`      | `x = x + y`  |
| `-=`      | `x = x - y`  |
| `*=`      | `x = x * y`  |
| `/=`      | `x = x / y`  |
| `%=`      | `x = x % y`  |
| `**=`     | `x = x ** y` |

---

## 7. Booléens et égalité

### Types booléens

Deux valeurs possibles : `true`, `false`.

### Égalité

| Opérateur | Description                     |
| --------- | ------------------------------- |
| `==`      | Égalité avec coercition         |
| `===`     | Égalité stricte sans coercition |
| `!=`      | Différent avec coercition       |
| `!==`     | Différent strict                |

```js
5 == "5"   // true
5 === "5"  // false
```

---

## 8. Comparaisons

| Opérateur | Signification          |
| --------- | ---------------------- |
| `>`       | Strictement plus grand |
| `>=`      | Supérieur ou égal      |
| `<`       | Strictement plus petit |
| `<=`      | Inférieur ou égal      |

---

## 9. Opérateurs unaires

* **+** : conversion en nombre
* **-** : négation
* **!** : inversion booléenne

```js
+"42"   // 42
-4      // -4
!true   // false
```

---

## 10. Opérateurs bit à bit

| Opérateur | Action            |              |
| --------- | ----------------- | ------------ |
| `&`       | AND bit-à-bit     |              |
| `         | `                 | OR bit-à-bit |
| `^`       | XOR bit-à-bit     |              |
| `~`       | NOT bit-à-bit     |              |
| `<<`      | Décalage à gauche |              |
| `>>`      | Décalage à droite |              |

---

## 11. Conditions, truthy/falsy, opérateur ternaire

### Truthy

Toutes les valeurs sauf :
`0, NaN, "", null, undefined, false`.

### if / else if / else

```js
if (score >= 90) {
  // ...
} else if (score >= 80) {
  // ...
}
```

### Opérateur ternaire

```js
const météo = temperature > 25 ? "chaud" : "frais";
```

---

## 12. Opérateurs logiques

### AND — `&&`

* Retourne la **première valeur falsy**
* Sinon retourne la dernière valeur

### OR — `||`

* Retourne la **première valeur truthy**

### Coalescence nulle — `??`

* Ne remplace que `null` ou `undefined`

```js
theme = user.theme ?? "light";
```

---

## 13. L’objet Math

| Méthode                     | Description                   |
| --------------------------- | ----------------------------- |
| `Math.random()`             | Nombre aléatoire entre 0 et 1 |
| `Math.max()` / `Math.min()` | Max / min                     |
| `Math.ceil()`               | Arrondi supérieur             |
| `Math.floor()`              | Arrondi inférieur             |
| `Math.round()`              | Arrondi classique             |
| `Math.trunc()`              | Tronque                       |
| `Math.sqrt()`               | Racine carrée                 |
| `Math.cbrt()`               | Racine cubique                |
| `Math.abs()`                | Valeur absolue                |
| `Math.pow(a,b)`             | Puissance                     |

---

## 14. Méthodes utiles sur les nombres

### isNaN() et Number.isNaN()

`Number.isNaN()` est **plus fiable** car sans coercition.

### parseFloat()

Extrait un flottant depuis une string.

### parseInt()

Extrait un entier, s’arrête au premier caractère non numérique.

### toFixed()

Formate un nombre avec un nombre défini de décimales.

```js
(3.14159).toFixed(2); // "3.14"
```
