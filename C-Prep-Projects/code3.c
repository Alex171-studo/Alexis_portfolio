#include <stdio.h>
#include <stdlib.h>

#define SIZE 10

// fonction de hachage simple
int hash(int key) {
    return key % SIZE;
}

void insert(int table[], int key) {
    int index = hash(key);
    // gestion de collisions simple par linéaire probing
    while (table[index] != -1) {
        index = (index + 1) % SIZE;
    }
    table[index] = key;
}

int search(int table[], int key) {
    int index = hash(key);
    int start = index;

    while (table[index] != -1) {
        if (table[index] == key)
            return index;
        index = (index + 1) % SIZE;
        if (index == start) break; // boucle complète
    }
    return -1;
}

int main() {
    int table[SIZE];
    for (int i = 0; i < SIZE; i++) table[i] = -1;

    insert(table, 15);
    insert(table, 25);
    insert(table, 35);

    int key = 25;
    int result = search(table, key);
    if (result != -1)
        printf("Élément %d trouvé à l'indice %d\n", key, result);
    else
        printf("Élément non trouvé\n");

    return 0;
}
