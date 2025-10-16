# log_parser.py -Parse logs basiques

import re

def parse_log(file_path):

    print(f"\n🔍Analyse de {file_path}\n")

    try:
        with open(file_path, "r") as file:
            lines = file.readlines()

    except FileNotFoundError:
        print(f"❌ Fichier {file_path} introuvable\n")
        return

    errors = 0
    warnings = 0
    ips = []

    for line in lines:
        if "ERROR" in line.upper():
            errors += 1
        if "WARNING" in line.upper():
            warnings += 1

        ip_match = re.findall(r"\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b", line)
        ips.extend(ip_match)

    print(f"📊 STATISTIQUES")
    print(f"  Total lignes : {len(lines)}")
    print(f"  Erreurs : {errors}")
    print(f"  Warnings : {warnings}")
    print(f"  IPs uniques : {len(set(ips))}")

    if ips:
        print(f"\n🌐 Top 3 IPs :")
        from collections import Counter

        for ip, count in Counter(ips).most_common(3):
            print(f" {ip} : {count} fois")


if __name__ == "__main__":

    import sys

    if (len(sys.argv)) > 1:
        parse_log(sys.argv[1])

    else:
        print("Usage ! python3 log_parser.py <fichier.log>")
