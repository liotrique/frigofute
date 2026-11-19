import React, { useEffect, useRef } from 'react';
import { X, Clock, Leaf, Check, Plus, ChefHat, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function RecipeDetailModal({ 
  recipe, 
  isOpen, 
  onClose, 
  onCookRecipe 
}) {
  const dialogRef = useRef(null);

  // Synchronize modal state with native HTML5 <dialog> as per modern-web-guidance
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Light dismiss fallback for browsers without native closedby support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handlePointerDown = (e) => {
      const rect = dialog.getBoundingClientRect();
      const isOutside = (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      );
      dialog.dataset.pressedOutside = isOutside ? 'true' : 'false';
    };

    const handlePointerUp = (e) => {
      const rect = dialog.getBoundingClientRect();
      const isOutside = (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      );
      if (dialog.dataset.pressedOutside === 'true' && isOutside) {
        onClose();
      }
    };

    dialog.addEventListener('pointerdown', handlePointerDown);
    dialog.addEventListener('pointerup', handlePointerUp);

    return () => {
      dialog.removeEventListener('pointerdown', handlePointerDown);
      dialog.removeEventListener('pointerup', handlePointerUp);
    };
  }, [onClose]);

  if (!recipe) return null;

  const handleCook = () => {
    sound.playSuccess();

    // Trigger celebratory anti-waste confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#6ee7b7', '#f59e0b', '#8b5cf6']
      });
    } catch (e) {}

    onCookRecipe(recipe);
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      closedby="any"
      aria-labelledby="recipe-dialog-title"
      className="m-auto rounded-3xl max-w-sm w-[92%] p-0 bg-white shadow-2xl border border-slate-100 overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Top Image matching Figure 5 */}
      <div className="relative h-44 bg-slate-900 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />

        {/* Close Button top-right */}
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:bg-white flex items-center justify-center shadow-md transition-all active:scale-95"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badges on image */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
            <Leaf className="w-3 h-3" />
            {recipe.badge}
          </span>
        </div>
      </div>

      {/* Content container */}
      <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
        {/* Title & Metadata */}
        <div>
          <h2 id="recipe-dialog-title" className="font-heading font-extrabold text-xl text-slate-800 leading-snug">
            {recipe.title}
          </h2>

          <div className="flex items-center gap-4 mt-2 text-xs font-semibold">
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {recipe.time}
            </span>
            <span className="flex items-center gap-1 text-emerald-600">
              <Leaf className="w-3.5 h-3.5" />
              {recipe.wasteSaved}
            </span>
            <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full text-[10px]">
              +${recipe.savingsValue?.toFixed(2)} économisés
            </span>
          </div>
        </div>

        {/* Ingrédients utilisés (Figure 5) */}
        <div>
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
            Ingrédients utilisés
          </h3>
          <div className="space-y-1.5 text-xs">
            {recipe.ingredientsFridge?.map((ing, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-700 bg-emerald-50/60 p-2 rounded-xl">
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className="font-medium">{ing}</span>
                <span className="text-[10px] text-emerald-700 font-bold ml-auto">(du frigo)</span>
              </div>
            ))}

            {recipe.ingredientsPantry?.map((ing, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-600 p-2">
                <Plus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{ing}</span>
                <span className="text-[10px] text-slate-400 ml-auto">(garde-manger)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions (Figure 5) */}
        <div>
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
            Instructions
          </h3>
          <ol className="space-y-2 text-xs text-slate-700 leading-relaxed">
            {recipe.instructions?.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="font-bold text-emerald-600 shrink-0 mt-0.5">
                  {i + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-slate-50/90 border-t border-slate-100 flex items-center gap-2">
        <button
          type="button"
          onClick={handleCook}
          className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-heading font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <ChefHat className="w-4 h-4" />
          <span>J'ai cuisiné cette recette !</span>
        </button>
      </div>
    </dialog>
  );
}
