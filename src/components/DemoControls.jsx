import React, { useState } from 'react';
import { 
  Smartphone, 
  Maximize2, 
  DoorOpen, 
  AlertCircle, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  GraduationCap, 
  QrCode, 
  Copy, 
  Check, 
  ExternalLink,
  X
} from 'lucide-react';
import { sound } from '../utils/audio';

export const PUBLIC_MOBILE_URL = 'https://abraham-functions-say-dod.trycloudflare.com';

export default function DemoControls({
  isMobileFrame,
  onToggleFrame,
  onSimulateDoorOpen,
  onSimulateExpiringItem,
  onResetData,
  isMuted,
  onToggleMute
}) {
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(PUBLIC_MOBILE_URL);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        {/* Left: Brand badge & Mobile Access CTA */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 shadow-sm border border-slate-200 font-bold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>FrigoFuté Démo</span>
          </div>

          {/* QR Code / Phone Access Button */}
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setShowQrModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold shadow-md shadow-emerald-600/20 transition-all"
            title="Afficher le QR Code pour ouvrir l'app sur votre téléphone"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Ouvrir sur mon Téléphone</span>
          </button>
        </div>

        {/* Center / Right: Simulation controls */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playShutter();
              onSimulateDoorOpen();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-semibold shadow-xs transition-all"
            title="Simule l'ouverture de la porte du frigo et le capteur LUX"
          >
            <DoorOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Porte Ouverte</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playPop();
              onSimulateExpiringItem();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-semibold shadow-xs transition-all"
            title="Simule l'arrivée d'un aliment critique à consommer aujourd'hui"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Alerte Périmé</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            type="button"
            onClick={onToggleMute}
            className="p-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 transition-colors"
            title={isMuted ? "Activer le son" : "Couper le son"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Device Frame Toggle */}
          <button
            type="button"
            onClick={onToggleFrame}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium transition-colors"
          >
            {isMobileFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">Plein Écran</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">Cadre Téléphone</span>
              </>
            )}
          </button>

          {/* Polytechnique project */}
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setShowProjectInfo(true);
            }}
            className="p-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            title="Dossier Polytechnique IND8137A"
          >
            <GraduationCap className="w-4 h-4 text-blue-600" />
          </button>

          {/* Reset Demo */}
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              onResetData();
            }}
            className="p-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            title="Réinitialiser"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* QR Code Modal for Phone Access */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-slate-800 space-y-4 text-center">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-heading font-extrabold text-base text-slate-900">
                Scannez avec votre téléphone
              </span>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Ouvrez l'appareil photo de votre smartphone pour tester FrigoFuté en conditions réelles, depuis n'importe où !
            </p>

            {/* QR Code image */}
            <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-emerald-500/40 inline-block shadow-inner">
              <img
                src="/qrcode.png"
                alt="QR Code d'accès mobile FrigoFuté"
                className="w-56 h-56 mx-auto rounded-xl"
              />
            </div>

            {/* Public Link Box */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-left">
              <div className="truncate mr-2">
                <span className="text-[10px] text-slate-400 block font-semibold">LIEN PUBLIC DIRECT :</span>
                <span className="text-xs font-mono font-bold text-emerald-700 select-all truncate block">
                  {PUBLIC_MOBILE_URL}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className={`p-2 rounded-xl transition-all shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
                title="Copier le lien"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="pt-1 flex gap-2">
              <a
                href={PUBLIC_MOBILE_URL}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Ouvrir dans un onglet</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
              >
                Terminé
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Info Modal */}
      {showProjectInfo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 text-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-widest font-bold">
                  Polytechnique Montréal • IND8137A
                </span>
                <h3 className="font-heading font-extrabold text-xl text-slate-900 mt-0.5">
                  Projet Prototype FrigoFuté
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowProjectInfo(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p>
                <strong>Proposition de valeur :</strong> FrigoFuté s'adresse aux parents travaillant à temps plein pour qui la gestion des repas représente une lourde charge mentale, du gaspillage et des coûts évitables.
              </p>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="font-bold text-slate-700 mb-1">Équipe 2 :</p>
                <p className="text-[11px] text-slate-500">
                  Tristan Lachance • Laurel Tremblay • Sebastian Espin • Issam Elazhar • Oswald Jordan Nneme • Mohamed-Issam Yahiaoui
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowProjectInfo(false)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Compris, retour à l'application
            </button>
          </div>
        </div>
      )}
    </>
  );
}
