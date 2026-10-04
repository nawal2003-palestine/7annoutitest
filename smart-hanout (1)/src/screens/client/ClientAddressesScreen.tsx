import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { MapPin, Plus, Trash2, Edit2, CheckCircle2, Home, Building2 } from 'lucide-react';

export const ClientAddressesScreen: React.FC = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      title: 'Domicile (Bourgogne)',
      address: '14 Rue Abou Ishak El Marouni, Immeuble Yasmina, Apt 4',
      repere: 'En face de la mosquée Al Badr - 2ème étage',
      isDefault: true,
      icon: <Home className="w-4 h-4 text-[var(--rust)]" />,
    },
    {
      id: 'addr-2',
      title: 'Bureau (Maarif)',
      address: '72 Boulevard Al Massira Al Khadra, Étage 3, Bureau 12',
      repere: 'Au-dessus du café Venise',
      isDefault: false,
      icon: <Building2 className="w-4 h-4 text-[var(--shutter-blue)]" />,
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newRepere, setNewRepere] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAddress) return;
    setAddresses((prev) => [
      ...prev,
      {
        id: `addr-${Date.now()}`,
        title: newTitle,
        address: newAddress,
        repere: newRepere || 'Sans repère particulier',
        isDefault: false,
        icon: <MapPin className="w-4 h-4 text-[var(--moroccan-green)]" />,
      },
    ]);
    setShowAdd(false);
    setNewTitle('');
    setNewAddress('');
    setNewRepere('');
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Gestion de mes Adresses
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Vos lieux de livraison réguliers avec repères de quartier typiques
          </p>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle adresse</span>
        </button>
      </div>

      <MoroccanStarBorder />

      {/* Add Address Form modal or inline */}
      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="p-5 rounded-2xl bg-white border-2 border-[var(--rust)] shadow-md space-y-3 text-xs animate-in fade-in"
        >
          <h3 className="font-bold text-sm text-[var(--ink)]">Ajouter une nouvelle adresse</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Libellé (ex: Chez Maman, Atelier...)</label>
              <input
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Libellé du lieu"
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Adresse complète & étage</label>
              <input
                required
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Rue, Immeuble, Numéro..."
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          </div>
          <div>
            <label className="font-bold text-[var(--ink)] block mb-1">Repère de quartier pour le livreur</label>
            <input
              value={newRepere}
              onChange={(e) => setNewRepere(e.target.value)}
              placeholder="Ex: Près du hammam, en face de l'école..."
              className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-warm)] hover:bg-[var(--wall)]"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[var(--rust)] text-white font-bold"
            >
              Enregistrer l'adresse
            </button>
          </div>
        </form>
      )}

      {/* Address cards list */}
      <div className="space-y-3">
        {addresses.map((a) => (
          <div
            key={a.id}
            className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--wall-dark)]">{a.icon}</div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[var(--ink)]">{a.title}</h4>
                  {a.isDefault && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] border border-[var(--moroccan-green)]/30">
                      Par défaut
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--ink)]">{a.address}</p>
                <p className="text-[11px] text-[var(--rust)] font-kalam italic">
                  Repère : {a.repere}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[var(--ink-muted)]">
              <button
                onClick={() => removeAddress(a.id)}
                className="p-2 hover:text-[var(--rust)] transition-colors cursor-pointer"
                title="Supprimer cette adresse"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
