
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
 

 ---

 Ethercap est un outil de capture de paquets et de modification des paquets.
 ethercap -i [interface] pour capturer les paquets sur une interface
 ethercap -i [interface] -M [mode] pour capturer les paquets sur une interface en mode [mode]
 ethercap -i [interface] -M [mode] -k [clé] pour capturer les paquets sur une interface en mode [mode] avec une clé [clé]

 BetterCap est un outil de capture de paquets et de modification des paquets.
 bettercap -iface [interface] pour capturer les paquets sur une interface
 bettercap -iface [interface] -set [option] [valeur] pour capturer les paquets sur une interface en mode [mode]
 bettercap -iface [interface] -set [option] [valeur] -set [option] [valeur] pour capturer les paquets sur une interface en mode [mode] avec une clé [clé]


Stabilier un reverse shell
 python3 -c 'import pty; pty.spawn("/bin/bash")'
export TERM=xterm
Ctrl + Z
stty raw -echo; fg

