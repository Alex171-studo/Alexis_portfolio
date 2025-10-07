#include <stdio.h>

void decompose_facteur(int n) {
    if (n == 0) {
        printf("0 n'a pas de décomposition en facteurs premiers.\n");
        return;
    }
    if (n == 1) {
        printf("1\n");
        return;
    }

    int diviseur = 2;
    int premier = 1;

    printf("%d = ", n);

    while (n > 1) {
        int exposant = 0;

        while (n % diviseur == 0) {
            n /= diviseur;
            exposant++;
        }

        if (exposant > 0) {
            if (!premier)
                printf(" * ");
            printf("%d", diviseur);
            if (exposant > 1)
                printf("^%d", exposant);
            premier = 0;
        }
        diviseur++;
    }
    printf("\n");
}

int main(void) {
    int n;
    printf("Entrez un entier positif : ");
    scanf("%d", &n);

    printf("Décomposition en facteurs premiers : ");
    decompose_facteur(n);

    return 0;
}
