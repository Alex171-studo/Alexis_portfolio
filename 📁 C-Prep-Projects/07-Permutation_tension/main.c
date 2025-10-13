#include <stdlib.h>
#include <stdio.h>

void permuter_tension(float *tension_A, float *tension_B)
{
    float temp;
    temp = *tension_A;
    *tension_A = *tension_B;
    *tension_B = temp;
}

int main(void)
{
    float U1 = 5.0, U2 = 12.0;
    printf("Avant permutation, U1 = %.2f et U2 = %.2f\n", U1, U2);
    permuter_tension(&U1, &U2);
    printf("Après permutation, U1 = %.2f et U2 = %2.f\n", U1, U2);
    return 0;
}