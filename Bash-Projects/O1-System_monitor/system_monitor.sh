#!/bin/bash
# system_monitor.sh - Monitoring système basique

echo "🖥️  MONITORING SYSTÈME - $(date)"
echo "=================================="
echo ""

# 1. CPU et Mémoire

echo "💻 RESSOURCES"
echo "  CPU utilisé : $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')%"
echo "  RAM utilisée : $(free -h | awk '/^Mem:/ {print $3 "/" $2}')"
echo "  Swap utilisé : $(free -h | awk '/^Swap:/ {print $3 "/" $2}')"
echo "=================================="
echo ""

# 2. Disque

echo "💾 DISQUE"
df -h / | tail -1 | awk '{print "  Utilisé : " $3 "/" $2 " (" $5 ")"}'
echo "=================================="
echo ""

# 3. Processus top 5 CPU

echo "⚡ TOP 5 PROCESSUS CPU"
ps -eo comm,%cpu --sort=-%cpu | head -n 6 | tail -n 5 | awk '{printf(" %-20s %s%% \n",$1,$2)}'
echo "=================================="
echo ""

# 4. Services critiques

echo "🔌Vérification des services critiques"
services=(ssh cron ufw fail2ban iptables openvpn )

for s in "${services[@]}";do
    active=$(systemctl is-active "$s" 2>/dev/null)
    enabled=$(systemctl is-enabled "$s" 2>/dev/null)
    printf " %-12s : %-8s (autostart:%s)\n" "$s" "$active" "$enabled"
done

echo "=================================="
echo ""

#5. 5 dernières lignes de /var/log/syslog

echo "Derniers logs systèmes"
echo ""
tail -n 5 /var/log/syslog | awk '
{

date = $1 " " $2 " " $3
host =$ 4
proc = $5
msg = ""

for(i=6;i<=NF;i++){
    msg = msg $i " "
}

print "Date: " date
print "Hôte: " host
print "Message: " msg
print "---------------------------------------------------------------------------------"
}'



