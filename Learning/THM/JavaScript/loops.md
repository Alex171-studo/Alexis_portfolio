# 🌀 Cours : Les Boucles en JavaScript

Les **boucles** permettent d’exécuter plusieurs fois un bloc d’instructions. Elles sont essentielles pour automatiser des tâches répétitives et manipuler efficacement des données.

---

## ## 1. La boucle `for`

### **Principe**

La boucle `for` permet de répéter un bloc de code un nombre déterminé de fois.
Elle comporte trois parties :

1. **Initialisation** : exécutée une seule fois au début (souvent un compteur).
2. **Condition** : évaluée avant chaque itération. Si `true`, l’itération continue.
3. **Mise à jour** : exécutée après chaque itération (incrémentation ou décrémentation).

### **Syntaxe**

```js
for (initialisation; condition; miseAJour) {
  // code exécuté à chaque itération
}
```

### **Exemple**

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

---

## ## 2. La boucle `for...of`

### **Principe**

Elle permet d’itérer **sur les valeurs** d’un élément **itérable**, comme :

* les tableaux,
* les chaînes de caractères,
* les objets `Map`, `Set`, etc.

### **Exemple**

```js
const numbers = [1, 2, 3, 4, 5];

for (const num of numbers) {
  console.log(num);
}
```

---

## ## 3. La boucle `for...in`

### **Principe**

Elle sert à parcourir les **propriétés énumérables** d’un **objet**.
Elle renvoie les **noms des propriétés**, pas leurs valeurs.

> ⚠️ Inclut aussi les propriétés héritées : donc à utiliser avec prudence.

### **Exemple**

```js
const fruit = {
  name: 'apple',
  color: 'red',
  price: 0.99
};

for (const prop in fruit) {
  console.log(fruit[prop]);
}
```

---

## ## 4. La boucle `while`

### **Principe**

Elle répète un bloc de code **tant que la condition est vraie**.
La condition est vérifiée **avant** chaque itération.

### **Exemple**

```js
let i = 5;

while (i > 0) {
  console.log(i);
  i--;
}
```

---

## ## 5. La boucle `do...while`

### **Principe**

Elle exécute d'abord le bloc de code **au moins une fois**, puis vérifie la condition.
C’est donc la seule boucle qui garantit une exécution minimum.

### **Exemple**

```js
let userInput;

do {
  userInput = prompt("Please enter a number between 1 and 10");
} while (Number(userInput) < 1 || Number(userInput) > 10);

alert("You entered a valid number!");
```

---

## ## 6. Les instructions `break` et `continue`

### 🔹 **`break`**

Permet de **quitter une boucle immédiatement**, même si la condition n’est pas encore fausse.

```js
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}
// Affiche : 0, 1, 2, 3, 4
```

### 🔹 **`continue`**

Permet de **sauter une itération**, mais la boucle continue avec la suivante.

```js
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i);
}
// Affiche : 0, 1, 2, 3, 4, 6, 7, 8, 9
```

