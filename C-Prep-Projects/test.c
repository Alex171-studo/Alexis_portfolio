#include <stdio.h>
#include <stdlib.h>

void inverse_tableau(int *p, int n){
    for(int i = 0 ; i < n/2; i++){
        int temp = *(p+n-i-1);
        *(p+n-i-1) = *(p+i);
        *(p+i) =temp;
    }
}

int main(void){

    int tab[6] = {1,2,3,4,5,6};
    int *p = tab;
    inverse_tableau(p,6);
    for(int i = 0 ; i < 6; i++){
        printf("%d ",*(p+i));
    }

    return 0;
}
