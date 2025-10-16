#include <stdio.h>

int binary_search(int arr[], int n, int key) {
    int left = 0, right = n - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == key)
            return mid; // trouvé
        else if (arr[mid] < key)
            left = mid + 1; // chercher à droite
        else
            right = mid - 1; // chercher à gauche
    }
    return -1; // non trouvé
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11};
    int n = sizeof(arr)/sizeof(arr[0]);
    int key = 7;

    int result = binary_search(arr, n, key);
    if (result != -1)
        printf("Élément trouvé à l'indice %d\n", result);
    else
        printf("Élément non trouvé\n");

    return 0;
}
