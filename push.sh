#!/bin/bash

echo "---------------------------------------"
echo "  SRP – automatski Git deploy"
echo "---------------------------------------"
echo ""

# Pitaj korisnika za commit poruku
read -p "Unesi commit poruku: " msg

# Ako je prazna poruka, stavi default
if [ -z "$msg" ]; then
    msg="Update sajta"
fi

echo ""
echo "Dodajem sve fajlove..."
git add .

echo "Pravim commit..."
git commit -m "$msg"

echo "Šaljem na GitHub..."
git push -u origin main

echo ""
echo "---------------------------------------"
echo " Git push završen!"
echo "---------------------------------------"
