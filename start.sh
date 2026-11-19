#!/bin/bash

# Se déplacer dans le dossier du projet
cd "$(dirname "$0")"

echo "============================================="
echo "   🌱 Démarrage de FrigoFuté Démo Mobile     "
echo "============================================="
echo ""

# Vérifier si Vite tourne déjà
if ! lsof -i :5173 > /dev/null 2>&1; then
    echo "1. Démarrage du serveur web Vite..."
    npm run dev > /dev/null 2>&1 &
    sleep 2
else
    echo "1. Serveur Vite déjà actif sur le port 5173. [OK]"
fi

echo ""
echo "2. Lancement du tunnel Cloudflare pour votre téléphone..."
echo "--------------------------------------------------------"
echo "👉 Accès local (sur votre Mac) : http://localhost:5173"
echo "👉 Accès réseau (même Wi-Fi)   : http://$(ipconfig getifaddr en0 2>/dev/null || echo '192.168.0.32'):5173"
echo ""
echo "Génération de l'adresse pour téléphone..."
echo "--------------------------------------------------------"

./cloudflared tunnel --url http://localhost:5173
