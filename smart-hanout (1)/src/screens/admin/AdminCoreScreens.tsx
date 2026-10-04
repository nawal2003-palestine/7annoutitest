import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  StoreAdminRecord,
  ClientAdminRecord,
  CourierAdminRecord,
  MerchantSuspensionReason,
  CourierSuspensionReason,
  ClientSuspensionReason,
  AdminRoleType,
} from '../../types';
import {
  Store,
  Bike,
  Users,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Search,
  Shield,
  MapPin,
  Eye,
  AlertTriangle,
  FileText,
  Clock,
  Download,
  AlertCircle,
  Ban,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  UserCheck,
  Building,
  Smartphone,
  Phone,
  Lock,
} from 'lucide-react';

/**
 * Top Admin Navigation Bar with Role Toggle and "À Traiter" queue
 */
export const AdminTopControlBar: React.FC = () => {
  const {
    currentAdminRole,
    setCurrentAdminRole,
    adminStores,
    adminClients,
    adminCouriers,
    currentScreen,
    setCurrentScreen,
  } = useApp();

  const pendingStoresCount = adminStores.filter((s) => s.status === 'pending').length;
  const pendingCouriersCount = adminCouriers.filter((c) => c.status === 'pending').length;
  const highRiskKarnaStoresCount = adminStores.filter((s) => s.karnaExposure.isHighRisk).length;
  const highRiskClientsCount = adminClients.filter(
    (c) => c.cancellationRatePct > 15 || c.multiAccountsDetected.length > 0
  ).length;

  const totalActionItems =
    pendingStoresCount + pendingCouriersCount + highRiskKarnaStoresCount + highRiskClientsCount;

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-[var(--chalkboard)] text-white shadow-xl space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-white/15 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[var(--rust)] flex items-center justify-center font-bold text-lg text-white shadow-md">
            SH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold">Console de Supervision Centrale</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-[var(--amber-gold)] font-bold">
                Maroc • Production
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Contrôles stricts conformes au document de gestion (CIN, Karna multi-hanouts, incidents livreurs)
            </p>
          </div>
        </div>

        {/* Admin Role Switcher (Droits Différenciés) */}
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20 text-xs">
          <span className="text-[11px] text-stone-300 px-2 font-medium">Rôle actif :</span>
          {(['super_admin', 'moderator', 'support'] as AdminRoleType[]).map((r) => {
            const isActive = currentAdminRole === r;
            const label =
              r === 'super_admin'
                ? '👑 Super Admin'
                : r === 'moderator'
                ? '🛡️ Modérateur'
                : '🎧 Support';
            return (
              <button
                key={r}
                onClick={() => setCurrentAdminRole(r)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--rust)] text-white shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* File d'attente « À Traiter » (Action Queue Proactive) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              File d'Attente « À Traiter » ({totalActionItems} alertes proactives)
            </span>
          </div>
          <span className="text-[11px] text-stone-400">
            Dossiers nécessitant une intervention humaine
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          {/* Pending stores */}
          <div
            onClick={() => setCurrentScreen('admin-stores')}
            className="p-3 rounded-2xl bg-white/10 border border-white/15 hover:border-[var(--amber-gold)] transition-colors cursor-pointer flex items-center justify-between"
          >
            <div>
              <span className="text-[11px] text-stone-300 block">Hanouts en attente</span>
              <span className="font-bold text-sm text-[var(--amber-gold)]">
                {pendingStoresCount} boutique à valider
              </span>
            </div>
            <Store className="w-5 h-5 text-[var(--amber-gold)] opacity-80" />
          </div>

          {/* Karna high risk */}
          <div
            onClick={() => setCurrentScreen('admin-stores')}
            className="p-3 rounded-2xl bg-white/10 border border-white/15 hover:border-rose-400 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div>
              <span className="text-[11px] text-stone-300 block">Exposition Karna critique</span>
              <span className="font-bold text-sm text-rose-400">
                {highRiskKarnaStoresCount} hanout &gt; seuil
              </span>
            </div>
            <DollarSign className="w-5 h-5 text-rose-400 opacity-80" />
          </div>

          {/* High risk clients */}
          <div
            onClick={() => setCurrentScreen('admin-users')}
            className="p-3 rounded-2xl bg-white/10 border border-white/15 hover:border-amber-400 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div>
              <span className="text-[11px] text-stone-300 block">Clients à risque élevé</span>
              <span className="font-bold text-sm text-amber-300">
                {highRiskClientsCount} multi-comptes / retards
              </span>
            </div>
            <Users className="w-5 h-5 text-amber-300 opacity-80" />
          </div>

          {/* Pending Couriers & Concierges */}
          <div
            onClick={() => setCurrentScreen('admin-couriers')}
            className="p-3 rounded-2xl bg-white/10 border border-white/15 hover:border-emerald-400 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div>
              <span className="text-[11px] text-stone-300 block">Livreurs / Concierges</span>
              <span className="font-bold text-sm text-emerald-300">
                {pendingCouriersCount} vérification résidence
              </span>
            </div>
            <Bike className="w-5 h-5 text-emerald-300 opacity-80" />
          </div>
        </div>
      </div>

      {/* Admin Modules Navigation */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 text-xs">
        <span className="text-[11px] text-stone-400 font-mono uppercase mr-1">Modules :</span>
        {[
          { id: 'admin-orders', label: '📡 Tour de Contrôle', active: currentScreen === 'admin-orders' },
          { id: 'admin-stores', label: '🏪 Commerçants & Agréments', active: currentScreen === 'admin-stores' || currentScreen === 'admin-merchant-detail' },
          { id: 'admin-users', label: '👥 Surveillance Clients & CNDP', active: currentScreen === 'admin-users' || currentScreen === 'admin-client-detail' },
          { id: 'admin-couriers', label: '🛵 Livreurs & Concierges', active: currentScreen === 'admin-couriers' || currentScreen === 'admin-courier-detail' },
          { id: 'admin-support', label: '🎫 Support & Litiges', active: currentScreen === 'admin-support' },
          { id: 'admin-stats', label: '📊 Statistiques Nationales', active: currentScreen === 'admin-stats' },
          { id: 'admin-audit', label: '📋 Journal d\'Audit', active: currentScreen === 'admin-audit' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentScreen(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              tab.active
                ? 'bg-white text-[var(--chalkboard)] shadow-xs'
                : 'bg-white/10 text-stone-300 hover:text-white hover:bg-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * 1. Gestion des Commerçants (Moul Lhanout)
 */
export const AdminStoresScreen: React.FC = () => {
  const {
    adminStores,
    validateStoreAdmin,
    suspendStoreAdmin,
    reactivateStoreAdmin,
    currentAdminRole,
    setSelectedAdminMerchantId,
    setCurrentScreen,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedStoreRecord, setSelectedStoreRecord] = useState<StoreAdminRecord | null>(null);

  // Validation modal state
  const [validatingStore, setValidatingStore] = useState<StoreAdminRecord | null>(null);
  const [validationReasonInput, setValidationReasonInput] = useState(
    'Vérification physique effectuée par le délégué de quartier. Pièce CIN et local conformes.'
  );

  // Suspension modal state
  const [suspendingStore, setSuspendingStore] = useState<StoreAdminRecord | null>(null);
  const [suspensionReason, setSuspensionReason] =
    useState<MerchantSuspensionReason>('Produits non conformes');
  const [suspensionDuration, setSuspensionDuration] = useState<'temporary_7d' | 'definitive'>(
    'temporary_7d'
  );
  const [suspensionNotes, setSuspensionNotes] = useState('');

  const filteredStores = adminStores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirmValidation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatingStore) return;
    validateStoreAdmin(validatingStore.id, validationReasonInput);
    setValidatingStore(null);
  };

  const handleConfirmSuspension = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suspendingStore) return;
    suspendStoreAdmin(suspendingStore.id, suspensionReason, suspensionDuration, suspensionNotes);
    setSuspendingStore(null);
    setSuspensionNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      <AdminTopControlBar />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Gestion & Agrément des Commerçants (Moul Lhanout)
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Vérification CIN, RC optionnel, suivi d'exposition Karna et fiches complètes
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--ink-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par hanout, gérant ou CIN..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[var(--border-warm)] bg-white text-[var(--ink)]"
          />
        </div>
      </div>

      <MoroccanStarBorder />

      {/* Table of merchants */}
      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border-warm)] text-[var(--ink-muted)] pb-2 font-mono">
                <th className="py-2.5">Commerce / Enseigne</th>
                <th className="py-2.5">Propriétaire & CIN</th>
                <th className="py-2.5">Téléphone (OTP)</th>
                <th className="py-2.5">Exposition Karna</th>
                <th className="py-2.5">Performance</th>
                <th className="py-2.5">Statut</th>
                <th className="py-2.5 text-right">Actions Fiche</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-warm)]">
              {filteredStores.map((st) => (
                <tr key={st.id} className="hover:bg-[var(--wall)]">
                  <td className="py-3">
                    <div className="font-bold text-sm text-[var(--ink)]">{st.name}</div>
                    <div className="text-[11px] text-[var(--ink-muted)] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[var(--rust)]" />
                      <span>
                        {st.neighborhood}, {st.city}
                      </span>
                    </div>
                  </td>

                  <td className="py-3">
                    <div className="font-semibold text-[var(--ink)]">{st.ownerName}</div>
                    <div className="text-[11px] font-mono text-[var(--ink-muted)]">
                      CIN : {st.ownerCin}
                    </div>
                    <div className="text-[10px] text-stone-500">
                      RC : {st.rcNumber || 'Non assujetti (Optionnel)'}
                    </div>
                  </td>

                  <td className="py-3">
                    <div className="font-mono">{st.phone}</div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      ✓ OTP Vérifié
                    </span>
                  </td>

                  {/* Karna Exposure tracking (PDF Requirement) */}
                  <td className="py-3">
                    <div className="font-mono font-extrabold text-[var(--rust)]">
                      {st.karnaExposure.totalDebtDh.toLocaleString()} DH
                    </div>
                    <div className="text-[10px] text-[var(--ink-muted)]">
                      sur {st.karnaExposure.clientCount} clients
                    </div>
                    {st.karnaExposure.isHighRisk ? (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-300 flex items-center gap-1 mt-0.5">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Risque Élevé (&gt; {st.karnaExposure.maxAllowedExposureDh} DH)</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-stone-500">
                        Plafond : {st.karnaExposure.maxAllowedExposureDh.toLocaleString()} DH
                      </span>
                    )}
                  </td>

                  <td className="py-3">
                    <div className="font-bold text-[var(--amber-gold)]">★ {st.kpis.rating}</div>
                    <div className="text-[11px] text-[var(--ink-muted)] font-mono">
                      {st.kpis.totalOrders} cmds • {st.kpis.totalRevenueDh.toLocaleString()} DH
                    </div>
                  </td>

                  <td className="py-3">
                    {st.status === 'active' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Actif / Agréé
                      </span>
                    )}
                    {st.status === 'pending' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        En attente validation
                      </span>
                    )}
                    {st.status === 'suspended' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                        Suspendu
                      </span>
                    )}
                  </td>

                  <td className="py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedAdminMerchantId(st.id);
                          setCurrentScreen('admin-merchant-detail');
                        }}
                        className="px-2.5 py-1.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] hover:bg-white text-xs font-bold text-[var(--ink)] cursor-pointer shadow-xs"
                      >
                        Fiche complète
                      </button>

                      {st.status === 'pending' && (
                        <button
                          onClick={() => setValidatingStore(st)}
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer shadow-xs"
                        >
                          Valider
                        </button>
                      )}

                      {st.status === 'active' && (
                        <button
                          onClick={() => setSuspendingStore(st)}
                          disabled={currentAdminRole === 'support'}
                          className="px-2.5 py-1.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold cursor-pointer disabled:opacity-40"
                          title={
                            currentAdminRole === 'support'
                              ? 'Action réservée Super Admin / Modérateur'
                              : 'Suspendre le hanout'
                          }
                        >
                          Suspendre
                        </button>
                      )}

                      {st.status === 'suspended' && (
                        <button
                          onClick={() => reactivateStoreAdmin(st.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer"
                        >
                          Réactiver
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: FICHE COMMERÇANT COMPLÈTE (PDF Requirement: pas juste une ligne dans un tableau) */}
      {selectedStoreRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-3xl bg-white rounded-3xl border border-[var(--border-warm)] shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-warm)]">
              <div>
                <span className="text-[11px] font-mono font-bold text-[var(--rust)] uppercase">
                  Fiche Complète Moul Lhanout
                </span>
                <h3 className="text-xl font-bold text-[var(--ink)]">
                  {selectedStoreRecord.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStoreRecord(null)}
                className="p-2 text-stone-400 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Box 1: Store & Owner Identity */}
              <div className="p-4 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-2">
                <h4 className="font-bold text-sm text-[var(--ink)] flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[var(--rust)]" />
                  <span>Identité du Propriétaire</span>
                </h4>
                <div>
                  <span className="text-[var(--ink-muted)] block">Nom :</span>
                  <span className="font-bold text-[var(--ink)]">{selectedStoreRecord.ownerName}</span>
                </div>
                <div>
                  <span className="text-[var(--ink-muted)] block">N° CIN Marocaine :</span>
                  <span className="font-mono font-bold">{selectedStoreRecord.ownerCin}</span>
                </div>
                <div>
                  <span className="text-[var(--ink-muted)] block">Registre de Commerce :</span>
                  <span>{selectedStoreRecord.rcNumber || 'Non assujetti (Optionnel pour hanout)'}</span>
                </div>
                <div>
                  <span className="text-[var(--ink-muted)] block">Téléphone boutique :</span>
                  <span className="font-mono">{selectedStoreRecord.phone}</span>
                </div>
              </div>

              {/* Box 2: Activity & Validation */}
              <div className="p-4 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-2">
                <h4 className="font-bold text-sm text-[var(--ink)] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[var(--amber-gold)]" />
                  <span>Historique d'Activité</span>
                </h4>
                <div>
                  <span className="text-[var(--ink-muted)] block">Date d'inscription :</span>
                  <span>{selectedStoreRecord.activity.registeredAt}</span>
                </div>
                <div>
                  <span className="text-[var(--ink-muted)] block">Dernière connexion :</span>
                  <span>{selectedStoreRecord.activity.lastLogin}</span>
                </div>
                <div>
                  <span className="text-[var(--ink-muted)] block">Dernière commande reçue :</span>
                  <span>{selectedStoreRecord.activity.lastOrderReceived}</span>
                </div>
                {selectedStoreRecord.validatedBy && (
                  <div className="pt-1 border-t border-[var(--border-warm)] text-[11px]">
                    <span className="font-bold text-emerald-800">Agréé par : </span>
                    <span>{selectedStoreRecord.validatedBy} ({selectedStoreRecord.validatedAt})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Members of the store team */}
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] space-y-3 text-xs">
              <h4 className="font-bold text-sm text-[var(--ink)]">
                Membres de l'équipe Hanout ({selectedStoreRecord.storeMembers.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedStoreRecord.storeMembers.map((m) => (
                  <div key={m.id} className="p-3 rounded-xl bg-[var(--wall)] border border-[var(--border-warm)]">
                    <span className="font-bold block text-[var(--ink)]">{m.name}</span>
                    <span className="text-[11px] text-[var(--rust)] font-semibold">{m.role}</span>
                    <span className="text-[10px] text-[var(--ink-muted)] block font-mono">{m.phone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
              <div className="p-3 rounded-xl bg-[var(--wall)] border border-[var(--border-warm)]">
                <span className="text-[11px] text-[var(--ink-muted)] block">Commandes</span>
                <span className="text-base font-extrabold font-mono text-[var(--ink)]">
                  {selectedStoreRecord.kpis.totalOrders}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--wall)] border border-[var(--border-warm)]">
                <span className="text-[11px] text-[var(--ink-muted)] block">Chiffre d'Affaires</span>
                <span className="text-base font-extrabold font-mono text-[var(--rust)]">
                  {selectedStoreRecord.kpis.totalRevenueDh.toLocaleString()} DH
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--wall)] border border-[var(--border-warm)]">
                <span className="text-[11px] text-[var(--ink-muted)] block">Taux d'annulation</span>
                <span className="text-base font-extrabold font-mono text-emerald-700">
                  {selectedStoreRecord.kpis.cancellationRatePct}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--wall)] border border-[var(--border-warm)]">
                <span className="text-[11px] text-[var(--ink-muted)] block">Préparation moy.</span>
                <span className="text-base font-extrabold font-mono text-[var(--ink)]">
                  {selectedStoreRecord.kpis.avgPrepTimeMin} min
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedStoreRecord(null)}
                className="px-5 py-2.5 rounded-xl bg-[var(--ink)] text-white text-xs font-bold"
              >
                Fermer la fiche
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: VALIDATION AVEC MOTIF OBLIGATOIRE (PDF Requirement) */}
      {validatingStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <form
            onSubmit={handleConfirmValidation}
            className="w-full max-w-lg bg-white rounded-3xl border-2 border-emerald-500 shadow-2xl p-6 space-y-4 text-xs"
          >
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Validation & Agrément Officiel</span>
              </h3>
              <p className="text-[var(--ink-muted)]">
                Commerce : <strong>{validatingStore.name}</strong> • Propriétaire : {validatingStore.ownerName} (CIN: {validatingStore.ownerCin})
              </p>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Motif de validation obligatoire (traçable dans le journal d'audit) :
              </label>
              <textarea
                rows={3}
                required
                value={validationReasonInput}
                onChange={(e) => setValidationReasonInput(e.target.value)}
                placeholder="Préciser les éléments vérifiés (visite de terrain, conformité CIN, local)..."
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-sans"
              />
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] space-y-1">
              <p className="font-bold">✓ Cette action va :</p>
              <ul className="list-disc list-inside">
                <li>Passer le statut de « pending » à « active »</li>
                <li>Créer une écriture immuable dans audit_logs</li>
                <li>Envoyer une notification automatique de bienvenue au commerçant</li>
              </ul>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setValidatingStore(null)}
                className="px-4 py-2 rounded-xl border border-[var(--border-warm)]"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
              >
                Confirmer l'agrément
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: SUSPENSION AVEC MOTIFS STANDARDISÉS (PDF Requirement) */}
      {suspendingStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <form
            onSubmit={handleConfirmSuspension}
            className="w-full max-w-lg bg-white rounded-3xl border-2 border-rose-500 shadow-2xl p-6 space-y-4 text-xs"
          >
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-rose-800 flex items-center gap-1.5">
                <Ban className="w-5 h-5 text-rose-600" />
                <span>Suspension du Commerce</span>
              </h3>
              <p className="text-[var(--ink-muted)]">
                Boutique concernée : <strong>{suspendingStore.name}</strong>
              </p>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Motif standardisé de suspension (Liste obligatoire) :
              </label>
              <select
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value as MerchantSuspensionReason)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-bold text-[var(--ink)] cursor-pointer"
              >
                <option value="Fraude">Fraude</option>
                <option value="Plaintes répétées">Plaintes répétées</option>
                <option value="Produits non conformes">Produits non conformes</option>
                <option value="Documents invalides">Documents invalides</option>
                <option value="Comportement inapproprié">Comportement inapproprié</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Type de suspension :</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="dur"
                    checked={suspensionDuration === 'temporary_7d'}
                    onChange={() => setSuspensionDuration('temporary_7d')}
                    className="accent-[var(--rust)]"
                  />
                  <span>Temporaire (7 jours automatique)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="dur"
                    checked={suspensionDuration === 'definitive'}
                    onChange={() => setSuspensionDuration('definitive')}
                    className="accent-[var(--rust)]"
                  />
                  <span>Définitive</span>
                </label>
              </div>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Notes et détails du constat :</label>
              <textarea
                rows={3}
                value={suspensionNotes}
                onChange={(e) => setSuspensionNotes(e.target.value)}
                placeholder="Rapport d'incident ou numéro de réclamation client..."
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSuspendingStore(null)}
                className="px-4 py-2 rounded-xl border border-[var(--border-warm)]"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold"
              >
                Appliquer la suspension
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

