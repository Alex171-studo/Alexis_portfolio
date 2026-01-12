# JavaScript – Cours sur les Objets

## 1. Introduction aux Objets

Un objet est une structure de données composée de **propriétés**, formées d’une **clé** et d’une **valeur**.
On utilise deux syntaxes principales pour accéder aux données :

* **Dot notation** : `objet.propriete`
* **Bracket notation** : `objet["propriete"]`

### Exemple

```js
const person = {
  name: "Alice",
  age: 30,
  city: "New York"
};

console.log(person.name);      // Alice
console.log(person["name"]);   // Alice
```

---

## 2. Modifier ou Ajouter des Propriétés

On peut attribuer une valeur à une propriété existante ou en créer une nouvelle.

### Exemple

```js
const person = {
  name: "Alice",
  age: 30
};

person.job = "Engineer";
person["hobby"] = "Knitting";

console.log(person);
// {name: 'Alice', age: 30, job: 'Engineer', hobby: 'Knitting'}
```

---

## 3. Supprimer une Propriété : `delete`

Le mot-clé `delete` supprime une propriété et rend son accès ultérieur `undefined`.

### Exemple

```js
const person = {
  name: "Alice",
  age: 30,
  job: "Engineer"
};

delete person.job;
console.log(person.job); // undefined
```

---

## 4. Vérifier l’Existence d’une Propriété

### Méthode **hasOwnProperty()**

Renvoie `true` si la propriété existe directement dans l’objet.

```js
console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("job"));  // false
```

### Opérateur **in**

Renvoie `true` si la propriété existe dans l’objet (directement ou via la chaîne de prototypes).

```js
console.log("name" in person); // true
```

---

## 5. Objets Imbriqués et Accès à des Propriétés Profondes

Pour accéder à des propriétés internes, on enchaîne les notations.

### Exemple

```js
const person = {
  name: "Alice",
  age: 30,
  contact: {
    email: "alice@example.com",
    phone: {
      home: "123-456-7890",
      work: "098-765-4321"
    }
  }
};

console.log(person.contact.phone.work); // "098-765-4321"
```

---

## 6. Types Primitifs et Non Primitifs

### **Primitifs**

* number
* string
* boolean
* null
* undefined
* symbol

Ils sont **immutables** et représentent une valeur simple.

### **Non primitifs**

* objets
* tableaux
* fonctions

Ils peuvent contenir plusieurs valeurs et sont **mutables**.

---

## 7. Méthodes d’Objet et le mot-clé `this`

Une méthode est une fonction définie comme propriété d’un objet.
`this` désigne l’objet auquel la méthode appartient.

### Exemple

```js
const person = {
  name: "Bob",
  age: 30,
  sayHello: function() {
    return "Hello, my name is " + this.name;
  }
};

console.log(person.sayHello()); // "Hello, my name is Bob"
```

---

## 8. Constructeur d’Objet

Un **constructeur** est une fonction permettant de créer et initialiser des objets via `new`.

### Exemple

```js
const obj = new Object();
```

On peut aussi créer ses propres constructeurs.

---

## 9. Optional Chaining `?.`

Permet d’accéder à des propriétés sans provoquer d’erreur lorsque l’une d’elles n’existe pas.

### Exemple

```js
console.log(user.profile?.address?.street);
console.log(user.profile?.phone?.number); // undefined
```

---

## 10. Destructuration d’Objet

Technique permettant d’extraire directement des valeurs dans des variables.

### Exemple

```js
const person = { name: "Alice", age: 30, city: "New York" };
const { name, age } = person;

console.log(name); // Alice
console.log(age);  // 30
```

---

## 11. JSON : JavaScript Object Notation

Format textuel utilisé pour échanger des données.

### Exemple JSON

```json
{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "list of courses": ["Mathematics", "Physics", "Computer Science"]
}
```

### **JSON.stringify()**

Convertit un objet en chaîne JSON.

```js
const user = { name: "John", age: 30, isAdmin: true };
const jsonString = JSON.stringify(user);

console.log(jsonString);
```

### **JSON.parse()**

Convertit une chaîne JSON en objet JavaScript.

```js
const jsonString = '{"name":"John","age":30,"isAdmin":true}';
const userObject = JSON.parse(jsonString);

console.log(userObject);
```