import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Users, UserPlus, Shield, Trash2, CheckCircle2 } from 'lucide-react';

export const MerchantTeamScreen: React.FC = () => {
  const [members, setMembers] = useState([
    {
      id: 'm-1',
      name: 'Driss El Amrani',
      phone: '+212 6 61 24 89 12',
      role: 'Propriétaire (Owner)',
      access: 'Accès Total + Clôture Karna',
      isOwner: true,
    },
    {
      id: 'm-2',
      name: 'Rachid El Amrani (Fils)',
      phone: '+212 6 63 11 22 33',
      role: 'Gérant de boutique',
      access: 'Commandes, Stocks & Karna',
      isOwner: false,
    },
    {
      id: 'm-3',
      name: 'Youssef (Commis / Caisse)',
      phone: '+212 6 50 44 88 99',
      role: 'Caissier & Préparation',
      access: 'Préparation des sacs uniquement',
      isOwner: false,
    },
  ]);

  const [showInvite, setShowInvite] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState('Caissier & Préparation');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    setMembers([
      ...members,
      {
        id: `m-${Date.now()}`,
        name: newName,
        phone: newPhone || '+212 6 00 00 00 00',
        role: newRole,
        access: 'Accès Opérationnel',
        isOwner: false,
      },
    ]);
    setShowInvite(false);
    setNewName('');
    setNewPhone('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Équipe du Hanout & Accès
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Gérez les personnes autorisées à préparer les sacs et à encaisser
          </p>
        </div>

        <button
          onClick={() => setShowInvite(!showInvite)}
          className="px-4 py-2 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>Ajouter un équipier</span>
        </button>
      </div>

      <MoroccanStarBorder />

      {showInvite && (
        <form
          onSubmit={handleAdd}
          className="p-5 rounded-2xl bg-white border-2 border-[var(--rust)] shadow-md space-y-3 text-xs animate-in fade-in"
        >
          <h3 className="font-bold text-sm text-[var(--ink)]">Ajouter un collaborateur</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold block mb-1">Nom complet</label>
              <input
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex: Hicham (Aide-épicier)"
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Téléphone portable</label>
              <input
                required
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="06 XX XX XX XX"
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Rôle & Permissions</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
              >
                <option>Gérant de boutique</option>
                <option>Caissier & Préparation</option>
                <option>Livreur interne</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowInvite(false)}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-warm)]"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[var(--rust)] text-white font-bold"
            >
              Créer l'accès
            </button>
          </div>
        </form>
      )}

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
        {members.map((mem) => (
          <div
            key={mem.id}
            className="p-4 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] flex items-center justify-between gap-4 text-xs"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[var(--ink)]">{mem.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--rust-light)] text-[var(--rust)]">
                  {mem.role}
                </span>
              </div>
              <div className="text-[11px] text-[var(--ink-muted)] mt-0.5">
                {mem.phone} • Permissions : {mem.access}
              </div>
            </div>

            {!mem.isOwner && (
              <button
                onClick={() => setMembers(members.filter((m) => m.id !== mem.id))}
                className="p-1.5 text-[var(--ink-muted)] hover:text-rose-600 cursor-pointer"
                title="Supprimer l'accès"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
