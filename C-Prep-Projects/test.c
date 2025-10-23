#include <stdio.h>
#include <stdlib.h>
void inverserTableau(int *tableau, int taille) {
    for (int i = 0; i < taille / 2; i++) {
        int *a = tableau +i;
        int *b = tableau + (taille - i -1);
        int temp = *a;
        *a = *b;
        *b = temp;
    }


}

int main() {
    int taille;
    printf("Veuillez entrez la taille de votre tableau: ");
    scanf("%d",&taille);

    int *tab = (int *)malloc(taille * sizeof(int));

    if ( tab == NULL){
        printf("Erreur lors de l'allocation \n");
        return 1;
    }

    printf("Veuillez remplir le tableau\n");

    for (int i = 0 ; i < taille ; i++) {
        printf("Element %d: ",i+1);
        scanf("%d",tab + i);
    }

    inverserTableau(tab,taille);

    printf("Tableau inversé\n");

    for (int i = 0 ; i < taille; i++){
        printf("Element %d: %d\n",i, *(tab +i));
    }

    free(tab);
    printf("\n");
    return 0;
}
