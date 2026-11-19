import React, { useState } from 'react';
import { 
  RotateCw, 
  Camera, 
  Pencil, 
  Trash2, 
  Plus, 
  Sparkles, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  Clock, 
  ChevronRight,
  CheckCircle2,
  ScanLine
} from 'lucide-react';
import { CAMERA_CAPTURES } from '../data/mockData';
import { sound } from '../utils/audio';

export default function FridgeView({ 
  inventory, 
  onDeleteItem, 
  onAddItem, 
  onUpdateQuantity,
  onSyncCamera,
  isSyncing,
  lastSyncTime 
}) {
  const [selectedCaptureIdx, setSelectedCaptureIdx] = useState(0);
  const [showAiDetections, setShowAiDetections] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('');
  const [newItemExpiry, setNewItemExpiry] = useState('dans 3 jours');
  const [newItemCategory, setNewItemCategory] = useState('Légumes');

  const activeCapture = CAMERA_CAPTURES[selectedCaptureIdx];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemQty.trim()) return;

    sound.playSuccess();
    onAddItem({
      name: newItemName.trim(),
      quantity: newItemQty.trim(),
      expiry: newItemExpiry,
      expiryDays: newItemExpiry.includes('aujourd') ? 0 : newItemExpiry.includes('demain') ? 1 : 3,
      category: newItemCategory,
      icon: newItemCategory === 'Légumes' ? '🥦' : newItemCategory === 'Produits laitiers' ? '🧀' : '🍎',
      statusText: newItemExpiry,
      statusColor: newItemExpiry.includes('aujourd') 
        ? 'text-rose-600 bg-rose-50 border-rose-200' 
        : newItemExpiry.includes('demain')
        ? 'text-amber-600 bg-amber-50 border-amber-200'
        : 'text-emerald-700 bg-emerald-50 border-emerald-200'
    });

    setNewItemName('');
    setNewItemQty('');
    setShowAddForm(false);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-16">
      {/* Title Bar with Synchroniser button */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800 tracking-tight truncate">
            Mon Réfrigérateur
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">
            Dernière mise à jour : {lastSyncTime}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playShutter();
            onSyncCamera();
          }}
          disabled={isSyncing}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm ${
            isSyncing 
              ? 'bg-emerald-100 text-emerald-800 animate-pulse cursor-wait' 
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:scale-95 border border-emerald-200/80'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Analyse...' : 'Synchroniser'}</span>
        </button>
      </div>

      {/* Sync Banner if in progress */}
      {isSyncing && (
        <div className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl shadow-md text-xs flex items-center justify-between animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2">
            <ScanLine className="w-4 h-4 animate-bounce text-emerald-200" />
            <div>
              <p className="font-semibold">Capture caméra & analyse IA en cours</p>
              <p className="text-[10px] text-emerald-100">Traitement local par vision d'ordinateur...</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">120° Wide</span>
        </div>
      )}

      {/* Card: Dernières captures matching Figure 3 */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-bold text-base text-slate-800">
            Dernières captures
          </h2>

          {/* Camera action icon matching Figure 3 */}
          <button
            type="button"
            onClick={() => {
              sound.playShutter();
              onSyncCamera();
            }}
            className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-90 text-white flex items-center justify-center shadow-sm shadow-emerald-500/20 transition-all border-none outline-none"
            title="Prendre une photo maintenant"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Fridge Photo Carousel View */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[16/10] border border-slate-200/80 shadow-inner group">
          <img
            src={activeCapture.url}
            alt={activeCapture.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Bottom Photo Caption */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2.5 flex items-center justify-between text-white">
            <div>
              <p className="text-xs font-semibold">{activeCapture.title}</p>
              <p className="text-[10px] text-slate-300">{activeCapture.time}</p>
            </div>
          </div>
        </div>

        {/* Carousel thumbnails selector */}
        <div className="flex gap-1.5 mt-2.5 overflow-x-auto pb-1">
          {CAMERA_CAPTURES.map((cap, idx) => (
            <button
              key={cap.id}
              type="button"
              onClick={() => {
                sound.playPop();
                setSelectedCaptureIdx(idx);
              }}
              className={`flex-1 min-w-0 py-1.5 px-2 rounded-xl text-left border text-[10px] sm:text-[11px] transition-all truncate ${
                selectedCaptureIdx === idx
                  ? 'bg-emerald-50/80 border-emerald-400 font-bold text-emerald-800 ring-1 ring-emerald-400'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="truncate font-semibold">{cap.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Card: Inventaire détecté */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-heading font-bold text-base text-slate-800">
              Inventaire détecté
            </h2>
            <span className="text-xs font-semibold text-slate-400">
              ({inventory.length})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setShowAddForm(!showAddForm);
              }}
              className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all text-xs flex items-center gap-1 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setIsEditMode(!isEditMode);
              }}
              className={`p-1.5 rounded-xl transition-all ${
                isEditMode
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title="Mode modification"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Add Form Drawer */}
        {showAddForm && (
          <form 
            onSubmit={handleAddSubmit}
            className="mb-4 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2.5 animate-in slide-in-from-top-2 duration-150"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900">
                Ajouter un aliment au frigo
              </span>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Annuler
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Nom (ex: Yaourt nature)"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="col-span-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Quantité (ex: 4 pots)"
                value={newItemQty}
                onChange={(e) => setNewItemQty(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
              <select
                value={newItemExpiry}
                onChange={(e) => setNewItemExpiry(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Expire aujourd'hui">Expire aujourd'hui</option>
                <option value="Expire demain">Expire demain</option>
                <option value="Expire dans 3 jours">Expire dans 3 jours</option>
                <option value="Expire dans 1 semaine">Expire dans 1 semaine</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm active:scale-98 transition-all"
            >
              Enregistrer l'aliment
            </button>
          </form>
        )}

        {/* Inventory Item Rows matching Figure 3 */}
        <div className="divide-y divide-slate-100">
          {inventory.map((item) => {
            const isToday = item.expiryDays === 0 || item.statusText?.includes("aujourd'hui");
            const isTomorrow = item.expiryDays === 1 || item.statusText?.includes("demain");

            return (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between group hover:bg-slate-50/50 rounded-xl px-2 transition-colors"
              >
                {/* Left: Icon + Name + Expiry */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shadow-xs">
                    {item.icon || '🥦'}
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-sm text-slate-800 leading-tight">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`text-[11px] font-semibold ${
                          isToday
                            ? 'text-rose-600'
                            : isTomorrow
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {item.statusText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Quantity badge + Delete button */}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-700 min-w-12 text-center">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playDelete();
                      onDeleteItem(item.id);
                    }}
                    className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-500 hover:text-rose-600 flex items-center justify-center transition-all"
                    title="Retirer cet aliment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {inventory.length === 0 && (
          <div className="py-8 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-600">Votre réfrigérateur est vide !</p>
            <p className="text-xs text-slate-400">Cliquez sur Synchroniser pour actualiser l'inventaire détecté par la caméra.</p>
          </div>
        )}
      </div>
    </div>
  );
}
