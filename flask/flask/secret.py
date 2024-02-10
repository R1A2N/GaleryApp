import secrets

# Spécifiez la longueur de la clé en octets (par exemple, 32 octets pour une clé de 256 bits)
length_in_bytes = 32

# Générez une clé secrète aléatoire
secret_key = secrets.token_bytes(length_in_bytes)

# Convertissez la clé secrète en une représentation hexadécimale si nécessaire
secret_key_hex = secrets.token_hex(length_in_bytes)

# Imprimez la clé secrète
print("Clé secrète en bytes :", secret_key)
print("Clé secrète en hexadécimal :", secret_key_hex)
