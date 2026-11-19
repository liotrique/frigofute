import React, { useState } from 'react';
import { 
  Globe2, 
  Sparkles, 
  Plus, 
  X, 
  ShieldCheck, 
  Camera, 
  Cpu, 
  BatteryMedium, 
  Wifi, 
  TrendingUp, 
  Award,
  Info
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function ProfileView({ 
  profile, 
  preferences, 
  onTogglePreference, 
  allergies, 
  onAddAllergy, 
  onRemoveAllergy,
  impactStats,
  onOpenHardwareModal 
}) {
  const [showAddAllergyInput, setShowAddAllergyInput] = useState(false);
  const [newAllergyText, setNewAllergyText] = useState('');

  const handleAddAllergySubmit = (e) => {
    e.preventDefault();
    if (!newAllergyText.trim()) return;
    sound.playSuccess();
    onAddAllergy(newAllergyText.trim());
    setNewAllergyText('');
    setShowAddAllergyInput(false);
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4 pb-16">
      {/* User Header matching Figure 6 */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center gap-3.5">
        <div className="w-13 h-13 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-heading font-extrabold text-xl shadow-md shadow-emerald-600/30">
          LT
        </div>
        <div className="flex-1">
          <h1 className="font-heading font-bold text-lg text-slate-800 leading-tight">
            Laurel Tremblay
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Membre depuis Sept 2026 • Équipe 2
          </p>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Actif
        </span>
      </div>

      {/* Préférences Alimentaires matching Figure 6 */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
        <h2 className="font-heading font-bold text-sm text-slate-800">
          Préférences Alimentaires
        </h2>

        <div className="space-y-3">
          {/* Végétarien Switch */}
          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-semibold text-slate-700">
              Végétarien
            </span>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                onTogglePreference('vegetarian');
              }}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                preferences.vegetarian ? 'bg-emerald-600 justify-end' : 'bg-slate-200 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* Sans Gluten Switch */}
          <div className="flex items-center justify-between py-1 border-t border-slate-50">
            <span className="text-xs font-semibold text-slate-700">
              Sans Gluten
            </span>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                onTogglePreference('glutenFree');
              }}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                preferences.glutenFree ? 'bg-emerald-600 justify-end' : 'bg-slate-200 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* Repas rapides Switch */}
          <div className="flex items-center justify-between py-1 border-t border-slate-50">
            <span className="text-xs font-semibold text-slate-700">
              Repas express (&lt; 20 min)
            </span>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                onTogglePreference('quickOnly');
              }}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                preferences.quickOnly ? 'bg-emerald-600 justify-end' : 'bg-slate-200 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Allergies matching Figure 6 */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-sm text-slate-800">
            Allergies
          </h2>
          <span className="text-[10px] text-slate-400">
            Exclut les ingrédients à risque
          </span>
        </div>

        {/* Allergy chips */}
        <div className="flex flex-wrap gap-2 items-center">
          {allergies.map((allergy) => (
            <span
              key={allergy}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold"
            >
              <span>{allergy}</span>
              <button
                type="button"
                onClick={() => {
                  sound.playDelete();
                  onRemoveAllergy(allergy);
                }}
                className="hover:text-rose-800 p-0.5 rounded-full"
                title="Retirer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Add Allergy Button */}
          {!showAddAllergyInput ? (
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setShowAddAllergyInput(true);
              }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Ajouter</span>
            </button>
          ) : (
            <form onSubmit={handleAddAllergySubmit} className="flex items-center gap-1.5 w-full mt-2">
              <input
                type="text"
                placeholder="Ex: Lactose, Noix..."
                value={newAllergyText}
                onChange={(e) => setNewAllergyText(e.target.value)}
                autoFocus
                className="flex-1 px-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                OK
              </button>
              <button
                type="button"
                onClick={() => setShowAddAllergyInput(false)}
                className="px-2 py-1 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Mon Impact matching Figure 6 */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-5 shadow-lg shadow-emerald-700/20 relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute right-4 top-4">
          <Globe2 className="w-6 h-6 text-emerald-200/90" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-heading font-extrabold text-base tracking-wide">
            Mon Impact
          </h2>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
            Ce mois-ci
          </span>
        </div>

        {/* Metrics Grid matching Figure 6: $15 & 2.4 kg */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div className="bg-white/15 backdrop-blur-xs rounded-2xl p-3 border border-white/20">
            <p className="font-heading font-black text-2xl tracking-tight">
              {impactStats.moneySaved.toFixed(0)} $
            </p>
            <p className="text-[11px] text-emerald-100 font-medium mt-0.5">
              Économisés ce mois
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-xs rounded-2xl p-3 border border-white/20">
            <p className="font-heading font-black text-2xl tracking-tight">
              {impactStats.co2Saved.toFixed(1)} kg
            </p>
            <p className="text-[11px] text-emerald-100 font-medium mt-0.5">
              CO2 évité
            </p>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs text-emerald-100">
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Repas sauvés du gaspillage :</span>
          </span>
          <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-full">
            {impactStats.mealsSaved} repas
          </span>
        </div>
      </div>

      {/* Hardware Camera Module card (Bonus from Figures 7-11 of report) */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-600" />
            <h3 className="font-heading font-bold text-sm text-slate-800">
              Module Caméra Amovible FrigoFuté
            </h3>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            En ligne
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Prototype P3 amovible avec ventouses, capteur LUX d'ouverture de porte et objectif 120°.
        </p>

        <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
          <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-xl">
            <BatteryMedium className="w-3.5 h-3.5 text-emerald-600" />
            <span>87% (Batterie USB)</span>
          </span>
          <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-xl">
            <Wifi className="w-3.5 h-3.5 text-blue-500" />
            <span>Wi-Fi 2.4 GHz</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playPop();
            onOpenHardwareModal();
          }}
          className="w-full mt-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Voir le schéma technique &amp; conception 3D</span>
        </button>
      </div>
    </div>
  );
}
