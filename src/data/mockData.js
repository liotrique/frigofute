export const INITIAL_INVENTORY = [
  {
    id: 'item-1',
    name: 'Lait 2%',
    category: 'Produits laitiers',
    expiry: 'demain',
    expiryDays: 1,
    statusText: 'Expire demain',
    statusColor: 'text-amber-600 bg-amber-50 border-amber-200',
    statusBadge: 'amber',
    quantity: '1 L',
    unit: 'L',
    amount: 1,
    icon: '🥛',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=150&q=80',
    atRisk: true,
  },
  {
    id: 'item-2',
    name: 'Épinards frais',
    category: 'Légumes',
    expiry: 'aujourd\'hui',
    expiryDays: 0,
    statusText: 'Expire aujourd\'hui',
    statusColor: 'text-rose-600 bg-rose-50 border-rose-200',
    statusBadge: 'rose',
    quantity: '200 g',
    unit: 'g',
    amount: 200,
    icon: '🥬',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=150&q=80',
    atRisk: true,
  },
  {
    id: 'item-3',
    name: 'Œufs frais (calibre gros)',
    category: 'Frais',
    expiry: 'dans 4 jours',
    expiryDays: 4,
    statusText: 'Expire dans 4 jours',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    statusBadge: 'emerald',
    quantity: '6 unités',
    unit: 'unités',
    amount: 6,
    icon: '🥚',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=150&q=80',
    atRisk: false,
  },
  {
    id: 'item-4',
    name: 'Fromage cheddar râpé',
    category: 'Fromages',
    expiry: 'dans 5 jours',
    expiryDays: 5,
    statusText: 'Expire dans 5 jours',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    statusBadge: 'emerald',
    quantity: '180 g',
    unit: 'g',
    amount: 180,
    icon: '🧀',
    image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=150&q=80',
    atRisk: false,
  },
  {
    id: 'item-5',
    name: 'Tomates cerises',
    category: 'Légumes',
    expiry: 'dans 2 jours',
    expiryDays: 2,
    statusText: 'Expire dans 2 jours',
    statusColor: 'text-amber-600 bg-amber-50 border-amber-200',
    statusBadge: 'amber',
    quantity: '250 g',
    unit: 'g',
    amount: 250,
    icon: '🍅',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&q=80',
    atRisk: true,
  },
  {
    id: 'item-6',
    name: 'Poulet cuit effiloché',
    category: 'Viandes',
    expiry: 'demain',
    expiryDays: 1,
    statusText: 'Expire demain',
    statusColor: 'text-amber-600 bg-amber-50 border-amber-200',
    statusBadge: 'amber',
    quantity: '300 g',
    unit: 'g',
    amount: 300,
    icon: '🍗',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=150&q=80',
    atRisk: true,
  }
];

export const CAMERA_CAPTURES = [
  {
    id: 'cap-1',
    title: 'Étagères centrales',
    time: 'Il y a 12 min (Porte ouverte détectée)',
    url: '/assets/fridge_mockup.jpg',
    detections: [
      { label: 'Lait 2% (98%)', top: '15%', left: '18%', width: '16%', height: '35%', color: '#3b82f6' },
      { label: 'Épinards (96%)', top: '48%', left: '28%', width: '26%', height: '26%', color: '#ef4444' },
      { label: 'Œufs (99%)', top: '18%', left: '60%', width: '22%', height: '22%', color: '#10b981' },
      { label: 'Fromage (94%)', top: '45%', left: '60%', width: '22%', height: '25%', color: '#f59e0b' }
    ]
  },
  {
    id: 'cap-2',
    title: 'Porte & condiments',
    time: 'Il y a 12 min',
    url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    detections: [
      { label: 'Lait & boissons (97%)', top: '20%', left: '30%', width: '40%', height: '50%', color: '#3b82f6' }
    ]
  },
  {
    id: 'cap-3',
    title: 'Bac à légumes',
    time: 'Il y a 12 min',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    detections: [
      { label: 'Tomates cerises (95%)', top: '30%', left: '15%', width: '30%', height: '40%', color: '#ef4444' },
      { label: 'Épinards (92%)', top: '25%', left: '55%', width: '35%', height: '45%', color: '#10b981' }
    ]
  }
];

