#include <stdio.h>

void affiche_matrice(int n, int A[][n], int ligne)
{
    for (int i = 0; i < ligne; i++)
    {
        printf("      [ ");
        for (int j = 0; j < n; j++)
        {
            printf("%d ", A[i][j]);
        }
        printf("]\n");
    }
}

void somme_matrice(int n, int A[][n], int B[][n], int ligne)
{
    int result[ligne][n];

    for (int i = 0; i < ligne; i++)
    {
        for (int j = 0; j < n; j++)
        {
            result[i][j] = A[i][j] + B[i][j];
        }
    }
    printf("La somme des deux matrices donne la matrice\n R = \n");
    affiche_matrice(n, result, ligne);
}

int main(void)
{
    int taille = 3;
    int matriceA[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}};
    int matriceB[3][3] = {
        {9, 8, 7},
        {6, 5, 4},
        {3, 2, 1}};
    somme_matrice(taille, matriceA, matriceB, taille);
    return 0;
}