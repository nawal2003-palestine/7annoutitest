import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { User, Phone, Mail, Lock, MapPin, ArrowRight } from 'lucide-react';

export const ClientRegisterScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [name, setName] = useState('Karim Bennani');
  const [phone, setPhone] = useState('06 61 88 23 11');
  const [city, setCity] = useState('Casablanca');
  const [neighborhood, setNeighborhood] = useState('Bourgogne');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentScreen('client-home');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6 text-left">
      <div className="text-center space-y-2">
        <span className="font-kalam text-lg text-[var(--rust)] font-bold">Marhaba bik !</span>
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">Créer mon Compte Voisin</h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Commandez chez les hanouts de votre quartier en toute simplicité
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">Nom complet</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre prénom et nom"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">Numéro de téléphone marocain (+212)</label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="06 XX XX XX XX"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Ville</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              >
                <option>Casablanca</option>
                <option>Rabat</option>
                <option>Marrakech</option>
                <option>Tanger</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Quartier</label>
              <input
                type="text"
                required
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Ex: Bourgogne"
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">Mot de passe</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
              <input
                type="password"
                required
                defaultValue="secret123"
                placeholder="Au moins 6 caractères"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          </div>

          <p className="text-[11px] text-[var(--ink-muted)]">
            En créant votre compte, vous acceptez les conditions de service et la politique de confidentialité locale.
          </p>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span>Finaliser mon inscription</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 rounded-xl bg-[var(--wall-dark)] text-center text-xs text-[var(--ink-muted)]">
          <span>Déjà inscrit ?</span>{' '}
          <button
            onClick={() => setCurrentScreen('client-login')}
            className="font-bold text-[var(--rust)] hover:underline cursor-pointer"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};
