#include <stdio.h>
#include <stdlib.h>

int main(void)
{

    int nombre_temperatures;
    printf("Combien de mesures de températures voulez-vous réaliser: ");
    scanf("%d", &nombre_temperatures);

    float *temperatures = (float *)malloc(nombre_temperatures * sizeof(float));

    if( temperatures == NULL){
        printf("Echec de l'allocation de la mémoire\n");
        return -1;
    }

    for (int i = 0; i < nombre_temperatures; i++)
    {
        printf("Element %d: ", i + 1);
        scanf("%f", temperatures + i);
    }

    float somme = 0;
    for (int i = 0; i < nombre_temperatures; i++)
    {
        somme += *(temperatures + i);
    }

    float moyenne = somme / (float)nombre_temperatures;

    printf("La moyenne des éléments est %.2f\n", moyenne);

    free(temperatures);
    return 0;
}