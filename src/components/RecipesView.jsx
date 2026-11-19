import React, { useState } from 'react';
import { Sparkles, Clock, Leaf, ChevronRight, Wand2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function RecipesView({ 
  recipes, 
  onSelectRecipe, 
  onGenerateNewIdeas, 
  isGenerating,
  userPreferences 
}) {
  const [filter, setFilter] = useState('all');

  const filteredRecipes = recipes.filter((recipe) => {
    if (userPreferences.vegetarian && !recipe.tags?.includes('Végétarien')) {
      return false;
    }
    if (userPreferences.quickOnly && parseInt(recipe.time) > 15) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4 pb-16">
      {/* Title & Subtitle matching Figure 4 */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-800 tracking-tight">
            Suggestions de Recettes
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Basées sur vos aliments à risque
          </p>
        </div>

        {/* Small active preferences pills */}
        <div className="flex flex-col items-end gap-1">
          {userPreferences.vegetarian && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              🌱 Végétarien
            </span>
          )}
          {userPreferences.glutenFree && (
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              🌾 Sans Gluten
            </span>
          )}
        </div>
      </div>

      {/* Purple Action Button: Générer de nouvelles idées matching Figure 4 */}
      <button
        type="button"
        onClick={() => {
          sound.playPop();
          onGenerateNewIdeas();
        }}
        disabled={isGenerating}
        className={`w-full py-3.5 px-4 rounded-2xl bg-[#7c5295] hover:bg-[#6c4485] active:scale-98 text-white font-heading font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 border-0 outline-none shadow-none ${
          isGenerating ? 'opacity-90 cursor-wait' : ''
        }`}
      >
        <Sparkles className="w-4 h-4 text-white" />
        <span>{isGenerating ? 'Génération en cours...' : 'Générer de nouvelles idées'}</span>
      </button>

      {/* Generating Indicator */}
      {isGenerating && (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 flex items-center gap-3 animate-in fade-in duration-200">
          <div className="w-6 h-6 rounded-full bg-[#7c5295] text-white flex items-center justify-center shrink-0 animate-spin">
            <Wand2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="font-bold">Génération anti-gaspillage</p>
            <p className="text-[11px] text-slate-500">Création de recettes avec vos aliments à risque...</p>
          </div>
        </div>
      )}

      {/* Recipe Cards List matching Figure 4 */}
      <div className="space-y-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200"
          >
            {/* Food Image with top-right Badge */}
            <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden group">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Tag top right: Utilise X ingrédients */}
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full bg-emerald-600/95 backdrop-blur-md text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
                  {recipe.badge}
                </span>
              </div>

              {/* Waste badge overlay */}
              <div className="absolute bottom-2.5 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1">
                  <Leaf className="w-3 h-3 text-emerald-400" />
                  {recipe.wasteSaved}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
              <div>
                <h2 className="font-heading font-extrabold text-base text-slate-800 leading-snug">
                  {recipe.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {recipe.subtitle}
                </p>
              </div>

              {/* Metadata row: 15 min & 0% gaspillage */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-50">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{recipe.time}</span>
                </div>

                <div className="flex items-center gap-1 font-semibold text-emerald-600">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>{recipe.wasteSaved}</span>
                </div>
              </div>

              {/* Full-width Green Button: Voir la recette (Figure 4) */}
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  onSelectRecipe(recipe);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-heading font-bold text-sm shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Voir la recette</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredRecipes.length === 0 && (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 space-y-2">
            <p className="text-sm font-bold text-slate-700">Aucune recette ne correspond à vos filtres stricts</p>
            <p className="text-xs text-slate-400">Désactivez les filtres dans votre Profil ou cliquez sur "Générer de nouvelles idées".</p>
          </div>
        )}
      </div>
    </div>
  );
}