export const INITIAL_RECIPES = [
  {
    id: 'recipe-1',
    title: 'Omelette aux épinards et fromage',
    subtitle: 'Parfait pour utiliser vos épinards et vos œufs avant qu\'ils ne soient perdus.',
    image: '/assets/recipe_mockup.jpg',
    badge: 'Utilise 3 ingrédients',
    time: '15 min',
    wasteSaved: '0% gaspillage',
    wasteScore: 100,
    tags: ['Rapide', 'Végétarien', 'Anti-gaspi'],
    ingredientsFridge: [
      'Épinards frais (200 g)',
      'Œufs (3 unités)',
      'Cheddar râpé (50 g)'
    ],
    ingredientsPantry: [
      '1 c. à soupe d\'huile d\'olive',
      'Sel et poivre noir du moulin'
    ],
    instructions: [
      'Dans un bol, battre énergiquement les œufs avec une pincée de sel et de poivre.',
      'Faire chauffer l\'huile d\'olive dans une poêle antiadhésive à feu moyen. Ajouter les épinards et les faire tomber 1 à 2 minutes.',
      'Verser les œufs battus sur les épinards, saupoudrer de fromage cheddar râpé.',
      'Laisser cuire à feu doux pendant 4 à 5 minutes en ramenant délicatement les bords vers le centre.',
      'Plier l\'omelette en deux et servir chaud immédiatement.'
    ],
    savingsValue: 4.50,
    co2Saved: 0.8
  },
  {
    id: 'recipe-2',
    title: 'Gratin express poulet, tomates & cheddar',
    subtitle: 'Une solution réconfortante et rapide pour terminer le poulet cuit et les tomates cerises.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    badge: 'Sauve 3 aliments à risque',
    time: '20 min',
    wasteSaved: '95% sauvé',
    wasteScore: 95,
    tags: ['Familial', 'Express'],
    ingredientsFridge: [
      'Poulet cuit effiloché (300 g)',
      'Tomates cerises (200 g, coupées en deux)',
      'Fromage cheddar râpé (100 g)'
    ],
    ingredientsPantry: [
      '1 gousse d\'ail ou poudre d\'ail',
      'Origan séché, sel, filet d\'huile'
    ],
    instructions: [
      'Préchauffer le four à 200°C (390°F) en mode grill ou convection.',
      'Dans un plat allant au four, déposer le poulet effiloché et les tomates cerises coupées.',
      'Arroser d\'un filet d\'huile d\'olive, assaisonner d\'ail et d\'origan.',
      'Recouvrir généreusement du fromage cheddar râpé restant.',
      'Enfourner pour 12 à 15 minutes jusqu\'à ce que le fromage soit gratiné et bouillonnant.'
    ],
    savingsValue: 7.20,
    co2Saved: 1.4
  },
  {
    id: 'recipe-3',
    title: 'Smoothie vert velouté aux épinards & lait',
    subtitle: 'Doux, vitaminé et anti-gaspillage, idéal pour le petit-déjeuner des enfants.',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80',
    badge: 'Utilise 2 ingrédients',
    time: '5 min',
    wasteSaved: '100% anti-gaspi',
    wasteScore: 100,
    tags: ['Végétarien', 'Sans cuisson', 'Enfant'],
    ingredientsFridge: [
      'Lait 2% (250 ml)',
      'Épinards frais (une bonne poignée / 50 g)'
    ],
    ingredientsPantry: [
      '1 banane ou pomme (garde-manger)',
      '1 c. à thé de miel ou sirop d\'érable'
    ],
    instructions: [
      'Mettre les feuilles d\'épinards et le lait 2% dans le bol d\'un mélangeur.',
      'Ajouter la banane coupée en morceaux et le filet de miel.',
      'Mixer à puissance maximale pendant 45 secondes jusqu\'à consistance crémeuse.',
      'Déguster bien frais !'
    ],
    savingsValue: 2.80,
    co2Saved: 0.4
  },
  {
    id: 'recipe-4',
    title: 'Frittata vide-frigo tous légumes',
    subtitle: 'La recette magique pour rassembler tous les restes du frigo en un repas complet.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    badge: 'Sauve 4 aliments',
    time: '18 min',
    wasteSaved: '0% gaspillage',
    wasteScore: 100,
    tags: ['Végétarien', 'Vide-frigo'],
    ingredientsFridge: [
      'Œufs frais (3 unités)',
      'Épinards frais (100 g)',
      'Tomates cerises (50 g)',
      'Fromage cheddar râpé (30 g)'
    ],
    ingredientsPantry: [
      'Huile d\'olive, sel, poivre'
    ],
    instructions: [
      'Battre les œufs dans un bol avec sel et poivre.',
      'Faire suer les légumes dans une poêle allant au four.',
      'Verser les œufs par-dessus et parsemer de cheddar.',
      'Cuire 5 minutes sur la plaque, puis terminer 5 minutes sous le gril du four.'
    ],
    savingsValue: 5.10,
    co2Saved: 0.9
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Épinards frais à consommer',
    body: 'Vos épinards expirent aujourd\'hui ! 2 recettes recommandées sont prêtes.',
    time: 'Il y a 25 min',
    type: 'alert',
    unread: true,
  },
  {
    id: 'notif-2',
    title: 'Capture automatique réussie',
    body: 'Le module caméra a détecté 6 aliments lors de la dernière fermeture de porte.',
    time: 'Il y a 45 min',
    type: 'camera',
    unread: true,
  },
  {
    id: 'notif-3',
    title: 'Bravo pour votre impact !',
    body: 'Vous avez déjà économisé 15 $ et évité 2.4 kg de CO2 ce mois-ci.',
    time: 'Hier',
    type: 'eco',
    unread: false,
  }
];
