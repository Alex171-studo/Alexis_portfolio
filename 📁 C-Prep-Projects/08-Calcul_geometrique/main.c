#include <stdio.h>
#include <math.h>
#define pi 3.14
void calculer_cercle(float rayon, float *p_perimetre, float *p_aire)
{
    *p_perimetre = 2 * pi * rayon;
    *p_aire = pi * (pow(rayon, 2));
}
int main(void)
{
    float rayon, p_perimetre, p_aire;

    printf("Veuillez entrer la valeur du rayon: ");
    scanf("%f", &rayon);
    calculer_cercle(rayon, &p_perimetre, &p_aire);
    printf("Périmètre = %.2f et Aire = %.2f\n", p_perimetre, p_aire);
    return 0;
}