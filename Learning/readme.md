# Mon Learning Log Cyber

## Semaine du 13 Janvier 2026

### HackTheBox - Linux Fundamentals
**Temps :** 1h30  
**Ce que j'ai appris :**
- Commande `grep` pour chercher dans fichiers
- Pipes `|` pour combiner commandes
- Permissions fichiers (chmod, chown)

**Commandes clés :**
```bash
grep "error" /var/log/syslog
cat file.txt | grep "password"
chmod 755 script.sh

Python - Module os
Temps : 45 min
Ce que j'ai appris :

os.listdir() pour lister fichiers
os.system() pour exécuter commandes shell
os.path.exists() pour vérifier si fichier existe

Code :
pythonimport os
files = os.listdir('.')
print(files)
Next : Combiner avec sys pour arguments CLI
