# FrigoFuté — Prototype Démo Interactif

> Application mobile intelligente anti-gaspillage pour parents occupés, basée sur le projet entrepreneurial de **Polytechnique Montréal (IND8137A — Équipe 2)**.

![FrigoFuté Démo](https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Fonctionnalités Implémentées

### 1. 🗄️ Mon Réfrigérateur (Module d'Inventaire Visuel)
- **Dernières captures de caméra :** Affiche les prises de vue réelles du réfrigérateur prises lors des ouvertures de porte.
- **Vision par Ordinateur IA (YOLO) :** Visualisation interactive des boîtes englobantes (*bounding boxes*) détectant les aliments (Lait 98%, Épinards 96%, Œufs 99%, Fromage 94%).
- **Synchronisation manuelle & automatique :** Déclenchement de capture avec simulation de capteur de lumière LUX, son d'obturateur et flash.
- **Gestion d'inventaire dynamique :** Alertes d'expiration colorées (*Expire aujourd'hui* en rouge, *Expire demain* en orange), ajustement des quantités, ajout d'aliments et suppression.

### 2. 🍴 Suggestions de Recettes (Modèle de Langage Anti-Gaspillage)
- **Génération IA ciblée :** Algorithme priorisant automatiquement les aliments à risque d'expiration.
- **Fiches recettes détaillées :** Temps de préparation, pourcentage de gaspillage évité et ingrédients consommés.
- **Modal de préparation interactif :** Vue pas-à-pas des instructions, distinction ingrédients frigo vs garde-manger.
- **Bouton « J'ai cuisiné cette recette » :** Déduit automatiquement les ingrédients du réfrigérateur, met à jour le tableau de bord d'impact et déclenche des confettis anti-gaspillage.

### 3. 👤 Profil & Impact Socio-Économique
- **Préférences alimentaires :** Filtres en temps réel (Végétarien, Sans Gluten, Repas express < 20 min).
- **Gestion des allergies :** Exclusion dynamique des ingrédients (Arachides, Fruits de mer, etc.).
- **Tableau de bord d'impact :** Calcul des économies financières en dollars ($) et des émissions de $CO_2$ évitées (kg).
- **Module matériel amovible (Prototype P3) :** Vue interactive du plan technique 3D (objectif grand-angle 120°, capteur de lumière, batterie USB, fixation ventouses).

---

## 🚀 Démarrage Rapide

Le projet est propulsé par **Vite + React 19 + Tailwind CSS**.

### Installation et exécution
```bash
# 1. Accéder au répertoire
cd /Users/laureltremblay/Desktop/FRIGOFUTE

# 2. Lancer le serveur de développement
npm run dev
```

L'application est accessible à l'adresse : **[http://localhost:5173/](http://localhost:5173/)**

### Raccourcis d'exploration
- `http://localhost:5173/?tab=fridge` : Vue réfrigérateur
- `http://localhost:5173/?tab=recipes` : Vue recettes anti-gaspillage
- `http://localhost:5173/?tab=profile` : Vue profil & impact
- `http://localhost:5173/?tab=recipes&modal=recipe` : Modal recette détaillé
- `http://localhost:5173/?tab=profile&modal=hardware` : Spécifications techniques du module caméra P3

---

## 🛠️ Stack Technique & Bonnes Pratiques
- **Framework :** React 19 & Vite 8
- **Styling :** Tailwind CSS v4 & Lucide Icons
- **Accessibilité :** Éléments natifs `<dialog>` avec `closedby="any"`, gestion du focus et `overscroll-behavior: contain` conformément aux recommandations du standard moderne du web.
- **Audio :** Synthétiseur Web Audio API intégré (sans fichier lourd externe).

---

## 🎓 Projet Polytechnique Montréal (IND8137A)
**Équipe 2 :**
- Tristan Lachance (2141919)
- Laurel Tremblay (2141998)
- Sebastian Espin (2132717)
- Issam Elazhar (2110533)
- Oswald Jordan Nneme (1584966)
- Mohamed-Issam Yahiaoui (2216788)
