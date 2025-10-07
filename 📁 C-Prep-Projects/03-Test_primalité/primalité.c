#include <stdio.h>
#include <math.h>

void is_premier(int a){

    int b = sqrt(a);
    int compteur = 0;

    for (int i = 2 ; i<= b; i++){
        
        if ( a%b == 0) compteur++;
        }
        
    if( compteur == 0 && a > 1)
        printf("Le nombre est premier\n");
    else 
        printf("Le nombre n'est pas premier\n");
}

int main(void){


    return 0;
}