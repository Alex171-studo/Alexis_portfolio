#include <stdio.h>

void produit_matrice(int columns, int A[][columns],int B[][columns], int rows){

    int result[rows][columns];
    for (int i = 0 ; i < rows; i++){
        for (int j = 0 ; j < columns; j++){
            result[i][j]+=A[i][j] * B[j][i];
        }
    }

    for (int i = 0 ; i < rows; i++){
        for (int j = 0 ; j < columns; j++){
            printf("%d  ",result[i][j]);
        }
    }
}

int main(void){
int A[2][3] = {{1, 2, 3}, {4, 5, 6}};
int B[2][3] = {{1, 2, 3}, {4, 5, 6}};
produit_matrice(3,A,B,2);


    return 0;
}