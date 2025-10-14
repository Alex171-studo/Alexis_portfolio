#include <stdio.h>

double *trouver_signal_max(double *releves, int n_releves)
{
    double *max = releves;
    for (int i = 0; i < n_releves; i++)
    {
        if (*(releves + i) > *max)
            *max = *(releves + i);
    }
    return max;
}

int main(void)
{
    int taille;
    

    printf("Veuillez entrez la taille de votre tableau: ");
    scanf("%d", &taille);
    double tab[taille];

    printf("Remplissage du tableau\n");
    for (int i = 0; i < taille; i++)
    {
        printf("Element %d: ", i+1);
        scanf("%lf", tab+i);
    }
    double *max = trouver_signal_max(tab, taille);
    printf("Le maximum du tableau est %.2lf et son adresse mémoire est %p\n", *max, max);
    return 0;
}