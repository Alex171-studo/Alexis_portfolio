# 🛡️ Reconnaissance Active : Les Outils Fondamentaux

L'identification d'une cible repose sur l'utilisation combinée d'outils système basiques pour cartographier le réseau et vérifier la disponibilité des services.

## 🛠️ Tableau Récapitulatif des Commandes

| Outil | Linux / macOS | MS Windows | Description |
| :--- | :--- | :--- | :--- |
| **Ping** | `ping -c 10 <IP>` | `ping -n 10 <IP>` | Vérifie la connectivité (ICMP Echo). |
| **Traceroute** | `traceroute <IP>` | `tracert <IP>` | Cartographie le chemin réseau vers la cible. |
| **Telnet** | `telnet <IP> <PORT>` | `telnet <IP> <PORT>` | Teste l'ouverture d'un port spécifique. |
| **Netcat (Client)** | `nc <IP> <PORT>` | — | Établit une connexion brute vers un port. |
| **Netcat (Server)** | `nc -lvnp <PORT>` | — | Écoute les connexions entrantes sur un port. |

---

## 🌐 Reconnaissance Web & Developer Tools

Le navigateur web est l'un des outils de reconnaissance les plus puissants et les plus discrets. Les **Developer Tools** permettent d'analyser le code source, les scripts et le trafic réseau sans déclencher d'alertes majeures.

### Raccourcis Clés
*   **Linux / Windows :** `Ctrl` + `Shift` + `I`
*   **macOS :** `Option` + `Command` + `I`

---

## 💡 Stratégie d'Analyse (Workflow)

Pour construire un scanner réseau primitif mais efficace via un script shell, suivez cet enchaînement :
1.  **Vérification d'existence :** Utiliser `ping` pour voir si l'hôte répond.
2.  **Cartographie réseau :** Utiliser `traceroute` pour identifier les sauts (hops) et les pare-feu potentiels.
3.  **Audit de ports :** Utiliser `telnet` ou `nc` pour tester la réactivité des services (HTTP, SSH, etc.).

> **Note :** Ces outils constituent la base avant de passer à des scanners plus sophistiqués comme **Nmap**.
