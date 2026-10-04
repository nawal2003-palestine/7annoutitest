import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { AdminTopControlBar } from './AdminCoreScreens';
import { ClientSuspensionReason } from '../../types';
import {
  User,
  ArrowLeft,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  Ban,
  RotateCcw,
  Download,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Smartphone,
  Star,
  LifeBuoy,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AdminClientDetailScreen: React.FC = () => {
  const {
    adminClients,
    selectedAdminClientId,
    setSelectedAdminClientId,
    setCurrentScreen,
    orders,
    reviews,
    suspendClientAdmin,
    reactivateClientAdmin,
    exportClientDataAdmin,
    logAdminAudit,
  } = useApp();

  const client = adminClients.find((c) => c.id === selectedAdminClientId) || adminClients[0];

  // Active Tab: 'profil' | 'commandes' | 'karna' | 'risque'
  const [activeTab, setActiveTab] = useState<'profil' | 'commandes' | 'karna' | 'risque'>('profil');

  // Suspension modal
  const [isSuspending, setIsSuspending] = useState(false);
  const [suspensionReason, setSuspensionReason] =
    useState<ClientSuspensionReason>('Taux d\'annulation anormalement élevé');
  const [duration, setDuration] = useState<'temporary_7d' | 'definitive'>('temporary_7d');
  const [suspensionNotes, setSuspensionNotes] = useState('');

  // Delete confirmation modal
  const [isDeleting, setIsDeleting] = useState(false);

  // Client Orders (all stores combined)
  const clientOrders = orders.filter(
    (o) =>
      o.customerName.toLowerCase() === client.name.toLowerCase() ||
      o.customerPhone === client.phone
  );

  // Client Reviews
  const clientReviews = reviews.filter((r) =>
    r.customerName.toLowerCase().includes(client.name.toLowerCase().split(' ')[0])
  );

  const handleConfirmSuspension = (e: React.FormEvent) => {
    e.preventDefault();
    suspendClientAdmin(client.id, suspensionReason, duration, suspensionNotes);
    setIsSuspending(false);
    setSuspensionNotes('');
  };

  const handleConfirmDeletion = () => {
    logAdminAudit('Suppression Données Personnelles CNDP', 'client', client.name, 'Droit à l\'oubli loi 09-08');
    setIsDeleting(false);
    setCurrentScreen('admin-users');
  };

  const hasHighRisk =
    client.cancellationRatePct > 15 ||
    client.multiAccountsDetected.length > 0 ||
    client.karnaExposure.hasRepeatedDefaults;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      <AdminTopControlBar />

      {/* Header & Back Button */}
      <div className="space-y-3">
        <button
          onClick={() => setCurrentScreen('admin-users')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--rust)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la gestion des clients</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] flex items-center justify-center font-extrabold text-xl text-[var(--rust)] shadow-xs">
              👤
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--ink)]">
                  {client.name}
                </h1>
                {client.status === 'active' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Actif
                  </span>
                )}
                {client.status === 'suspended_temp' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    Suspendu 7j (Fin automatique)
                  </span>
                )}
                {client.status === 'suspended_perm' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                    Banni permanent
                  </span>
                )}
                {hasHighRisk && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    ⚠️ Signaux de Risque Détectés
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--ink-muted)] mt-1 flex flex-wrap items-center gap-2">
                <span>Tél : <strong className="font-mono text-[var(--ink)]">{client.phone}</strong></span>
                <span>•</span>
                <span>Email : <strong className="text-[var(--ink)]">{client.email}</strong></span>
                <span>•</span>
                <span>{client.neighborhood}, {client.city}</span>
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => exportClientDataAdmin(client.id)}
              className="px-3 py-2 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] hover:bg-white text-[var(--ink)] text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Exporter Archive CNDP</span>
            </button>

            {client.status === 'active' ? (
              <button
                onClick={() => setIsSuspending(true)}
                className="px-4 py-2 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Suspendre le client</span>
              </button>
            ) : (
              <button
                onClick={() => reactivateClientAdmin(client.id)}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réactiver le compte</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border-warm)] pb-1 overflow-x-auto text-xs font-bold">
        {[
          { id: 'profil', label: '1. Profil & Adresses', icon: User },
          { id: 'commandes', label: `2. Commandes (${client.totalOrders})`, icon: ShoppingBag },
          { id: 'karna', label: `3. Karna Multi-Hanouts (${client.karnaExposure.totalMultiHanoutDebtDh.toFixed(0)} DH)`, icon: DollarSign },
          { id: 'risque', label: `4. Activité & Risque ${hasHighRisk ? '⚠️' : ''}`, icon: AlertTriangle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[var(--rust)] text-white shadow-xs'
                  : 'bg-white text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--wall-dark)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROFIL & ADRESSES */}
      {activeTab === 'profil' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Info */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
              <User className="w-4 h-4 text-[var(--rust)]" />
              <span>Informations Personnelles</span>
            </h3>

            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-[var(--ink-muted)] block">Nom & Prénom :</span>
                  <span className="font-bold text-[var(--ink)] text-sm">{client.name}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[var(--ink-muted)] block">Date d'inscription :</span>
                  <span className="font-bold text-[var(--ink)]">{client.registeredAt}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--border-warm)]">
                <div>
                  <span className="text-[11px] text-[var(--ink-muted)] block">Téléphone vérifié :</span>
                  <span className="font-mono font-bold text-[var(--ink)]">{client.phone}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[var(--ink-muted)] block">Email :</span>
                  <span className="font-bold text-[var(--ink)]">{client.email}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-warm)]">
                <span className="text-[11px] text-[var(--ink-muted)] block">Statut du compte :</span>
                <span className="font-bold text-[var(--ink)]">
                  {client.status === 'active'
                    ? 'Compte actif et vérifié'
                    : client.status === 'suspended_temp'
                    ? `Suspendu temporairement (${client.tempSuspensionEndsAt})`
                    : 'Bannissement permanent'}
                </span>
                {client.suspensionReason && (
                  <p className="text-[11px] text-rose-700 mt-1">
                    Motif : {client.suspensionReason}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Registered Addresses */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--rust)]" />
              <span>Adresses Enregistrées</span>
            </h3>

            <div className="space-y-2">
              {(client.registeredAddresses || [
                { id: 'a1', label: 'Domicile principal', address: client.address, city: client.city, isDefault: true },
              ]).map((addr) => (
                <div
                  key={addr.id}
                  className="p-3 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] flex items-start justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[var(--ink)]">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="px-1.5 py-0.5 rounded bg-white text-[9px] font-bold text-[var(--rust)] border border-[var(--border-warm)]">
                          Par défaut
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--ink)]">{addr.address}</p>
                    <span className="text-[10px] text-[var(--ink-muted)]">{addr.city}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CNDP Compliance Note */}
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Conformité CNDP (Loi 09-08) : Les coordonnées sont protégées et uniquement partagées avec le hanout et le livreur lors d'une commande active.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMMANDES */}
      {activeTab === 'commandes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs">
              <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
                Total Dépensé (Cumul)
              </span>
              <span className="text-xl font-extrabold font-mono text-[var(--rust)]">
                {client.totalSpentDh.toFixed(2)} DH
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs">
              <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
                Nombre de Commandes
              </span>
              <span className="text-xl font-extrabold font-mono text-[var(--ink)]">
                {client.totalOrders}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs">
              <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
                Taux d'Annulation
              </span>
              <span
                className={`text-xl font-extrabold font-mono ${
                  client.cancellationRatePct > 15 ? 'text-rose-700' : 'text-emerald-700'
                }`}
              >
                {client.cancellationRatePct}%
              </span>
            </div>
          </div>

          {/* Orders Table */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
            <h3 className="font-bold text-sm text-[var(--ink)] mb-3">
              Historique des Commandes (Tous commerces confondus)
            </h3>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--border-warm)] text-[var(--ink-muted)] pb-2 font-mono">
                    <th className="py-2.5">N° Commande</th>
                    <th className="py-2.5">Commerce</th>
                    <th className="py-2.5">Date</th>
                    <th className="py-2.5">Montant</th>
                    <th className="py-2.5">Paiement</th>
                    <th className="py-2.5">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-warm)]">
                  {clientOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[var(--wall)]">
                      <td className="py-2.5 font-mono font-bold text-[var(--rust)]">
                        {ord.orderNumber}
                      </td>
                      <td className="py-2.5 font-bold text-[var(--ink)]">{ord.storeName}</td>
                      <td className="py-2.5 text-[var(--ink-muted)]">{ord.createdAt}</td>
                      <td className="py-2.5 font-mono font-bold">{ord.totalDh.toFixed(2)} DH</td>
                      <td className="py-2.5">
                        {ord.paymentMethod === 'karna' ? (
                          <span className="text-[var(--rust)] font-bold">📖 Karna</span>
                        ) : (
                          '💵 Espèces'
                        )}
                      </td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--wall)] text-[var(--ink)]">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {clientOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-xs text-[var(--ink-muted)]">
                        Aucune commande enregistrée pour ce client sur la plateforme.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KARNA (VUE TRANSVERSALE MULTI-HANOUTS) */}
      {activeTab === 'karna' && (
        <div className="space-y-4 text-xs">
          {/* Overview Banner */}
          <div className="p-6 rounded-3xl bg-[var(--karna-paper)] border-2 border-[var(--border-warm)] shadow-sm space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-[var(--rust)] uppercase tracking-wider block">
                  Vue Transversale Multi-Hanouts du Karna
                </span>
                <div className="text-3xl font-extrabold font-mono text-[var(--rust)] mt-1">
                  {client.karnaExposure.totalMultiHanoutDebtDh.toFixed(2)} DH
                </div>
                <p className="text-[11px] text-[var(--ink-muted)] mt-0.5">
                  Dette cumulée active sur l'ensemble des {client.karnaExposure.accounts.length} épiceries où ce client a un carnet ouvert
                </p>
              </div>

              {client.karnaExposure.hasRepeatedDefaults && (
                <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-900 text-left">
                  <span className="font-bold flex items-center gap-1.5 text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-700" />
                    <span>Alerte Défauts de Paiement Répétés</span>
                  </span>
                  <p className="text-[11px] mt-0.5">
                    Plusieurs retards de règlement ont été signalés par les épiciers du quartier.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Breakdown per store */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-[var(--ink)]">
              Détail des soldes chez chaque commerçant partenaire
            </h3>

            <div className="space-y-2">
              {client.karnaExposure.accounts.map((acc, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[var(--ink)] text-sm">{acc.storeName}</span>
                    <span className="text-[11px] text-[var(--ink-muted)] block font-mono">
                      Plafond de crédit accordé : {acc.limitDh} DH
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-extrabold text-sm text-[var(--rust)] block">
                      {acc.debtDh.toFixed(2)} DH
                    </span>
                    {acc.defaultPaymentsCount > 0 ? (
                      <span className="text-[10px] text-rose-700 font-bold">
                        ⚠️ {acc.defaultPaymentsCount} impayé(s) signalé(s)
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-700 font-semibold">
                        ✓ Compte régulier
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ACTIVITÉ & RISQUE */}
      {activeTab === 'risque' && (
        <div className="space-y-4 text-xs">
          {/* Risk Signals Card */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Signaux d'Alerte & Surveillance de la Fraude</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Multi-Accounts detection */}
              <div
                className={`p-3.5 rounded-2xl border space-y-1.5 ${
                  client.multiAccountsDetected.length > 0
                    ? 'bg-rose-50 border-rose-300 text-rose-900'
                    : 'bg-[var(--wall)] border-[var(--border-warm)] text-[var(--ink)]'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  <Smartphone className="w-4 h-4" />
                  <span>Détection Multi-Comptes / Même Appareil</span>
                </div>
                {client.multiAccountsDetected.length > 0 ? (
                  <ul className="list-disc list-inside text-[11px] space-y-1">
                    {client.multiAccountsDetected.map((acc, i) => (
                      <li key={i}>{acc}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[11px] text-emerald-700 font-semibold">
                    ✓ Aucun compte dupliqué détecté sur cet appareil
                  </p>
                )}
              </div>

              {/* Cancellation rate */}
              <div
                className={`p-3.5 rounded-2xl border space-y-1.5 ${
                  client.cancellationRatePct > 15
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-[var(--wall)] border-[var(--border-warm)] text-[var(--ink)]'
                }`}
              >
                <span className="font-bold block">Taux d'Annulation de Commandes</span>
                <div className="text-xl font-mono font-extrabold">
                  {client.cancellationRatePct}%
                </div>
                <p className="text-[11px]">
                  {client.cancellationRatePct > 15
                    ? '⚠️ Taux supérieur au seuil toléré de 15%. Risque de fausses commandes.'
                    : '✓ Taux conforme au standard de la plateforme (< 15%).'}
                </p>
              </div>
            </div>
          </div>

          {/* Client Reviews */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
              <Star className="w-4 h-4 text-[var(--amber-gold)]" />
              <span>Avis Laissés par ce Client ({clientReviews.length})</span>
            </h3>

            <div className="space-y-2">
              {clientReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-1"
                >
                  <div className="flex justify-between font-bold text-[11px]">
                    <span className="text-[var(--rust)] font-mono">{rev.storeId}</span>
                    <span className="text-[var(--ink-muted)]">{rev.date}</span>
                  </div>
                  <p className="text-[var(--ink)]">"{rev.comment}"</p>
                </div>
              ))}
              {clientReviews.length === 0 && (
                <div className="text-[var(--ink-muted)] italic text-center py-2">
                  Ce client n'a pas encore rédigé d'avis.
                </div>
              )}
            </div>
          </div>

          {/* Data privacy compliance deletion request */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-[var(--ink)] block text-sm">
                Conformité CNDP & Droit à l'Oubli
              </span>
              <p className="text-[11px] text-[var(--ink-muted)]">
                Supprimer ou anonymiser définitivement le compte sur demande écrite du client (Loi 09-08).
              </p>
            </div>
            <button
              onClick={() => setIsDeleting(true)}
              className="px-4 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Supprimer le compte (CNDP)</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL: SUSPENDRE CLIENT */}
      {isSuspending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in text-xs text-left">
          <form
            onSubmit={handleConfirmSuspension}
            className="w-full max-w-lg bg-white rounded-3xl border-2 border-rose-500 shadow-2xl p-6 space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-base font-bold text-rose-800">
                Suspendre le compte client de {client.name}
              </h3>
              <p className="text-[var(--ink-muted)]">
                Le client ne pourra plus passer de commande. Une notification motivée lui sera transmise.
              </p>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Motif réglementaire obligatoire :
              </label>
              <select
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value as ClientSuspensionReason)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-bold text-[var(--ink)]"
              >
                <option value="Taux d'annulation anormalement élevé">Taux d'annulation anormalement élevé</option>
                <option value="Plusieurs comptes liés au même téléphone / appareil">Plusieurs comptes liés au même appareil</option>
                <option value="Défauts de paiement Karna répétés">Défauts de paiement Karna répétés</option>
                <option value="Fraude ou réclamation abusive">Fraude ou réclamation abusive</option>
                <option value="Comportement inapproprié envers les livreurs">Comportement inapproprié envers les livreurs</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Durée de la sanction :</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    checked={duration === 'temporary_7d'}
                    onChange={() => setDuration('temporary_7d')}
                    className="accent-[var(--rust)]"
                  />
                  <span>Temporaire (7 jours avec fin automatique)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    checked={duration === 'definitive'}
                    onChange={() => setDuration('definitive')}
                    className="accent-[var(--rust)]"
                  />
                  <span>Définitive</span>
                </label>
              </div>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Note au dossier (optionnelle) :
              </label>
              <textarea
                value={suspensionNotes}
                onChange={(e) => setSuspensionNotes(e.target.value)}
                placeholder="Raison détaillée..."
                rows={2}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-medium text-[var(--ink)]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsSuspending(false)}
                className="px-4 py-2 rounded-xl border border-[var(--border-warm)] cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-700 text-white font-bold cursor-pointer"
              >
                Confirmer la sanction
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: SUPPRESSION CNDP */}
      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in text-xs text-left">
          <div className="w-full max-w-md bg-white rounded-3xl border-2 border-rose-500 shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-rose-800">
              Confirmer la suppression définitive du compte
            </h3>
            <p className="text-[var(--ink-muted)]">
              En vertu de la Loi 09-08 (CNDP), toutes les données personnelles identifiables de {client.name} seront supprimées ou anonymisées dans les archives de la plateforme.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleting(false)}
                className="px-4 py-2 rounded-xl border border-[var(--border-warm)] cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmDeletion}
                className="px-5 py-2 rounded-xl bg-rose-700 text-white font-bold cursor-pointer"
              >
                Supprimer définitivement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
