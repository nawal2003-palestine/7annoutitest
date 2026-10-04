import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Bike, Phone, Lock, ArrowRight, Building, User } from 'lucide-react';

export const CourierAuthScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('06 54 21 88 90');
  const [courierType, setCourierType] = useState('moto');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentScreen('courier-available');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6 text-left">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-[var(--rust)] text-white flex items-center justify-center font-bold mx-auto shadow-md">
          <Bike className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">
          {isRegister ? 'Inscription Livreur / Concierge' : 'Espace Livreur de Quartier'}
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Livrez vos voisins et gagnez des revenus en dirhams chaque semaine
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Type de coursier / profile
              </label>
              <select
                value={courierType}
                onChange={(e) => setCourierType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-bold text-[var(--ink)]"
              >
                <option value="moto">Livreur Moto / Scooter (Indépendant)</option>
                <option value="velo">Coursier Vélo urbain</option>
                <option value="concierge">Concierge / Gardien d'immeuble</option>
                <option value="employe">Employé rattaché à un hanout</option>
              </select>
            </div>
          )}

          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">
              Numéro de téléphone (+212)
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
              <label className="font-bold text-[var(--ink)]">Mot de passe</label>
              {!isRegister && (
                <button
                  type="button"
                  onClick={() => setCurrentScreen('courier-forgot')}
                  className="text-[11px] text-[var(--rust)] hover:underline cursor-pointer"
                >
                  Oublié ?
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
            className="w-full py-3 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>{isRegister ? 'Créer mon compte coursier' : 'Accéder aux missions disponibles'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 rounded-xl bg-[var(--wall-dark)] text-center text-xs text-[var(--ink-muted)]">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="font-bold text-[var(--rust)] hover:underline cursor-pointer"
          >
            {isRegister ? 'Déjà coursier ? Se connecter' : 'Nouveau ? S\'inscrire comme livreur'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const CourierForgotScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [phone, setPhone] = useState('06 54 21 88 90');
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6 text-left">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">Récupération Livreur</h1>
        <p className="text-xs text-[var(--ink-muted)]">Code de validation par SMS</p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
        {sent ? (
          <div className="text-center space-y-3">
            <h3 className="font-bold text-sm text-[var(--moroccan-green)]">Code SMS envoyé à {phone}</h3>
            <p className="text-xs text-[var(--ink-muted)]">Entrez les 4 chiffres reçus :</p>
            <div className="flex justify-center gap-2">
              {['3', '8', '1', '2'].map((d, i) => (
                <input
                  key={i}
                  defaultValue={d}
                  className="w-10 h-12 text-center text-lg font-bold border border-[var(--border-warm)] rounded-xl bg-[var(--wall)] font-mono"
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentScreen('courier-available')}
              className="w-full py-2.5 rounded-xl bg-[var(--moroccan-green)] text-white text-xs font-bold"
            >
              Réinitialiser et aller aux missions
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-bold block mb-1">Téléphone portable</label>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[var(--rust)] text-white font-bold"
            >
              Envoyer le SMS
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
