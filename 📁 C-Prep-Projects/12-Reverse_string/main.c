#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void reverse_string(char *str)
{
    int lenght = strlen(str);
    for (int i = 0; i < lenght / 2; i++)
    {
        char temp = *(str + i);
        *(str + i) = *(str + lenght - 1 - i);
        *(str + lenght - 1 - i) = temp;
    }
}

int main(void)
{

    char *str = (char *)malloc(201 * sizeof(char));
    printf("Veuillez entrez votre chaine de caractères: ");
    scanf("%200s", str);

    reverse_string(str);
    printf("%s\n", str);

    free(str);

    return 0;
}