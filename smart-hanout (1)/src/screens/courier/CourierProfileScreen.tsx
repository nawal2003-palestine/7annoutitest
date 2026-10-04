import React, { useState } from 'react';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { User, Phone, Bike, ShieldCheck, CheckCircle } from 'lucide-react';

export const CourierProfileScreen: React.FC = () => {
  const [name, setName] = useState('Hamza El Fassi');
  const [phone, setPhone] = useState('06 54 21 88 90');
  const [vehicle, setVehicle] = useState('Moto Peugeot 103 (Immatriculée Casablanca)');
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Profil Livreur
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Informations de coursier et véhicule vérifié par Smart Hanout
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-5">
        <div className="flex items-center gap-4 pb-4 border-b border-[var(--border-warm)]">
          <div className="w-16 h-16 rounded-2xl bg-[var(--rust-light)] text-[var(--rust)] flex items-center justify-center font-bold text-2xl">
            HF
          </div>
          <div>
            <h3 className="font-bold text-base text-[var(--ink)]">{name}</h3>
            <p className="text-xs text-[var(--ink-muted)]">Livreur vérifié (CIN n° BK492019)</p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--amber-gold-light)] text-[var(--amber-gold)] border border-[var(--amber-gold)]/30 mt-1 inline-block">
              ★ 4.9 sur 180 livraisons réussies
            </span>
          </div>
        </div>

        {saved && (
          <div className="p-3 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Profil coursier enregistré !</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
          }}
          className="space-y-4 text-xs"
        >
          <div>
            <label className="font-bold block mb-1">Nom complet</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
            />
          </div>
          <div>
            <label className="font-bold block mb-1">Téléphone de contact</label>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
            />
          </div>
          <div>
            <label className="font-bold block mb-1">Véhicule utilisé</label>
            <input
              required
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[var(--rust)] text-white font-bold cursor-pointer"
          >
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
};

export const CourierSecurityScreen: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Sécurité du Compte Livreur
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Protection du terminal mobile et mot de passe coursier
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-sm text-[var(--ink)]">Changer de mot de passe</h3>
        <input
          type="password"
          defaultValue="••••••••"
          className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
        />
        <button
          onClick={() => alert('Mot de passe mis à jour !')}
          className="px-4 py-2.5 rounded-xl bg-[var(--rust)] text-white font-bold"
        >
          Valider
        </button>
      </div>
    </div>
  );
};
