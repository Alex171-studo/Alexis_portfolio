#include <stdio.h>

void afficher_mesures(float *tab, int taille ){
    for ( int i = 0 ; i < taille; i++){
        printf("Element %d : %.2f\n",i,*(tab + i) );
    }
}

int main(void)
{

    float mesure[5] = {10.2, 9.8, 11.5, 10.7, 10.1 };
    afficher_mesures(mesure, 5);
    return 0;
}