Voici des versions **très basiques en C**, avec uniquement des **boucles `for`**, sans fonctions avancées ni structures complexes.
Chaque TP est présenté séparément, clair et minimaliste.

---

# **TP 1 : Addition de matrices**

```c
#include <stdio.h>

int main() {
    int i, j;
    int m, n;

    printf("Dimensions de la matrice (m n) : ");
    scanf("%d %d", &m, &n);

    int A[m][n], B[m][n], S[m][n];

    printf("Matrice A :\n");
    for (i = 0; i < m; i++) {
        for (j = 0; j < n; j++) {
            scanf("%d", &A[i][j]);
        }
    }

    printf("Matrice B :\n");
    for (i = 0; i < m; i++) {
        for (j = 0; j < n; j++) {
            scanf("%d", &B[i][j]);
        }
    }

    for (i = 0; i < m; i++) {
        for (j = 0; j < n; j++) {
            S[i][j] = A[i][j] + B[i][j];
        }
    }

    printf("Somme :\n");
    for (i = 0; i < m; i++) {
        for (j = 0; j < n; j++) {
            printf("%d ", S[i][j]);
        }
        printf("\n");
    }

    return 0;
}
```

---

# **TP 2 : Somme des lignes et colonnes**

```c
#include <stdio.h>

int main() {
    int i, j;
    int m, n;

    printf("Dimensions de la matrice (m n) : ");
    scanf("%d %d", &m, &n);

    int A[m][n];
    int sommeLigne[m];
    int sommeColonne[n];

    printf("Matrice :\n");
    for (i = 0; i < m; i++) {
        for (j = 0; j < n; j++) {
            scanf("%d", &A[i][j]);
        }
    }

    for (i = 0; i < m; i++) {
        sommeLigne[i] = 0;
        for (j = 0; j < n; j++) {
            sommeLigne[i] += A[i][j];
        }
    }

    for (j = 0; j < n; j++) {
        sommeColonne[j] = 0;
        for (i = 0; i < m; i++) {
            sommeColonne[j] += A[i][j];
        }
    }

    printf("Somme des lignes :\n");
    for (i = 0; i < m; i++) {
        printf("Ligne %d = %d\n", i, sommeLigne[i]);
    }

    printf("Somme des colonnes :\n");
    for (j = 0; j < n; j++) {
        printf("Colonne %d = %d\n", j, sommeColonne[j]);
    }

    return 0;
}
```

---

# **TP 3 : Produit de deux matrices**

```c
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
```

---

# **TP 4 : Transposition d’une matrice carrée**

```c
#include <stdio.h>

int main() {
    int i, j;
    int n;

    printf("Taille de la matrice carrée n : ");
    scanf("%d", &n);

    int A[n][n], T[n][n];

    printf("Matrice :\n");
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            scanf("%d", &A[i][j]);
        }
    }

    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            T[j][i] = A[i][j];
        }
    }

    printf("Transposee :\n");
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            printf("%d ", T[i][j]);
        }
        printf("\n");
    }

    return 0;
}
```

---

Si tu veux, je peux aussi tout regrouper dans **un seul programme** avec un menu, ou bien t’aider à optimiser/annoter le code.

Voici **les 4 TPs à nouveau**, mais cette fois regroupés dans **un seul programme en C**, très simple, avec uniquement des **boucles `for`**, sans fonctions avancées.
Tu peux compiler et exécuter, puis choisir l’opération que tu veux.

---

# **Programme C complet – Menu + 4 TPs**

```c
#include <stdio.h>

int main() {
    int choix;
    int i, j, k;
    int m, n, p;

    printf("1 - Addition de matrices\n");
    printf("2 - Somme lignes et colonnes\n");
    printf("3 - Produit de matrices\n");
    printf("4 - Transposition d'une matrice\n");
    printf("Votre choix : ");
    scanf("%d", &choix);

    if (choix == 1) {
        // ------------------ TP 1 : Addition ------------------
        printf("Dimensions des matrices (m n) : ");
        scanf("%d %d", &m, &n);

        int A[m][n], B[m][n], S[m][n];

        printf("Matrice A :\n");
        for (i = 0; i < m; i++) {
            for (j = 0; j < n; j++) {
                scanf("%d", &A[i][j]);
            }
        }

        printf("Matrice B :\n");
        for (i = 0; i < m; i++) {
            for (j = 0; j < n; j++) {
                scanf("%d", &B[i][j]);
            }
        }

        for (i = 0; i < m; i++) {
            for (j = 0; j < n; j++) {
                S[i][j] = A[i][j] + B[i][j];
            }
        }

        printf("Somme :\n");
        for (i = 0; i < m; i++) {
            for (j = 0; j < n; j++) {
                printf("%d ", S[i][j]);
            }
            printf("\n");
        }
    }

    else if (choix == 2) {
        // ------------------ TP 2 : Somme lignes et colonnes ------------------
        printf("Dimensions de la matrice (m n) : ");
        scanf("%d %d", &m, &n);

        int A[m][n];
        int sommeLigne[m];
        int sommeColonne[n];

        printf("Matrice :\n");
        for (i = 0; i < m; i++) {
            for (j = 0; j < n; j++) {
                scanf("%d", &A[i][j]);
            }
        }

        for (i = 0; i < m; i++) {
            sommeLigne[i] = 0;
            for (j = 0; j < n; j++) {
                sommeLigne[i] += A[i][j];
            }
        }

        for (j = 0; j < n; j++) {
            sommeColonne[j] = 0;
            for (i = 0; i < m; i++) {
                sommeColonne[j] += A[i][j];
            }
        }

        printf("Somme des lignes :\n");
        for (i = 0; i < m; i++) {
            printf("Ligne %d = %d\n", i, sommeLigne[i]);
        }

        printf("Somme des colonnes :\n");
        for (j = 0; j < n; j++) {
            printf("Colonne %d = %d\n", j, sommeColonne[j]);
        }
    }

    else if (choix == 3) {
        // ------------------ TP 3 : Produit de matrices ------------------
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
    }

    else if (choix == 4) {
        // ------------------ TP 4 : Transposition ------------------
        printf("Taille n de la matrice carree : ");
        scanf("%d", &n);

        int A[n][n], T[n][n];

        printf("Matrice :\n");
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                scanf("%d", &A[i][j]);
            }
        }

        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                T[j][i] = A[i][j];
            }
        }

        printf("Transposee :\n");
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                printf("%d ", T[i][j]);
            }
            printf("\n");
        }
    }

    else {
        printf("Choix invalide.\n");
    }

    return 0;
}
```

---

Si tu veux, je peux aussi te fournir :
✅ une version **sans menu**
✅ une version **avec fonctions**
✅ une version **avec allocations dynamiques (malloc)**
ou commenter chaque ligne pour t’aider à réviser.
