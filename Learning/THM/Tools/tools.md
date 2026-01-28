
arp-scan est un outil de scan ARP.
arp-scan -I [interface] -l(--localnet) pour scanner le réseau local
ou 
arp-scan -I [interface] [cible] pour scanner une cible spécifique
C'est l'équivalent de nmap -PR -sn

---
masscan est un outil de scan rapide.Il permet un réseau complet rapidement pour identifer les hôtes up et permet une analyse plus fine avec nmap

masscan [cible] -p[ports] --rate=[valeur] pour scanner une cible spécifique sur des ports spécifiques
masscan [cible] -p- --rate=[valeur] pour scanner une cible sur tous les ports
 Généralement --rate = 10000
 