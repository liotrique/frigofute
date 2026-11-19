import React, { useState } from 'react';
import { Bell, Check, X, ShieldAlert, Camera, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Header({ notifications, onMarkAllRead, onDismissNotif }) {
  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="relative px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 bg-white/95 backdrop-blur-sm z-20">
      {/* Brand Logo matching mockup */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-emerald-600/30">
          F
        </div>
        <div className="flex flex-col">
          <span className="font-heading font-extrabold text-2xl tracking-tight text-emerald-700 leading-none">
            Frigofuté
          </span>
          <span className="text-[10px] text-slate-400 font-medium tracking-wide">
            Anti-gaspillage intelligent
          </span>
        </div>
      </div>

      {/* Bell Notification Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setShowNotifs(!showNotifs);
          }}
          className="relative p-2.5 rounded-full hover:bg-slate-100 active:scale-95 transition-all text-slate-700 focus:outline-none"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute 1 top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notifications Dropdown / Popover */}
        {showNotifs && (
          <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-slate-800">Notifications</span>
                {unreadCount > 0 && (
                  <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={onMarkAllRead}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  Tout marquer lu
                </button>
              )}
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">Aucune notification pour le moment.</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 ${
                      n.unread ? 'bg-emerald-50/70 border border-emerald-100' : 'bg-slate-50 border border-slate-100'
                    }`}
                  >
                    <div className="mt-0.5">
                      {n.type === 'alert' && <ShieldAlert className="w-4 h-4 text-rose-500" />}
                      {n.type === 'camera' && <Camera className="w-4 h-4 text-emerald-600" />}
                      {n.type === 'eco' && <Sparkles className="w-4 h-4 text-amber-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 flex items-center justify-between">
                        <span>{n.title}</span>
                        <span className="text-[10px] font-normal text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{n.body}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDismissNotif(n.id)}
                      className="text-slate-400 hover:text-slate-600 p-0.5"
                      title="Effacer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => setShowNotifs(false)}
                className="text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
