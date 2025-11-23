#include <stdio.h>

void somme_elements(int column, int matrice[][column], int rows)
{
    int sum_rows = 0, sum_columns = 0;

    printf("Somme des éléments par ligne : \n");
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < column; j++)
        {
            sum_rows += matrice[i][j];
        }
        printf("Ligne %d : %d\n", i + 1, sum_rows);
        sum_rows = 0;
    }

    printf("\n");

    printf("Somme des éléments par colonnes : \n");
    for (int i = 0; i < column; i++)
    {
        for (int j = 0; j < rows; j++)
        {
            sum_columns += matrice[j][i];
        }
        printf("Colonne %d : %d\n", i + 1, sum_columns);
        sum_columns = 0;
    }
}

int main(void)
{
    int matrice[][3] = {
        {1, 2, 3},
        {4, 5, 6}};
    somme_elements(3, matrice, 2);
    return 0;
}
