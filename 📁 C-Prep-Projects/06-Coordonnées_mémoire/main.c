#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    double acceleration_g = 9.81;
    double *ptr_g;
    ptr_g = &acceleration_g;
    printf("La valeur de la varaiable l'accélération : %.2lf\n", acceleration_g);
    printf("Adresse mémoire de la variable de l'accélération %p\n", &acceleration_g);
    printf("Adresse mémoire de la variable de l'accélération: %p\n", ptr_g);
    printf("Valeur pointée par le pointeur: %.2lf\n", *ptr_g);
    return 0;
}