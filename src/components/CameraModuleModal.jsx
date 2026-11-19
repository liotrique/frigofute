import React, { useEffect, useRef } from 'react';
import { X, Cpu, ShieldCheck, BatteryCharging, Eye, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function CameraModuleModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);

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

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      closedby="any"
      aria-labelledby="camera-specs-title"
      className="m-auto rounded-3xl max-w-md w-[92%] p-0 bg-white shadow-2xl border border-slate-100 overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 relative">
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-1">
          <Cpu className="w-3.5 h-3.5" />
          <span>Polytechnique Montréal • Prototype P3</span>
        </div>
        <h2 id="camera-specs-title" className="font-heading font-extrabold text-lg text-white">
          Module Caméra Amovible FrigoFuté
        </h2>
        <p className="text-xs text-slate-300 mt-0.5">
          Conception 3D, capteurs embarqués &amp; vision par ordinateur
        </p>
      </div>

      {/* Body with Interactive Blueprint */}
      <div className="p-5 max-h-[65vh] overflow-y-auto space-y-4 text-xs">
        {/* SVG Drawing of the Camera Module (based on Figures 7-11 of report) */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-300 shadow-inner">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] font-mono text-emerald-400">
            <span>PLAN TECHNIQUE FRIGOFUTÉ-P3-CAM</span>
            <span>ÉCHELLE 1:2</span>
          </div>

          <svg viewBox="0 0 400 220" className="w-full h-auto stroke-slate-300 fill-none">
            {/* Boîtier principal (200x100) */}
            <rect x="50" y="40" width="300" height="130" rx="18" stroke="#38bdf8" strokeWidth="2" fill="#0f172a" />
            
            {/* Objectif grand-angle 120° (Ø30) */}
            <circle cx="105" cy="115" r="28" stroke="#38bdf8" strokeWidth="2" fill="#1e293b" />
            <circle cx="105" cy="115" r="16" stroke="#4ade80" strokeWidth="1.5" />
            <circle cx="105" cy="115" r="6" fill="#4ade80" />
            
            {/* Capteur de lumière LUX (rep 1) */}
            <circle cx="105" cy="65" r="7" stroke="#fbbf24" strokeWidth="1.5" fill="#78350f" />
            <text x="65" y="50" fill="#fbbf24" fontSize="8" fontFamily="monospace">Capteur LUX</text>

            {/* Barre DEL d'éclairage (rep 3) */}
            <rect x="160" y="75" width="160" height="10" rx="5" stroke="#e2e8f0" strokeWidth="1.5" fill="#334155" />
            <text x="175" y="68" fill="#94a3b8" fontSize="8" fontFamily="monospace">Barre DEL + Diffuseur</text>

            {/* Logement batterie USB (rep 5) */}
            <rect x="160" y="98" width="165" height="55" rx="8" stroke="#94a3b8" strokeDasharray="4 3" strokeWidth="1.2" fill="#1e293b" />
            <text x="180" y="130" fill="#94a3b8" fontSize="10" fontFamily="monospace">Batterie USB (150x72x20)</text>

            {/* Ventouses arrière (rep 8) */}
            <path d="M 120 40 L 110 20 L 130 20 Z" fill="#64748b" stroke="#cbd5e1" />
            <path d="M 280 40 L 270 20 L 290 20 Z" fill="#64748b" stroke="#cbd5e1" />
            <text x="140" y="25" fill="#64748b" fontSize="8" fontFamily="monospace">2x Ventouses fixation</text>

            {/* Trappe latérale (rep 6) */}
            <line x1="350" y1="90" x2="350" y2="150" stroke="#f43f5e" strokeWidth="3" />
            <text x="260" y="175" fill="#f43f5e" fontSize="8" fontFamily="monospace">Trappe batterie</text>

            {/* Cône de vue 120° */}
            <path d="M 105 115 L 20 185 M 105 115 L 60 215" stroke="#4ade80" strokeDasharray="3 3" opacity="0.6" />
            <text x="10" y="210" fill="#4ade80" fontSize="8" fontFamily="monospace">Angle 120°</text>
          </svg>
        </div>

        {/* Technical Characteristics from Report */}
        <div className="space-y-2.5">
          <h3 className="font-heading font-bold text-slate-800 text-xs uppercase tracking-wider">
            Caractéristiques Clés du Prototype P3
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-700 block">Objectif Grand-Angle</span>
              <span className="text-slate-500 text-[11px]">Couverture 120° pour capturer tous les étages d'un réfrigérateur standard.</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-700 block">Détection Porte Ouverte</span>
              <span className="text-slate-500 text-[11px]">Capteur de lumière ambiante pour déclencher la capture automatique sans fil.</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-700 block">Fixation Universelle</span>
              <span className="text-slate-500 text-[11px]">Double ventouse amovible : compatible avec 100% des réfrigérateurs du marché.</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-700 block">Vie Privée &amp; Local</span>
              <span className="text-slate-500 text-[11px]">Traitement des photos en périphérie (Edge AI) pour garantir la confidentialité.</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800">
          <p className="font-bold text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Modèle Économique Validé</span>
          </p>
          <p className="text-[11px] mt-0.5 text-emerald-700 leading-relaxed">
            Module matériel vendu une seule fois + fonctionnalités gratuites essentielles (inventaire automatique &amp; alertes). Recettes avancées par abonnement.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-right">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
        >
          Fermer
        </button>
      </div>
    </dialog>
  );
}
