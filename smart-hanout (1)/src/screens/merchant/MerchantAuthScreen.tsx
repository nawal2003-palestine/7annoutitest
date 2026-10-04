import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Store, Lock, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const MerchantAuthScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('06 61 24 89 12');
  const [storeName, setStoreName] = useState('Hanout Ba Driss & Fils');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentScreen('merchant-dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6 text-left">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-[var(--rust)] text-white flex items-center justify-center font-bold mx-auto shadow-lg">
          <Store className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">
          {isRegister ? 'Inscrire mon Hanout' : 'Espace Moul Lhanout'}
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Portail de gestion simplifié pour commerçants de proximité
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Nom de votre épicerie / Hanout</label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Ex: Hanout Ba Driss & Fils"
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          )}

          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">
              Numéro de téléphone du commerçant (+212)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-[var(--ink)]">Mot de passe ou Code PIN</label>
              {!isRegister && (
                <button
                  type="button"
                  onClick={() => setCurrentScreen('merchant-forgot')}
                  className="text-[11px] text-[var(--rust)] hover:underline cursor-pointer"
                >
                  Code oublié ?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
              <input
                type="password"
                required
                defaultValue="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span>{isRegister ? 'Créer mon commerce' : 'Accéder à mon tableau de bord'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 rounded-xl bg-[var(--wall-dark)] text-center text-xs text-[var(--ink-muted)]">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="font-bold text-[var(--rust)] hover:underline cursor-pointer"
          >
            {isRegister
              ? 'Déjà inscrit ? Se connecter à mon hanout'
              : 'Nouveau hanoutier ? Ouvrir mon compte commerçant'}
          </button>
        </div>
      </div>
    </div>
  );
};
