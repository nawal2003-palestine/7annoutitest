import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { ShieldCheck, Smartphone, Laptop, Lock, LogOut, CheckCircle } from 'lucide-react';

export const ClientSecurityScreen: React.FC = () => {
  const [sessions, setSessions] = useState([
    {
      id: 'sess-1',
      device: 'iPhone 14 Pro — Safari Mobile',
      location: 'Casablanca, Maroc (Adresse IP 196.115.xx.xx)',
      current: true,
      lastActive: 'Actif maintenant',
    },
    {
      id: 'sess-2',
      device: 'MacBook Air — Google Chrome',
      location: 'Casablanca, Bourgogne',
      current: false,
      lastActive: 'Hier à 21:40',
    },
  ]);
  const [passUpdated, setPassUpdated] = useState(false);

  const disconnectSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Sécurité du Compte
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Contrôlez vos sessions actives et la protection de vos données personnelles
        </p>
      </div>

      <MoroccanStarBorder />

      {/* Password change */}
      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
          <Lock className="w-4 h-4 text-[var(--rust)]" />
          <span>Modifier mon mot de passe</span>
        </h3>

        {passUpdated && (
          <div className="p-3 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Votre mot de passe a été mis à jour avec succès !</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPassUpdated(true);
            setTimeout(() => setPassUpdated(false), 3000);
          }}
          className="space-y-3 text-xs"
        >
          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">Mot de passe actuel</label>
            <input
              type="password"
              required
              defaultValue="••••••••"
              className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
            />
          </div>
          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">Nouveau mot de passe</label>
            <input
              type="password"
              required
              placeholder="Minimum 8 caractères"
              className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold transition-colors cursor-pointer shadow-xs"
          >
            Mettre à jour le mot de passe
          </button>
        </form>
      </div>

      {/* Active Sessions */}
      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[var(--moroccan-green)]" />
          <span>Sessions connectées ({sessions.length})</span>
        </h3>

        <div className="space-y-3">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="p-3.5 rounded-xl bg-[var(--wall)] border border-[var(--border-warm)] flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-[var(--ink-muted)]" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--ink)]">{s.device}</span>
                    {s.current && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)]">
                        Cet appareil
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[var(--ink-muted)]">{s.location}</p>
                  <p className="text-[10px] text-stone-400">{s.lastActive}</p>
                </div>
              </div>

              {!s.current && (
                <button
                  onClick={() => disconnectSession(s.id)}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Déconnecter</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
