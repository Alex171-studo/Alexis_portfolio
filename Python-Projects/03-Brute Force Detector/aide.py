# "le code secret est cachÃ©, personnne ne peut le dÃ©chiffrer"
code_secret = "plorevav{synt}"

# correspondance de rÃ©fÃ©rence pour le codage/dÃ©codage
alphabet = str.maketrans('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm')

def decode_secret(secret):
	# Fonction de dÃ©codage ROT13
	return secret.translate(alphabet)


def login():
	# Fonction de connexion au programme

	nom = input("Nom d'utilisateur : ")
	mdp = input("Mot de passe : ")

	if nom == "Michel":
		if mdp == decode_secret(code_secret):
			print("ConnectÃ© avec succÃ¨s !")
		else :
			print("Mot de passe invalide.")
	else :
		print("Nom d'utilisateur invalide.")

login()