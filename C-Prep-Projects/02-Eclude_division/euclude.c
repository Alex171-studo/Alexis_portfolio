#include <stdio.h>

int pgcd(int a , int b){

    if( a < 0) a = -a;
    if ( b < 0) b = -b;

    if( b == 0 && a == 0){
        printf("La division par 0 est impossible\n");
        return -1;
    }
    if ( a == 0) return b;
    if ( b == 0 ) return a;
    


    while(  b != 0 ){
        int reste = a % b;
        a = b;
        b = reste;
    }
    return a;
}

int main(void){
    int a,b;
    printf("Bienvenue dans l'algorithme de pgcd(a,b)\n");
    printf("Veuillez entrer la valeur de a et b : ");
    scanf("%d %d",&a,&b);
    printf("pgcd(%d,%d) = %d\n",a,b,pgcd(a,b));
    return 0;
}