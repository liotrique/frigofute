import React from 'react';
import { Refrigerator, UtensilsCrossed, User } from 'lucide-react';
import { sound } from '../utils/audio';

export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: 'fridge',
      label: 'Mon Frigo',
      icon: Refrigerator,
    },
    {
      id: 'recipes',
      label: 'Recettes',
      icon: UtensilsCrossed,
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: User,
    },
  ];

  return (
    <nav className="border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-3 sm:px-6 py-2 flex items-center justify-around z-20 w-full shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              sound.playPop();
              onTabChange(tab.id);
            }}
            className={`flex flex-col items-center justify-center gap-0.5 transition-all py-1 px-3 rounded-xl relative ${
              isActive
                ? 'text-emerald-600 font-bold'
                : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
          >
            <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[11px] tracking-tight">{tab.label}</span>
            {isActive && (
              <span className="absolute -bottom-1 w-6 h-0.5 bg-emerald-600 rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
