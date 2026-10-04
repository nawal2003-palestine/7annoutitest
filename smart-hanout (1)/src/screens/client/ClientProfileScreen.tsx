import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { User, Phone, Mail, MapPin, Save, CheckCircle, Shield } from 'lucide-react';

export const ClientProfileScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [name, setName] = useState('Karim Bennani');
  const [phone, setPhone] = useState('06 61 88 23 11');
  const [email, setEmail] = useState('karim.bennani@gmail.com');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Mon Profil Voisin
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Gérez vos informations de contact et vos préférences de quartier
          </p>
        </div>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-[var(--border-warm)]">
          <div className="w-16 h-16 rounded-2xl bg-[var(--rust-light)] text-[var(--rust)] font-bold text-2xl flex items-center justify-center">
            KB
          </div>
          <div>
            <h3 className="font-bold text-base text-[var(--ink)]">{name}</h3>
            <p className="text-xs text-[var(--ink-muted)]">Client vérifié • Casablanca Bourgogne</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] text-[11px] font-bold border border-[var(--moroccan-green)]/30">
              Karna Activé chez Ba Driss
            </span>
          </div>
        </div>

        {saved && (
          <div className="p-3 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Modifications enregistrées avec succès !</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">Nom et Prénom</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">
              Numéro de téléphone marocain (+212)
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
            <label className="font-bold text-[var(--ink)] block mb-1">Adresse email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentScreen('client-security')}
              className="text-xs text-[var(--rust)] hover:underline font-semibold cursor-pointer"
            >
              Modifier mon mot de passe
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Enregistrer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