/**
 * 2. Gestion des Clients (Multi-Hanouts Karna, Signaux de Risque, Droit à la Donnée)
 */
export const AdminUsersScreen: React.FC = () => {
  const {
    adminClients,
    suspendClientAdmin,
    reactivateClientAdmin,
    exportClientDataAdmin,
    setSelectedAdminClientId,
    setCurrentScreen,
  } = useApp();

  const [selectedClient, setSelectedClient] = useState<ClientAdminRecord | null>(null);
  const [suspendingClient, setSuspendingClient] = useState<ClientAdminRecord | null>(null);
  const [clientSuspensionReason, setClientSuspensionReason] =
    useState<ClientSuspensionReason>('Taux d\'annulation anormalement élevé');
  const [clientDuration, setClientDuration] = useState<'temporary_7d' | 'definitive'>('temporary_7d');

  const handleConfirmClientSuspension = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suspendingClient) return;
    suspendClientAdmin(suspendingClient.id, clientSuspensionReason, clientDuration);
    setSuspendingClient(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      <AdminTopControlBar />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Gestion & Surveillance des Clients
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Vue transversale multi-hanouts du Karna, détection des multi-comptes et droit à la donnée (CNDP)
          </p>
        </div>
      </div>

      <MoroccanStarBorder />

      {/* Clients Table */}
      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border-warm)] text-[var(--ink-muted)] pb-2 font-mono">
                <th className="py-2.5">Client</th>
                <th className="py-2.5">Téléphone & Ville</th>
                <th className="py-2.5">Volume & Dépenses</th>
                <th className="py-2.5">Karna Multi-Hanouts</th>
                <th className="py-2.5">Signaux de Risque</th>
                <th className="py-2.5">Statut</th>
                <th className="py-2.5 text-right">Actions Fiche</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-warm)]">
              {adminClients.map((cli) => {
                const hasRisk =
                  cli.cancellationRatePct > 15 ||
                  cli.multiAccountsDetected.length > 0 ||
                  cli.karnaExposure.hasRepeatedDefaults;

                return (
                  <tr key={cli.id} className="hover:bg-[var(--wall)]">
                    <td className="py-3 font-bold text-sm text-[var(--ink)]">
                      {cli.name}
                      <span className="text-[11px] font-normal text-[var(--ink-muted)] block">
                        Inscrit : {cli.registeredAt}
                      </span>
                    </td>

                    <td className="py-3">
                      <div className="font-mono">{cli.phone}</div>
                      <div className="text-[11px] text-[var(--ink-muted)]">
                        {cli.neighborhood}, {cli.city}
                      </div>
                    </td>

                    <td className="py-3 font-mono">
                      <span className="font-bold text-[var(--ink)]">{cli.totalSpentDh.toFixed(2)} DH</span>
                      <span className="text-[11px] text-[var(--ink-muted)] block">
                        {cli.totalOrders} commandes
                      </span>
                    </td>

                    {/* VUE TRANSVERSALE MULTI-HANOUTS DU KARNA (Spécifiée dans le PDF) */}
                    <td className="py-3">
                      <div className="font-mono font-extrabold text-[var(--rust)]">
                        {cli.karnaExposure.totalMultiHanoutDebtDh.toFixed(2)} DH
                      </div>
                      <div className="text-[10px] text-[var(--ink-muted)]">
                        sur {cli.karnaExposure.accounts.length} hanout(s)
                      </div>
                      {cli.karnaExposure.hasRepeatedDefaults && (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1 py-0.5 rounded border border-rose-200">
                          Retards répétés
                        </span>
                      )}
                    </td>

                    {/* SIGNAUX DE COMPORTEMENT A RISQUE (PDF) */}
                    <td className="py-3">
                      {hasRisk ? (
                        <div className="space-y-0.5">
                          {cli.cancellationRatePct > 15 && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded block whitespace-nowrap">
                              Annulation élevée : {cli.cancellationRatePct}%
                            </span>
                          )}
                          {cli.multiAccountsDetected.length > 0 && (
                            <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded block whitespace-nowrap">
                              Multi-comptes détecté !
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          ✓ Profil de confiance
                        </span>
                      )}
                    </td>

                    <td className="py-3">
                      {cli.status === 'active' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Actif
                        </span>
                      )}
                      {cli.status === 'suspended_temp' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Suspendu 7j
                        </span>
                      )}
                      {cli.status === 'suspended_perm' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          Banni permanent
                        </span>
                      )}
                    </td>

                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedAdminClientId(cli.id);
                            setCurrentScreen('admin-client-detail');
                          }}
                          className="px-2.5 py-1.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] hover:bg-white text-xs font-bold text-[var(--ink)] cursor-pointer"
                        >
                          Fiche complète
                        </button>

                        {cli.status === 'active' ? (
                          <button
                            onClick={() => setSuspendingClient(cli)}
                            className="px-2.5 py-1.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold cursor-pointer"
                          >
                            Suspendre
                          </button>
                        ) : (
                          <button
                            onClick={() => reactivateClientAdmin(cli.id)}
                            className="px-2.5 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                          >
                            Réactiver
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: FICHE CLIENT COMPLÈTE & MULTI-HANOUT KARNA DETAILS */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-3xl bg-white rounded-3xl border border-[var(--border-warm)] shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-warm)]">
              <div>
                <span className="text-[11px] font-mono font-bold text-[var(--rust)] uppercase">
                  Fiche Complète Client & Risques
                </span>
                <h3 className="text-xl font-bold text-[var(--ink)]">{selectedClient.name}</h3>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 text-stone-400 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Vue transversale Karna Multi-Hanouts */}
            <div className="p-4 rounded-2xl bg-[var(--karna-paper)] border border-[var(--border-warm)] space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[var(--rust)] font-kalam text-base">
                  Carnets de Karna Multi-Hanouts
                </h4>
                <span className="font-mono font-bold text-sm text-[var(--rust)]">
                  Total cumulé : {selectedClient.karnaExposure.totalMultiHanoutDebtDh.toFixed(2)} DH
                </span>
              </div>

              <div className="space-y-2">
                {selectedClient.karnaExposure.accounts.map((acc, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white border border-[var(--border-warm)] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-[var(--ink)]">{acc.storeName}</span>
                      <span className="text-[11px] text-[var(--ink-muted)] block">
                        Plafond autorisé : {acc.limitDh} DH
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-sm text-[var(--rust)]">
                        {acc.debtDh.toFixed(2)} DH
                      </span>
                      {acc.defaultPaymentsCount > 0 && (
                        <span className="text-[10px] text-rose-700 block font-semibold">
                          ⚠️ {acc.defaultPaymentsCount} impayé(s) signalé(s)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-Accounts Signals if any */}
            {selectedClient.multiAccountsDetected.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 space-y-2 text-xs text-rose-900">
                <span className="font-bold flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-rose-700" />
                  <span>Alerte Multi-Comptes / Même Appareil :</span>
                </span>
                <ul className="list-disc list-inside space-y-1 text-[11px]">
                  {selectedClient.multiAccountsDetected.map((acc, idx) => (
                    <li key={idx}>{acc}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Droit à la donnée CNDP */}
            <div className="p-4 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[var(--ink)] block">Conformité CNDP & Droit à la donnée</span>
                <span className="text-[11px] text-[var(--ink-muted)]">
                  Télécharger le dossier complet des données personnelles (Loi 09-08)
                </span>
              </div>
              <button
                onClick={() => exportClientDataAdmin(selectedClient.id)}
                className="px-4 py-2 rounded-xl bg-[var(--moroccan-green)] hover:bg-[var(--moroccan-green-hover)] text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exporter Archive CNDP (JSON)</span>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-5 py-2.5 rounded-xl bg-[var(--ink)] text-white text-xs font-bold"
              >
                Fermer la fiche
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUSPENSION CLIENT (MOTIFS STANDARDISÉS) */}
      {suspendingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <form
            onSubmit={handleConfirmClientSuspension}
            className="w-full max-w-lg bg-white rounded-3xl border-2 border-rose-500 shadow-2xl p-6 space-y-4 text-xs"
          >
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-rose-800">Suspendre le Client {suspendingClient.name}</h3>
              <p className="text-[var(--ink-muted)]">Sélectionnez le motif et la durée de la sanction</p>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Motif standardisé :</label>
              <select
                value={clientSuspensionReason}
                onChange={(e) => setClientSuspensionReason(e.target.value as ClientSuspensionReason)}
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
              <label className="font-bold text-[var(--ink)] block mb-1">Durée :</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="cdur"
                    checked={clientDuration === 'temporary_7d'}
                    onChange={() => setClientDuration('temporary_7d')}
                    className="accent-[var(--rust)]"
                  />
                  <span>Temporaire (7 jours automatique)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="cdur"
                    checked={clientDuration === 'definitive'}
                    onChange={() => setClientDuration('definitive')}
                    className="accent-[var(--rust)]"
                  />
                  <span>Définitive</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSuspendingClient(null)}
                className="px-4 py-2 rounded-xl border border-[var(--border-warm)]"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-700 text-white font-bold"
              >
                Confirmer la sanction
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

/**
 * 3. Gestion des Livreurs / Concierges (Double Sens d'Incidents, Vérification Résidence)
 */
export const AdminCouriersScreen: React.FC = () => {
  const {
    adminCouriers,
    validateCourierAdmin,
    suspendCourierAdmin,
    reactivateCourierAdmin,
    currentAdminRole,
    setSelectedAdminCourierId,
    setCurrentScreen,
  } = useApp();

  const [selectedCourier, setSelectedCourier] = useState<CourierAdminRecord | null>(null);
  const [suspendingCourier, setSuspendingCourier] = useState<CourierAdminRecord | null>(null);
  const [courierReason, setCourierReason] =
    useState<CourierSuspensionReason>('Retards répétés');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      <AdminTopControlBar />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Gestion des Livreurs & Concierges de Quartier
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Contrôle d'accès strict : vérification résidence pour concierges, distinction des 2 sens d'incidents
          </p>
        </div>
      </div>

      <MoroccanStarBorder />

      {/* Courier list */}
      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border-warm)] text-[var(--ink-muted)] pb-2 font-mono">
                <th className="py-2.5">Livreur & CIN</th>
                <th className="py-2.5">Type & Spécificités</th>
                <th className="py-2.5">Indicateurs Confiance</th>
                <th className="py-2.5">Incidents PAR Livreur</th>
                <th className="py-2.5">Plaintes CONTRE Livreur</th>
                <th className="py-2.5">Statut</th>
                <th className="py-2.5 text-right">Actions Fiche</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-warm)]">
              {adminCouriers.map((cour) => {
                const hasHighComplaints = cour.incidentsReportedAgainstCourier.length >= 2;

                return (
                  <tr key={cour.id} className="hover:bg-[var(--wall)]">
                    <td className="py-3 font-bold text-sm text-[var(--ink)]">
                      {cour.name}
                      <span className="text-[11px] font-mono text-[var(--ink-muted)] block">
                        CIN : {cour.cin} • {cour.phone}
                      </span>
                    </td>

                    {/* Champs spécifiques selon le type (PDF Specification) */}
                    <td className="py-3">
                      <div className="font-bold text-[var(--rust)] capitalize">
                        {cour.type === 'pro' && '🏍️ Professionnel (Moto)'}
                        {cour.type === 'concierge' && '🏢 Concierge Immeuble'}
                        {cour.type === 'employee' && '🏪 Employé Hanout'}
                      </div>
                      <div className="text-[11px] text-[var(--ink-muted)]">
                        {cour.type === 'pro' && `${cour.typeDetails.vehicle} (${cour.typeDetails.plateNumber})`}
                        {cour.type === 'concierge' && (
                          <span>
                            {cour.typeDetails.residenceBuildingAddress}
                            {cour.typeDetails.isResidencyVerified ? (
                              <span className="text-emerald-700 block font-semibold">✓ Résidence vérifiée sur place</span>
                            ) : (
                              <span className="text-rose-700 block font-semibold">⚠️ Résidence non vérifiée</span>
                            )}
                          </span>
                        )}
                        {cour.type === 'employee' && `Rattaché à ${cour.typeDetails.attachedStoreName}`}
                      </div>
                    </td>

                    <td className="py-3">
                      <div className="font-bold text-[var(--amber-gold)]">★ {cour.trustMetrics.rating}</div>
                      <div className="text-[11px] text-[var(--ink-muted)] font-mono">
                        {cour.trustMetrics.onTimeDeliveryRatePct}% à l'heure • {cour.trustMetrics.totalDeliveries} courses
                      </div>
                    </td>

                    {/* Sens 1: Incidents signalés PAR le livreur */}
                    <td className="py-3">
                      <span className="font-mono font-bold text-stone-700">
                        {cour.incidentsByCourier.length} incident(s)
                      </span>
                      <span className="text-[10px] text-[var(--ink-muted)] block">
                        (Client absent, interphone HS)
                      </span>
                    </td>

                    {/* Sens 2: Incidents signalés CONTRE le livreur par les clients (PDF Crucial) */}
                    <td className="py-3">
                      <span
                        className={`font-mono font-bold px-2 py-0.5 rounded-full text-[11px] ${
                          hasHighComplaints
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {cour.incidentsReportedAgainstCourier.length} plainte(s) client
                      </span>
                      {hasHighComplaints && (
                        <span className="text-[10px] text-rose-600 block font-semibold">
                          ⚠️ Seuil d'alerte atteint
                        </span>
                      )}
                    </td>

                    <td className="py-3">
                      {cour.status === 'active' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Agréé Actif
                        </span>
                      )}
                      {cour.status === 'pending' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          En attente vérif
                        </span>
                      )}
                      {cour.status === 'suspended' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          Suspendu
                        </span>
                      )}
                    </td>

                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedAdminCourierId(cour.id);
                            setCurrentScreen('admin-courier-detail');
                          }}
                          className="px-2.5 py-1.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] hover:bg-white text-xs font-bold text-[var(--ink)] cursor-pointer"
                        >
                          Fiche complète
                        </button>

                        {cour.status === 'pending' && (
                          <button
                            onClick={() =>
                              validateCourierAdmin(
                                cour.id,
                                'Vérification pièce d\'identité et résidence validée par l\'équipe'
                              )
                            }
                            className="px-2.5 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                          >
                            Valider
                          </button>
                        )}

                        {cour.status === 'active' ? (
                          <button
                            onClick={() => setSuspendingCourier(cour)}
                            className="px-2.5 py-1.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold cursor-pointer"
                          >
                            Suspendre
                          </button>
                        ) : cour.status === 'suspended' ? (
                          <button
                            onClick={() => reactivateCourierAdmin(cour.id)}
                            className="px-2.5 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                          >
                            Réactiver
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: DETAIL DU LIVREUR AVEC LES 2 DIRECTIONS D'INCIDENTS */}
      {selectedCourier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-3xl bg-white rounded-3xl border border-[var(--border-warm)] shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-warm)]">
              <div>
                <span className="text-[11px] font-mono font-bold text-[var(--rust)] uppercase">
                  Dossier Livreur & Antécédents
                </span>
                <h3 className="text-xl font-bold text-[var(--ink)]">{selectedCourier.name}</h3>
                <p className="text-xs text-[var(--ink-muted)]">
                  Type : {selectedCourier.type.toUpperCase()} • CIN : {selectedCourier.cin}
                </p>
              </div>
              <button
                onClick={() => setSelectedCourier(null)}
                className="p-2 text-stone-400 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Comparison of the 2 incident directions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Sens 1 */}
              <div className="p-4 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-2">
                <span className="font-bold text-[var(--ink)] block text-sm">
                  1. Incidents signalés PAR le livreur ({selectedCourier.incidentsByCourier.length})
                </span>
                <p className="text-[11px] text-[var(--ink-muted)]">
                  Obstacles rencontrés sur le terrain (adresse introuvable, client injoignable, panne)
                </p>
                <div className="space-y-1.5 pt-1">
                  {selectedCourier.incidentsByCourier.map((inc) => (
                    <div key={inc.id} className="p-2.5 rounded-xl bg-white border border-[var(--border-warm)]">
                      <div className="flex justify-between font-mono font-bold text-[11px]">
                        <span>Cmd {inc.orderNumber}</span>
                        <span>{inc.date}</span>
                      </div>
                      <p className="text-[11px] text-[var(--ink)] mt-0.5">{inc.details}</p>
                    </div>
                  ))}
                  {selectedCourier.incidentsByCourier.length === 0 && (
                    <div className="text-[11px] text-stone-400 italic">Aucun incident terrain signalé.</div>
                  )}
                </div>
              </div>

              {/* Sens 2 */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
                <span className="font-bold text-rose-900 block text-sm">
                  2. Incidents signalés CONTRE le livreur ({selectedCourier.incidentsReportedAgainstCourier.length})
                </span>
                <p className="text-[11px] text-rose-700">
                  Réclamations clients (retard, impolitesse, marchandises abîmées)
                </p>
                <div className="space-y-1.5 pt-1">
                  {selectedCourier.incidentsReportedAgainstCourier.map((inc) => (
                    <div key={inc.id} className="p-2.5 rounded-xl bg-white border border-rose-300">
                      <div className="flex justify-between font-bold text-[11px]">
                        <span className="text-rose-800">Par {inc.clientName} (Cmd {inc.orderNumber})</span>
                        <span className="text-[10px] text-stone-400">{inc.date}</span>
                      </div>
                      <p className="text-[11px] text-rose-950 mt-0.5 font-medium">{inc.details}</p>
                    </div>
                  ))}
                  {selectedCourier.incidentsReportedAgainstCourier.length === 0 && (
                    <div className="text-[11px] text-emerald-800 font-medium">✓ Aucune plainte client enregistrée.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCourier(null)}
                className="px-5 py-2.5 rounded-xl bg-[var(--ink)] text-white text-xs font-bold"
              >
                Fermer la fiche
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUSPENSION LIVREUR */}
      {suspendingCourier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              suspendCourierAdmin(suspendingCourier.id, courierReason);
              setSuspendingCourier(null);
            }}
            className="w-full max-w-lg bg-white rounded-3xl border-2 border-rose-500 shadow-2xl p-6 space-y-4 text-xs"
          >
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-rose-800">Suspendre le Livreur {suspendingCourier.name}</h3>
              <p className="text-[var(--ink-muted)]">Sélectionnez le motif réglementaire spécifique aux livreurs :</p>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Motif spécifique livreur (PDF) :</label>
              <select
                value={courierReason}
                onChange={(e) => setCourierReason(e.target.value as CourierSuspensionReason)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-bold text-[var(--ink)]"
              >
                <option value="Incident de sécurité">Incident de sécurité</option>
                <option value="Retards répétés">Retards répétés</option>
                <option value="Fraude (fausse confirmation de livraison)">Fraude (fausse confirmation de livraison)</option>
                <option value="Comportement inapproprié">Comportement inapproprié</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSuspendingCourier(null)}
                className="px-4 py-2 rounded-xl border border-[var(--border-warm)]"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-700 text-white font-bold"
              >
                Confirmer suspension
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export { AdminOrdersScreen } from './AdminSupervisionScreen';
export { AdminMerchantDetailScreen } from './AdminMerchantDetailScreen';
export { AdminClientDetailScreen } from './AdminClientDetailScreen';
export { AdminCourierDetailScreen } from './AdminCourierDetailScreen';

