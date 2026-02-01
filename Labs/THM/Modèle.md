📑 Rapport d'Audit / CTF : [Nom_de_la_Machine]
Date : 31 Janvier 2026 Cible : [IP_CIBLE]

---

1. 🔍 Énumération & Reconnaissance

• Nmap Scan : `nmap -sV -sC -A [IP]`

• Découverte : Ports ouverts, services, versions.

• Vecteur d'entrée : [Ex: Port Knocking, Faible mot de passe, Faille Web]

---

2. 🚪 Accès Initial (Footprint)

• Exploitation : [Description de la méthode]

• Outil utilisé : [Ex: knock, Metasploit, Reverse Shell custom]

• Utilisateur obtenu : [Nom d'utilisateur]

---

3. 📦 Analyse de l'Environnement

• Système : [Linux / Windows]

• Conteneurisé ? [ ] Oui (check `/.dockerenv`) [ ] Non

• Indices trouvés : [Ex: Fichiers de config, montages suspects via `mount`]

---

4. 📈 Escalade de Privilèges (PrivEsc)

• Méthode : [Ex: SUID bit, Capabilities, Docker Escape, Cron job]

• Action : [Description de l'injection ou de l'exploit]

• Résultat : Accès ROOT obtenu.

---

🚩 Flags

• User : `[Contenu du flag]`

• Root : `[Contenu du flag]`

---

💡 Leçons apprises & Astuces

• [Ce qui a fonctionné]

• [Ce qui a fait perdre du temps]

