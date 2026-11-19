import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import FridgeView from './components/FridgeView';
import RecipesView from './components/RecipesView';
import ProfileView from './components/ProfileView';
import RecipeDetailModal from './components/RecipeDetailModal';
import CameraModuleModal from './components/CameraModuleModal';
import { 
  INITIAL_INVENTORY, 
  INITIAL_RECIPES, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';
import { sound } from './utils/audio';

export default function App() {
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialTab = urlParams?.get('tab') || 'fridge';
  const initialModal = urlParams?.get('modal');

  const [activeTab, setActiveTab] = useState(initialTab);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  
  // Modals
  const [selectedRecipe, setSelectedRecipe] = useState(INITIAL_RECIPES[0]);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(initialModal === 'recipe');
  const [isHardwareModalOpen, setIsHardwareModalOpen] = useState(initialModal === 'hardware');

  // User Profile State
  const [userPreferences, setUserPreferences] = useState({
    vegetarian: false,
    glutenFree: false,
    quickOnly: false,
  });
  const [allergies, setAllergies] = useState(['Arachides', 'Fruits de mer']);
  const [impactStats, setImpactStats] = useState({
    moneySaved: 15.00,
    co2Saved: 2.4,
    mealsSaved: 8,
  });

  // Camera & Sync States
  const [isSyncing, setIsSyncing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('10:35');
  const [cameraFlash, setCameraFlash] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  // Synchronise camera capture simulation
  const handleSyncCamera = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setCameraFlash(true);
    setTimeout(() => setCameraFlash(false), 200);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(timeStr);
      sound.playSuccess();
      showToast('📸 Caméra synchronisée : 6 aliments détectés par vision IA !');

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: 'Capture synchronisée',
          body: `Nouvelle vue du réfrigérateur analysée avec succès à ${timeStr}.`,
          time: 'À l\'instant',
          type: 'camera',
          unread: true,
        },
        ...prev,
      ]);
    }, 1800);
  };

  // Delete inventory item
  const handleDeleteItem = (id) => {
    const itemToDelete = inventory.find((i) => i.id === id);
    setInventory((prev) => prev.filter((i) => i.id !== id));
    if (itemToDelete) {
      showToast(`Retiré : ${itemToDelete.name}`);
    }
  };

  // Add inventory item
  const handleAddItem = (newItem) => {
    const id = `item-${Date.now()}`;
    setInventory((prev) => [
      {
        id,
        ...newItem,
      },
      ...prev,
    ]);
    showToast(`Ajouté à l'inventaire : ${newItem.name}`);
  };

  // Generate new AI recipe suggestions
  const handleGenerateNewIdeas = () => {
    if (isGenerating) return;
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      sound.playSuccess();

      const newRecipe = {
        id: `recipe-${Date.now()}`,
        title: 'Poêlée surprise vide-frigo express',
        subtitle: 'Conçue spécialement pour utiliser vos restes d\'œufs et légumes en 12 minutes.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        badge: 'Utilise 3 ingrédients',
        time: '12 min',
        wasteSaved: '0% gaspillage',
        wasteScore: 100,
        tags: ['Express', 'Anti-gaspi', 'Végétarien'],
        ingredientsFridge: [
          'Épinards frais (100 g)',
          'Œufs (2 unités)',
          'Tomates cerises (6 unités)'
        ],
        ingredientsPantry: [
          'Huile d\'olive, sel, poivre et origan'
        ],
        instructions: [
          'Faire sauter rapidement les légumes dans un wok ou une poêle très chaude.',
          'Casser les œufs directement au centre et remuer à feu moyen.',
          'Assaisonner et servir aussitôt avec une tranche de pain grillé.'
        ],
        savingsValue: 3.80,
        co2Saved: 0.7
      };

      setRecipes((prev) => [newRecipe, ...prev]);
      showToast('✨ 1 nouvelle recette anti-gaspillage générée par l\'IA !');
    }, 1600);
  };

  // Select recipe to view modal
  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsRecipeModalOpen(true);
  };

  // Cook recipe action
  const handleCookRecipe = (recipe) => {
    setImpactStats((prev) => ({
      moneySaved: prev.moneySaved + (recipe.savingsValue || 4.0),
      co2Saved: +(prev.co2Saved + (recipe.co2Saved || 0.6)).toFixed(1),
      mealsSaved: prev.mealsSaved + 1,
    }));

    setInventory((prev) =>
      prev.map((item) => {
        if (item.name.toLowerCase().includes('épinards')) {
          return { ...item, quantity: '50 g', statusText: 'Bientôt terminé' };
        }
        if (item.name.toLowerCase().includes('œufs')) {
          return { ...item, quantity: '3 unités' };
        }
        return item;
      })
    );

    showToast(`🎉 Repas cuisiné ! +$${(recipe.savingsValue || 4.0).toFixed(2)} économisés`);
  };

  // Toggle user dietary preference
  const handleTogglePreference = (key) => {
    setUserPreferences((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast(`Préférence mise à jour : ${key}`);
      return updated;
    });
  };

  // Add allergy
  const handleAddAllergy = (allergy) => {
    if (!allergies.includes(allergy)) {
      setAllergies((prev) => [...prev, allergy]);
      showToast(`Allergie ajoutée : ${allergy}`);
    }
  };

  // Remove allergy
  const handleRemoveAllergy = (allergy) => {
    setAllergies((prev) => prev.filter((a) => a !== allergy));
    showToast(`Allergie retirée : ${allergy}`);
  };

  // Mark all notifications read
  const handleMarkAllRead = () => {
    sound.playPop();
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Dismiss one notification
  const handleDismissNotif = (id) => {
    sound.playDelete();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-start items-center selection:bg-emerald-500 selection:text-white border-0 outline-none">
      {/* Main App Container: Clean, borderless, looks like final app on any screen */}
      <main className="w-full max-w-md min-h-screen bg-white flex flex-col overflow-hidden shadow-sm sm:shadow-lg sm:my-0 border-0 outline-none">
        {/* Camera Flash Simulation Effect */}
        {cameraFlash && (
          <div className="absolute inset-0 bg-white z-50 pointer-events-none animate-in fade-in zoom-in duration-150" />
        )}

        {/* Floating In-App Toast */}
        {toastMessage && (
          <div className="fixed sm:absolute top-16 inset-x-4 max-w-sm mx-auto z-40 bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl flex items-center justify-between animate-in slide-in-from-top-3 fade-in duration-200">
            <span className="truncate pr-2">{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Native Safe Area Spacing on mobile */}
        <div className="h-[env(safe-area-inset-top,0px)] bg-white w-full shrink-0" />

        {/* App Header */}
        <Header
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onDismissNotif={handleDismissNotif}
        />

        {/* Tab Views */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#fbfdfb]">
          {activeTab === 'fridge' && (
            <FridgeView
              inventory={inventory}
              onDeleteItem={handleDeleteItem}
              onAddItem={handleAddItem}
              onSyncCamera={handleSyncCamera}
              isSyncing={isSyncing}
              lastSyncTime={lastSyncTime}
            />
          )}

          {activeTab === 'recipes' && (
            <RecipesView
              recipes={recipes}
              onSelectRecipe={handleSelectRecipe}
              onGenerateNewIdeas={handleGenerateNewIdeas}
              isGenerating={isGenerating}
              userPreferences={userPreferences}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              preferences={userPreferences}
              onTogglePreference={handleTogglePreference}
              allergies={allergies}
              onAddAllergy={handleAddAllergy}
              onRemoveAllergy={handleRemoveAllergy}
              impactStats={impactStats}
              onOpenHardwareModal={() => setIsHardwareModalOpen(true)}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Safe Area Bottom on mobile */}
        <div className="h-[env(safe-area-inset-bottom,0px)] bg-white w-full shrink-0" />
      </main>

      {/* Recipe Detail Modal (Figure 5) */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        onCookRecipe={handleCookRecipe}
      />

      {/* Hardware Camera Specification Modal (Figures 7-11) */}
      <CameraModuleModal
        isOpen={isHardwareModalOpen}
        onClose={() => setIsHardwareModalOpen(false)}
      />
    </div>
  );
}
