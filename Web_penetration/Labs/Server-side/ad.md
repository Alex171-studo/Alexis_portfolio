Active Directory est un annuaire de Microsoft qui permet de stocker des informations sur les utilisateurs, les ordinateurs, les groupes, les permissions, etc.

Un objet est une entité stockée dans Active Directory (utilisateur, ordinateur, groupe, etc.).

Un attribut est une propriété d'un objet (nom, adresse, etc.).

Un domaine est un ensemble d'objets stockés dans Active Directory. Il permet de regrouper des objets ( par exemple les utilisateurs d'une même organisation ou service).

Le Domain Controler est un serveur qui gère le domaine. Il stocke les informations sur les utilisateurs, les ordinateurs, les groupes, les permissions, etc et est responsable de la gestion des utilisateurs, de l'authentification et des permissions.

Les Organizational Units sont des conteneurs logiques où on places des objets devant partager les même droit et à laquelle on applique une Group Policy qui définit les droits des utilisateurs.

Les Group Policy sont un ensemble de configurations qui sont appliquées aux utilisateurs et aux ordinateurs. On le lie à un Organizational Unit pour qu'il s'applique à tous les objets de l'OU.

Authentifiacation via Kerberos : 

Un arbre est composé de plusieurs sous-domaines qui partagent le même Domain Controler et le même nom de domaine .

Un Forest est un arbre composé de plusieurs arbres qui partagent le même Domain Controler et le même nom de domaine .

La Trust est une relation entre deux arbres qui permet de partager des informations.