
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


test.py : usage : test.py emails.txt


crunch 3 3 -o opt.txt -t %%% -s 100 -e 200 : générer des mots de passe de 3 caractères avec des chiffres de 100 à 200
    - crunch 3 3 : générer des mots de passe de 3 caractères (min 3, max 3)
    - -o opt.txt : output file
    - -t %%% : générer des mots de passe avec des chiffres
    - -s 100 : début de la plage
    - -e 200 : fin de la plage


git clone https://github.com/tomnomnom/waybackurls : cloner le repository waybackurls qui sers à récupérer les urls d'un site web depuis l'archive des sites web
    cd waybackurls
    sudo apt install golang-go -y
    go build
    ./waybackurls sitename


hashcat -m 16500 -a 0 jwt.txt jwt.secrets.list : attaquer un token JWT avec hashcat
    -m : mode
    -a : mode d'attaque
     