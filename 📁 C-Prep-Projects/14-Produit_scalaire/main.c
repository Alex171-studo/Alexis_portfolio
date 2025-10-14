#include <stdio.h>
#include <stdlib.h>

double produit_scalaire(double *v1, double *v2, int taille)
{
    double produit_scalaire = 0;
    for (int i = 0; i < taille; i++)
    {
        produit_scalaire += *(v1 + i) * *(v2 + i);
    }
    return produit_scalaire;
}

int main(void)
{

    int N;

    printf("Veuillez entrez la taille des vecteurs: ");
    scanf("%d", &N);

    double *v1 = (double *)malloc(N * sizeof(double));

    if (v1 == NULL)
    {
        printf("Erreur d'allocation\n");
        return -1;
    }

    printf("Veuillez entreé les composantes du premier vecteur\n");

    for (int i = 0; i < N; i++)
    {
        printf("Composante %d : ", i + 1);
        scanf("%lf", v1 + i);
    }

    double *v2 = (double *)malloc(N * sizeof(double));

    if (v2 == NULL)
    {
        printf("Erreur d'allocation\n");
        return -1;
    }

    printf("Veuillez entreé les composantes du second vecteur\n");

    for (int i = 0; i < N; i++)
    {
        printf("Composante %d : ", i + 1);
        scanf("%lf", v2 + i);
    }

    double scalaire = produit_scalaire(v1, v2, N);

    printf("Le produit scalaire des deux vecteurs donne %.2lf\n", scalaire);
    free(v1);
    free(v2);
    return 0;
}