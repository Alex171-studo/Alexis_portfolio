#!/usr/bin/env python3
import re
import datetime as dt 
from collections import Counter
import argparse
import json

def status(count):
    if count > 20: return "🔴 CRITIQUE"
    elif count > 10: return "🟠 ÉLEVÉ"
    elif count >= 5: return "🟡 MODÉRÉ"
    else: return "🟢 NORMAL"

def brute_force_scanner(log_file="/var/log/auth.log", seuil=5, export_json=False):
    
    report_file = f"security_report_{dt.datetime.now().strftime('%Y-%m-%dT%H-%M-%S')}.txt"
    ip_pattern = r"(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"
    
    failed_ips = []
    total_failures = 0

    try:
        with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
            for line in f:
                if "failed password" in line.lower() or "invalid user" in line.lower():
                    total_failures += 1
                    ip_match = re.findall(ip_pattern, line)
                    if ip_match:
                        failed_ips.append(ip_match[0])
    except FileNotFoundError:
        print(f"❌ Erreur : {log_file} introuvable")
        return
    except PermissionError:
        print(f"❌ Permission refusée pour {log_file}")
        print("💡 Essayez : sudo python3 brute_force_detector.py")
        return
    
    # Analyse
    ip_counter = Counter(failed_ips)
    unique_ips = len(ip_counter)
    suspect_count = sum(1 for count in ip_counter.values() if count >= seuil)
    normal_count = unique_ips - suspect_count

    # Rapport texte
    with open(report_file, 'w') as report:
        report.write(f"🔍 ANALYSE BRUTE FORCE - {dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        report.write("=" * 60 + "\n\n")
        
        report.write(f"📊 Statistiques :\n")
        report.write(f"  Total tentatives échouées : {total_failures}\n")
        report.write(f"  IPs uniques : {unique_ips}\n")
        report.write(f"  Seuil brute force : {seuil} tentatives\n\n")

        if suspect_count > 0:
            report.write(f"🚨 ALERTES ({suspect_count} IPs suspectes) :\n")
            for ip, count in ip_counter.most_common():
                if count >= seuil:
                    report.write(f"  {ip}: {count} tentatives - {status(count)}\n")
            report.write("\n")
        else:
            report.write("✅ Aucune IP suspecte détectée\n\n")

        report.write(f"✅ IPs normales (<{seuil} tentatives) : {normal_count}\n")

    # Affichage console
    print(f"\n🔍 ANALYSE TERMINÉE")
    print(f"{'=' * 60}")
    print(f"📊 Total échecs : {total_failures}")
    print(f"🌐 IPs uniques : {unique_ips}")
    print(f"🚨 IPs suspectes : {suspect_count}")
    
    if suspect_count > 0:
        print(f"\n🔝 Top 10 IPs suspectes :")
        for ip, count in ip_counter.most_common(10):
            if count >= seuil:
                print(f"  {ip}: {count} tentatives - {status(count)}")
    
    print(f"\n📄 Rapport : {report_file}")
    
    # Export JSON optionnel
    if export_json:
        json_file = report_file.replace('.txt', '.json')
        with open(json_file, 'w') as jf:
            json.dump({
                'timestamp': dt.datetime.now().isoformat(),
                'total_failures': total_failures,
                'unique_ips': unique_ips,
                'seuil': seuil,
                'suspect_ips': {ip: count for ip, count in ip_counter.items() if count >= seuil},
                'normal_count': normal_count
            }, jf, indent=2)
        print(f"📦 Export JSON : {json_file}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="🔍 Détecteur de tentatives brute force SSH",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemples :
    python3 brute_force_detector.py
    python3 brute_force_detector.py --seuil 10
    sudo python3 brute_force_detector.py --json
        """
    )
    parser.add_argument("--seuil", type=int, default=5, 
                        help="Seuil détection brute force (défaut: 5)")
    parser.add_argument("--json", action="store_true",
                        help="Exporter résultats en JSON")
    parser.add_argument("--log", type=str, default="/var/log/auth.log",
                        help="Chemin fichier log (défaut: /var/log/auth.log)")
    
    args = parser.parse_args()
    
    brute_force_scanner(
        log_file=args.log,
        seuil=args.seuil,
        export_json=args.json
    )
""""""