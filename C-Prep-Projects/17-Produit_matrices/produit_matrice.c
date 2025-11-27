#include <stdio.h>

int main() {
    int i, j, k;
    int m, n, p;

    printf("Dimensions de A (m n) : ");
    scanf("%d %d", &m, &n);

    printf("Dimensions de B (n p) : ");
    scanf("%d %d", &n, &p);

    int A[m][n], B[n][p], C[m][p];

    printf("Matrice A :\n");
    for (i = 0; i < m; i++) {
        for (j = 0; j < n; j++) {
            scanf("%d", &A[i][j]);
        }
    }

    printf("Matrice B :\n");
    for (i = 0; i < n; i++) {
        for (j = 0; j < p; j++) {
            scanf("%d", &B[i][j]);
        }
    }

    for (i = 0; i < m; i++) {
        for (j = 0; j < p; j++) {
            C[i][j] = 0;
            for (k = 0; k < n; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    printf("Produit :\n");
    for (i = 0; i < m; i++) {
        for (j = 0; j < p; j++) {
            printf("%d ", C[i][j]);
        }
        printf("\n");
    }

    return 0;
}
