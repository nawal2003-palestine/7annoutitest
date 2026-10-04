import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Store, Clock, Phone, MapPin, Save, CheckCircle } from 'lucide-react';

export const MerchantStoreProfileScreen: React.FC = () => {
  const { selectedStore } = useApp();
  const [name, setName] = useState(selectedStore.name);
  const [phone, setPhone] = useState(selectedStore.phone);
  const [address, setAddress] = useState(selectedStore.address);
  const [hours, setHours] = useState(selectedStore.openingHours);
  const [bannerNote, setBannerNote] = useState(selectedStore.bannerNote);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Profil de la Boutique & Enseigne
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Informations visibles par les clients du quartier sur leur application
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-5">
        {saved && (
          <div className="p-3 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] text-xs font-bold flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>Profil de l'épicerie mis à jour !</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">Enseigne du Hanout</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] font-bold text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Téléphone direct de la boutique</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
              />
            </div>
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Quartier & Ville</label>
              <input
                type="text"
                defaultValue={`${selectedStore.neighborhood}, ${selectedStore.city}`}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">Adresse complète</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
            />
          </div>

          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">
              Horaires d'ouverture & Créneaux de prière
            </label>
            <input
              type="text"
              required
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Ex: 07:00 - 23:30 (Pause Jumuah 12:30 - 14:30)"
              className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
            />
            <span className="text-[11px] text-[var(--ink-muted)] mt-0.5 block">
              Précisez les pauses de l'après-midi ou la prière du vendredi.
            </span>
          </div>

          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">
              Mot d'accueil / Arrivage du jour (affiché en haut de vitrine)
            </label>
            <textarea
              rows={2}
              value={bannerNote}
              onChange={(e) => setBannerNote(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-kalam text-sm text-[var(--rust)]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer les informations de la boutique</span>
          </button>
        </form>
      </div>
    </div>
  );
};
