#!/usr/bin/env python3

"""
Port scanner TCP (connect scan) 
Usage:
    python3 port_scanner_detailed.py <host> [port1 port2 ...]
"""

import socket
import sys
import time
from typing import List


def resolve_host(host: str) -> str:
    """Résout hostname -> IPv4 (string). Lève socket.gaierror si échec."""
    return socket.gethostbyname(host)


def is_tcp_port_open(ip: str, port: int, timeout: float = 0.5) -> bool:
    """
    Tente une connexion TCP vers (ip, port).
    Renvoie True si la connexion aboutit.
    """
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(timeout)
    try:
        result = s.connect_ex((ip, port))
        return result == 0
    except Exception:
        return False
    finally:
        s.close()


def scan_ports(host: str, ports: List[int], timeout: float = 0.5) -> List[int]:
    """Scanne les ports et retourne la liste des ports ouverts."""
    try:
        ip = resolve_host(host)
    except socket.gaierror as e:
        print(f"[!] Résolution DNS échouée pour {host} : {e}")
        return []

    opened = []
    start = time.time()
    for port in ports:
        print(f"Scan {ip}:{port} ...", end=" ")
        if is_tcp_port_open(ip, port, timeout):
            print("ouvert")
            opened.append(port)
        else:
            print("fermé")
    duration = time.time() - start
    print(f"Scan terminé en {duration:.2f} s")
    return opened


def parse_ports_from_args(args: List[str]) -> List[int]:
    if len(args) >= 3:
        try:
            return [int(p) for p in args[2:]]
        except ValueError:
            print("[!] Les ports doivent être des entiers.")
            sys.exit(1)
    else:
        return [22, 23, 25, 53, 80, 110, 143, 443, 631, 3306]


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 port_scanner_detailed.py <host> [port1 port2 ...]")
        sys.exit(1)

    host = sys.argv[1]
    ports = parse_ports_from_args(sys.argv)

    print(f"Début du scan de {host} ({len(ports)} ports)")
    opened = scan_ports(host, ports, timeout=0.5)

    print("\nRésultat : ports ouverts")
    if opened:
        for p in opened:
            print(f"- {p}")
    else:
        print("- Aucun port ouvert trouvé")


if __name__ == "__main__":
    main()
