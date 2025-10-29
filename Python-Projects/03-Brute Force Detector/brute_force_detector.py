import re
import datetime as dt 
from collections import Counter

def brute_force_scanner():

    file = "/var/log/auth.log"
    ip_pattern = r"(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"

    suspect_ip = []
    uniq_ip = []
    failure = 0

    try:
        with open (file,'r') as f:
            lines = f.readlines()

    except FileNotFoundError:
        print(f"Erreur. Le fichier {file} introuvable\n")
        return
    
    for line in lines:
        if "failed password" in line.lower():
            failure+=1
            ip = re.findall(ip_pattern,line)
            suspect_ip.extend(ip)

    if suspect_ip:
        for ip,count in Counter(suspect_ip).items():
            print(f"Ip : {ip} : {count} fois")
            if count == 0:
                
        

    
    print(f" 🔍 ANALYSE BRUTE FORCE - [{dt.datetime.now().strftime('%a %d-%m-%Y à %H:%M:%S')}] \n")
    print("=================================\n")

    print("📊 Statistiques :\n")
    print(f"Total tentatives échouées : {failure}")
    print("IPs uniques : 23")

    print(" 🚨 ALERTES (≥5 tentatives) :")
    print("192.168.1.100 : 47 tentatives - CRITIQUE")
    print("10.0.0.50 : 12 tentatives - ÉLEVÉ")

    print("✅ IPs normales (<5 tentatives) : 18")

if __name__ == "__main__":
    brute_force_scanner()