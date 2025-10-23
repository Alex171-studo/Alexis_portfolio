#include <stdio.h>
#include <math.h>

void is_premier(int a){

    int b = sqrt(a);
    int compteur = 0;

    for (int i = 2 ; i<= b; i++){
        
        if ( a % b == 0) compteur++;

        }

    if( compteur == 0 && a > 1)
        printf("%d est premier\n",a);
    else 
        printf("%d n'est pas premier\n",a);
}

int main(void){

    int nombre;
    printf("Bienvenue dans votre testeur de pimalité\n");
    printf("Veuillez entrez l'entier à vérifier: ");
    scanf("%d",&nombre);

    is_premier(nombre);

    return 0;
}