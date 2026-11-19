import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import FridgeView from './components/FridgeView';
import RecipesView from './components/RecipesView';
import ProfileView from './components/ProfileView';
import RecipeDetailModal from './components/RecipeDetailModal';
import CameraModuleModal from './components/CameraModuleModal';
import DemoControls, { PUBLIC_MOBILE_URL } from './components/DemoControls';
import { 
  INITIAL_INVENTORY, 
  INITIAL_RECIPES, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';
import { sound } from './utils/audio';
import { Wifi, Battery, Signal, Sparkles, Wand2, X, DoorOpen, AlertCircle, RotateCcw, GraduationCap } from 'lucide-react';

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
  const [showMobileSimDrawer, setShowMobileSimDrawer] = useState(false);

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

  // Screen detection & Frame Mode
  const [isMobileDevice, setIsMobileDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 640 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  });
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 640 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobileDevice(mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  // Toggle Sound FX
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.enabled = !nextMuted;
    if (!nextMuted) sound.playPop();
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

  // Quick simulation: Door Open Trigger
  const handleSimulateDoorOpen = () => {
    sound.playShutter();
    setCameraFlash(true);
    setTimeout(() => setCameraFlash(false), 250);
    handleSyncCamera();
  };

  // Quick simulation: Expiring item trigger
  const handleSimulateExpiringItem = () => {
    sound.playPop();
    const urgentItem = {
      id: `item-${Date.now()}`,
      name: 'Fraises du Québec',
      category: 'Fruits',
      expiry: 'aujourd\'hui',
      expiryDays: 0,
      statusText: 'Expire aujourd\'hui !',
      statusColor: 'text-rose-600 bg-rose-50 border-rose-200',
      statusBadge: 'rose',
      quantity: '1 panier (454 g)',
      unit: 'panier',
      amount: 1,
      icon: '🍓',
      atRisk: true,
    };
    setInventory((prev) => [urgentItem, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Alerte anti-gaspillage !',
        body: 'Fraises du Québec arrivent à expiration aujourd\'hui. Consommez-les rapidement !',
        time: 'À l\'instant',
        type: 'alert',
        unread: true,
      },
      ...prev,
    ]);

    showToast('🚨 Fraises du Québec expirent aujourd\'hui !');
    setActiveTab('fridge');
  };

  // Reset to initial demo data
  const handleResetData = () => {
    setInventory(INITIAL_INVENTORY);
    setRecipes(INITIAL_RECIPES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setUserPreferences({ vegetarian: false, glutenFree: false, quickOnly: false });
    setImpactStats({ moneySaved: 15.00, co2Saved: 2.4, mealsSaved: 8 });
    showToast('🔄 Données de démonstration réinitialisées.');
  };

  // Render on real phone vs desktop
  const isActualMobile = isMobileDevice;

  return (
    <div className={`min-h-screen ${isActualMobile ? 'bg-white p-0 w-full overflow-x-hidden' : 'bg-slate-900/95 py-3 sm:py-6'} flex flex-col justify-between selection:bg-emerald-500 selection:text-white`}>
      {/* Top Demo Toolbar (only on desktop) */}
      {!isActualMobile && (
        <DemoControls
          isMobileFrame={isMobileFrame}
          onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
          onSimulateDoorOpen={handleSimulateDoorOpen}
          onSimulateExpiringItem={handleSimulateExpiringItem}
          onResetData={handleResetData}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* Main Container */}
      <main className={`flex-1 flex flex-col ${isActualMobile ? 'p-0 w-full' : 'items-center justify-center p-2 sm:p-4'}`}>
        <div
          className={`relative transition-all duration-300 w-full ${
            isActualMobile
              ? 'min-h-[100dvh] h-[100dvh] bg-white flex flex-col overflow-hidden w-full shadow-none'
              : isMobileFrame
              ? 'max-w-[410px] h-[855px] rounded-[52px] border-[12px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] bg-white overflow-hidden flex flex-col ring-1 ring-slate-700/50'
              : 'max-w-2xl min-h-[85vh] rounded-3xl border border-slate-700/50 shadow-2xl bg-white overflow-hidden flex flex-col'
          }`}
        >
          {/* Camera Flash Simulation Effect */}
          {cameraFlash && (
            <div className="absolute inset-0 bg-white z-50 pointer-events-none animate-in fade-in zoom-in duration-150" />
          )}

          {/* Floating In-App Toast */}
          {toastMessage && (
            <div className="absolute top-16 inset-x-4 z-40 bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl flex items-center justify-between animate-in slide-in-from-top-3 fade-in duration-200">
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

          {/* Simulated Status Bar (only shown on desktop within the mockup frame) */}
          {!isActualMobile && isMobileFrame && (
            <div className="pt-2 px-6 pb-1 bg-white flex items-center justify-between text-slate-800 select-none z-30">
              <span className="font-semibold text-xs tracking-tight">09:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900/80 mr-3" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5 text-slate-800">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          {/* Native Safe Area Spacing on real mobile */}
          {isActualMobile && (
            <div className="h-[env(safe-area-inset-top,0px)] bg-white w-full" />
          )}

          {/* App Header */}
          <Header
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onDismissNotif={handleDismissNotif}
          />

          {/* Tab Views */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/70">
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

          {/* Home indicator bar for phone frame on desktop */}
          {!isActualMobile && isMobileFrame && (
            <div className="py-1.5 bg-white flex justify-center z-30">
              <div className="w-32 h-1 bg-slate-300 rounded-full" />
            </div>
          )}

          {/* Safe Area Bottom for real phone */}
          {isActualMobile && (
            <div className="h-[env(safe-area-inset-bottom,0px)] bg-white w-full" />
          )}
        </div>
      </main>

      {/* Floating Action Button for Mobile Devices: Simulator Trigger */}
      {isActualMobile && (
        <>
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setShowMobileSimDrawer(true);
            }}
            className="fixed bottom-20 right-4 z-40 bg-slate-900/90 text-white p-3 rounded-full shadow-2xl border border-slate-700/80 active:scale-90 transition-transform flex items-center gap-1.5 text-xs font-bold backdrop-blur-md"
            aria-label="Ouvrir le simulateur"
          >
            <Wand2 className="w-4 h-4 text-emerald-400" />
            <span className="pr-1 text-[11px]">Simulateur</span>
          </button>

          {/* Mobile Simulator Bottom Drawer */}
          {showMobileSimDrawer && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-150">
              <div className="bg-white rounded-t-3xl w-full max-w-md p-5 space-y-3.5 shadow-2xl animate-in slide-in-from-bottom duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-heading font-extrabold text-sm text-slate-800">
                      Simulateur Démo FrigoFuté
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMobileSimDrawer(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      handleSimulateDoorOpen();
                      setShowMobileSimDrawer(false);
                    }}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left font-semibold text-slate-800 flex flex-col gap-1.5"
                  >
                    <DoorOpen className="w-4 h-4 text-emerald-600" />
                    <span>Porte Ouverte (Capteur LUX)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleSimulateExpiringItem();
                      setShowMobileSimDrawer(false);
                    }}
                    className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left font-semibold text-amber-900 flex flex-col gap-1.5"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Alerte Périmé (Fraises)</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleResetData();
                    setShowMobileSimDrawer(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réinitialiser les données de démo</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

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

      {/* Footer credits (only on desktop) */}
      {!isActualMobile && (
        <footer className="text-center text-[11px] text-slate-400 py-2">
          <span>FrigoFuté • Prototype interactif haute fidélité • Polytechnique Montréal 2026</span>
        </footer>
      )}
    </div>
  );
}
