import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Phone, Lock, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export const ClientLoginScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [identifier, setIdentifier] = useState('06 61 88 23 11');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentScreen('client-home');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6 text-left">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[var(--rust)] text-white flex items-center justify-center font-bold mx-auto shadow-md">
          SH
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">Connexion Client</h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Retrouvez vos hanouts favoris, votre panier et votre carnet de Karna
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">
              Numéro de téléphone marocain (+212) ou Email
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="06 XX XX XX XX ou email"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] focus:outline-hidden focus:border-[var(--rust)]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-[var(--ink)]">Mot de passe</label>
              <button
                type="button"
                onClick={() => setCurrentScreen('client-forgot-password')}
                className="text-[11px] text-[var(--rust)] hover:underline cursor-pointer"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] focus:outline-hidden focus:border-[var(--rust)]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              defaultChecked
              className="accent-[var(--rust)] rounded cursor-pointer"
            />
            <label htmlFor="remember" className="text-[11px] text-[var(--ink-muted)] cursor-pointer">
              Se souvenir de moi sur ce téléphone / appareil
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span>Se connecter à mon quartier</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 rounded-xl bg-[var(--wall-dark)] text-center text-xs text-[var(--ink-muted)] space-y-1">
          <span>Pas encore de compte ?</span>{' '}
          <button
            onClick={() => setCurrentScreen('client-register')}
            className="font-bold text-[var(--rust)] hover:underline cursor-pointer"
          >
            Créer un compte en 30 secondes
          </button>
        </div>
      </div>

      <div className="text-center text-[11px] text-[var(--ink-muted)] flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[var(--moroccan-green)]" />
        <span>Données protégées sous le contrôle de la CNDP Maroc</span>
      </div>
    </div>
  );
};
