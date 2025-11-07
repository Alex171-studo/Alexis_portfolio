import re
import datetime as dt
from collections import Counter
import argparse
import json

report_file = f"security_report_{dt.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}"


def status(count):
    if count > 20:
        return "CRITIQUE"
    elif count > 10:
        return "ÉLEVÉ"
    elif count >= 5:
        return "MODÉRÉ"
    else:
        return "NORMAL"


def brute_force_scanner():

    log_file = "/var/log/auth.log"
    report_file = f"security_report_{dt.datetime.now().strftime('%Y-%m-%dT%H-%M-%S')}"
    ip_pattern = r"(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"

    suspect_ips = {}
    failed_ips = []
    total_failures = 0

    parser = argparse.ArgumentParser(description="Détecteur de brute force SSH")
    parser.add_argument(
        "--seuil",
        type=int,
        default=5,
        help="Seuil de détection brute force (défaut : 5)",
    )
    args = parser.parse_args()
    seuil = args.seuil

    try:
        with open(log_file, "r", encoding="utf-8", errors="ignore") as f:
            for line in f:
                if "failed password" in line.lower():
                    total_failures += 1
                    ip = re.findall(ip_pattern, line)
                    if ip:
                        failed_ips.append(ip[0])

    except FileNotFoundError:
        print(f"Erreur. Le fichier {log_file} introuvable\n")
        return

    except PermissionError:
        print(f"Vous n'avez pas la permission de lecture sur le fichier {log_file}")
        return

    ip_counter = Counter(failed_ips)
    unique_ips = list(ip_counter.keys())
    suspect_ips = {ip: count for ip, count in ip_counter.items() if count >= seuil}
    normal_ips = {ip: count for ip, count in ip_counter.items() if count < seuil}

    with open(report_file, "w") as report:
        report.write(
            f"🔍 ANALYSE BRUTE FORCE - [{dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}]\n"
        )
        report.write("============================================\n\n")

        report.write(
            f"📊 Statistiques :\n  Total tentatives échouées : {total_failures}\n"
        )
        report.write(f"  IPs uniques : {len(unique_ips)}\n\n")

        if suspect_ips:
            report.write(f"🚨 ALERTES (≥{seuil} tentatives) :\n")
            for ip in sorted(suspect_ips.keys()):
                report.write(
                    f" {ip} : {suspect_ips.get(ip)} tentatives -{status(suspect_ips.get(ip))}\n"
                )
        if normal_ips:
            report.write(
                f"\n✅ IPs normales (<{seuil} tentatives) : {len(normal_ips)}\n"
            )

        if suspect_ips:
            print("Top 10 des ips supectes\n")
            for ip, count in Counter(suspect_ips).most_common(10):
                print(f"{ip}: {count} tentatives -{status(count)} ")

    json_file = report_file.replace(".txt", ".json")
    with open(json_file, "w", encoding="utf-8") as jf:
        json.dump({
            
        })

    print("\nAnalyse terminée.")
    print(f"Rapport enregistré dans : {report_file}\n")


if __name__ == "__main__":
    brute_force_scanner()
    print("\n")
