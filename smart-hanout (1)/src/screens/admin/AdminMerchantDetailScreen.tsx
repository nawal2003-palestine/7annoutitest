import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { AdminTopControlBar } from './AdminCoreScreens';
import { ProductAdminDeactivationReason, ReviewMaskReason, MerchantSuspensionReason } from '../../types';
import {
  Store,
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertTriangle,
  Ban,
  RotateCcw,
  Eye,
  EyeOff,
  ShoppingBag,
  Users,
  Clock,
  MapPin,
  Phone,
  FileText,
  DollarSign,
  TrendingUp,
  Star,
  Package,
  Layers,
  ShieldAlert,
  Bell,
  Check,
} from 'lucide-react';

export const AdminMerchantDetailScreen: React.FC = () => {
  const {
    adminStores,
    selectedAdminMerchantId,
    setSelectedAdminMerchantId,
    setCurrentScreen,
    products,
    reviews,
    orders,
    karnaEntries,
    deactivateProductAdmin,
    reactivateProductAdmin,
    maskReviewAdmin,
    unmaskReviewAdmin,
    suspendStoreAdmin,
    reactivateStoreAdmin,
    validateStoreAdmin,
    currentAdminRole,
  } = useApp();

  const store = adminStores.find((s) => s.id === selectedAdminMerchantId) || adminStores[0];

  // Active tab state: 'profil' | 'catalogue' | 'activite' | 'karna'
  const [activeTab, setActiveTab] = useState<'profil' | 'catalogue' | 'activite' | 'karna'>('profil');

  // Catalogue search & category filter
  const [catalogueSearch, setCatalogueSearch] = useState('');
  const [catalogueCategory, setCatalogueCategory] = useState('all');

  // Deactivate product modal state
  const [deactivatingProductId, setDeactivatingProductId] = useState<string | null>(null);
  const [productDeactivationReason, setProductDeactivationReason] =
    useState<ProductAdminDeactivationReason>('Contenu inapproprié');
  const [productDeactivationNotes, setProductDeactivationNotes] = useState('');

  // Mask review modal state
  const [maskingReviewId, setMaskingReviewId] = useState<string | null>(null);
  const [reviewMaskReason, setReviewMaskReason] =
    useState<ReviewMaskReason>('Propos diffamatoires ou injurieux');
  const [reviewMaskNotes, setReviewMaskNotes] = useState('');

  // Suspend store modal state
  const [isSuspendingStore, setIsSuspendingStore] = useState(false);
  const [suspensionReason, setSuspensionReason] =
    useState<MerchantSuspensionReason>('Produits non conformes');
  const [suspensionDuration, setSuspensionDuration] = useState<'temporary_7d' | 'definitive'>('temporary_7d');
  const [suspensionNotes, setSuspensionNotes] = useState('');

  // Products belonging to this store
  const storeProducts = products.filter((p) => {
    // Show products for store-1 (or match store.id)
    const matchStore = p.storeId === store.id || (store.id === 'store-1' && p.storeId === 'store-1');
    const matchCat = catalogueCategory === 'all' || p.category === catalogueCategory;
    const matchSearch =
      !catalogueSearch ||
      p.name.toLowerCase().includes(catalogueSearch.toLowerCase()) ||
      (p.nameAr && p.nameAr.includes(catalogueSearch));
    return matchStore && matchCat && matchSearch;
  });

  // Orders for this store
  const storeOrders = orders.filter((o) => o.storeId === store.id || store.id === 'store-1');

  // Reviews for this store
  const storeReviews = reviews.filter((r) => r.storeId === store.id || store.id === 'store-1');

  // Karna accounts for this store
  const storeKarnaAccounts = karnaEntries;
  const storeKarnaTotalDebt = storeKarnaAccounts.reduce((sum, k) => sum + k.currentDebtDh, 0);

  // Handle product deactivation confirm
  const handleConfirmProductDeactivation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deactivatingProductId) return;
    deactivateProductAdmin(
      deactivatingProductId,
      store.id,
      productDeactivationReason,
      productDeactivationNotes
    );
    setDeactivatingProductId(null);
    setProductDeactivationNotes('');
  };

  // Handle review mask confirm
  const handleConfirmReviewMask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!maskingReviewId) return;
    maskReviewAdmin(maskingReviewId, store.id, reviewMaskReason, reviewMaskNotes);
    setMaskingReviewId(null);
    setReviewMaskNotes('');
  };

  // Handle store suspension confirm
  const handleConfirmStoreSuspension = (e: React.FormEvent) => {
    e.preventDefault();
    suspendStoreAdmin(store.id, suspensionReason, suspensionDuration, suspensionNotes);
    setIsSuspendingStore(false);
    setSuspensionNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      <AdminTopControlBar />

      {/* Breadcrumb & Header */}
      <div className="space-y-3">
        <button
          onClick={() => setCurrentScreen('admin-stores')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--rust)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la liste des hanouts</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] flex items-center justify-center font-extrabold text-xl text-[var(--rust)] shadow-xs">
              🏪
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--ink)]">
                  {store.name}
                </h1>
                {store.status === 'active' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Actif
                  </span>
                )}
                {store.status === 'pending' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    En attente d'agrément
                  </span>
                )}
                {store.status === 'suspended' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                    Suspendu par l'Admin
                  </span>
                )}
                {store.karnaExposure.isHighRisk && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    ⚠️ Exposition Karna &gt; Seuil
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--ink-muted)] mt-1 flex flex-wrap items-center gap-2">
                <span>CIN exploitant : <strong className="font-mono text-[var(--ink)]">{store.ownerCin}</strong></span>
                <span>•</span>
                <span>Tél : <strong className="font-mono text-[var(--ink)]">{store.phone}</strong></span>
                <span>•</span>
                <span>{store.neighborhood}, {store.city}</span>
              </p>
            </div>
          </div>

          {/* Quick Header Actions (Suspend / Reactivate / Validate) */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            {store.status === 'pending' && (
              <button
                onClick={() => validateStoreAdmin(store.id, 'Dossier vérifié et conforme')}
                className="px-4 py-2 rounded-xl bg-[var(--moroccan-green)] hover:bg-[var(--moroccan-green-hover)] text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Agréer le hanout</span>
              </button>
            )}

            {store.status === 'active' && (
              <button
                onClick={() => setIsSuspendingStore(true)}
                className="px-4 py-2 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Ban className="w-4 h-4" />
                <span>Suspendre le commerce</span>
              </button>
            )}

            {store.status === 'suspended' && (
              <button
                onClick={() => reactivateStoreAdmin(store.id)}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Lever la suspension</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[var(--border-warm)] pb-1 overflow-x-auto text-xs font-bold">
        {[
          { id: 'profil', label: '1. Profil & Équipe', icon: Store },
          { id: 'catalogue', label: `2. Catalogue & Stocks (${storeProducts.length})`, icon: Package },
          { id: 'activite', label: `3. Activité & Commandes (${storeOrders.length})`, icon: TrendingUp },
          { id: 'karna', label: `4. Carnet Karna (${store.karnaExposure.totalDebtDh.toFixed(0)} DH)`, icon: DollarSign },
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

      {/* TAB 1: PROFIL & ÉQUIPE */}
      {activeTab === 'profil' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Identity & Legal Info */}
            <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
                <Store className="w-4 h-4 text-[var(--rust)]" />
                <span>Identité & Horaires d'Ouverture</span>
              </h3>

              <div className="space-y-2.5">
                <div>
                  <span className="text-[11px] text-[var(--ink-muted)] block">Description :</span>
                  <p className="text-[var(--ink)] font-medium mt-0.5">
                    {store.description || 'Commerce de proximité alimentaire de quartier.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[var(--border-warm)]">
                  <div>
                    <span className="text-[11px] text-[var(--ink-muted)] block">Horaires :</span>
                    <span className="font-bold text-[var(--ink)]">{store.openingHours || '07h00 — 23h00'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[var(--ink-muted)] block">Date d'inscription :</span>
                    <span className="font-bold text-[var(--ink)]">{store.activity.registeredAt}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[var(--border-warm)]">
                  <div>
                    <span className="text-[11px] text-[var(--ink-muted)] block">Adresse physique :</span>
                    <span className="font-bold text-[var(--ink)]">{store.address}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[var(--ink-muted)] block">Registre Commerce (RC) :</span>
                    <span className="font-mono font-bold text-[var(--ink)]">{store.rcNumber || 'Non applicable (Patente seule)'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--rust)]" />
                <span>Membres de l'Équipe & Rôles ({store.storeMembers.length})</span>
              </h3>

              <div className="space-y-2">
                {store.storeMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-3 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-[var(--ink)] block">{member.name}</span>
                      <span className="text-[11px] text-[var(--ink-muted)] font-mono">{member.phone}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-[var(--border-warm)] font-bold text-[10px] text-[var(--rust)]">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status Change History */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--rust)]" />
              <span>Historique des Décisions Administratives & Sanctions</span>
            </h3>

            {store.suspensionHistory.length === 0 ? (
              <div className="p-4 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] text-[var(--ink-muted)] italic text-center">
                Aucune sanction ni suspension n'a été appliquée à ce commerce.
              </div>
            ) : (
              <div className="space-y-2">
                {store.suspensionHistory.map((h) => (
                  <div key={h.id} className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                    <div className="flex items-center justify-between font-bold text-rose-900">
                      <span>Suspension : {h.reason}</span>
                      <span className="text-[10px] font-mono text-stone-500">{h.date}</span>
                    </div>
                    <div className="text-[11px] text-rose-800">
                      Par : <strong>{h.admin}</strong> • Durée : <strong>{h.duration === 'definitive' ? 'Définitive' : '7 jours'}</strong>
                    </div>
                    {h.notes && <p className="text-[11px] text-rose-950 mt-1">{h.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CATALOGUE & STOCKS (CRITICAL NEW FEATURE) */}
      {activeTab === 'catalogue' && (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
                <input
                  type="text"
                  value={catalogueSearch}
                  onChange={(e) => setCatalogueSearch(e.target.value)}
                  placeholder="Rechercher un produit dans ce hanout..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--wall)] border border-[var(--border-warm)] text-xs font-medium text-[var(--ink)]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: 'Tout' },
                  { id: 'epicerie', label: 'Épicerie' },
                  { id: 'frais', label: 'Produits Frais' },
                  { id: 'boulangerie', label: 'Boulangerie' },
                  { id: 'boissons', label: 'Boissons' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCatalogueCategory(c.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors ${
                      catalogueCategory === c.id
                        ? 'bg-[var(--ink)] text-white shadow-xs'
                        : 'bg-[var(--wall)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Principle reminder */}
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Principe de Modération :</strong> L'administrateur ne modifie jamais les prix ou descriptions du commerçant. Il peut uniquement <strong>désactiver un produit</strong> pour motif réglementaire avec notification automatique.
              </span>
            </div>
          </div>

          {/* Products List Table */}
          <div className="p-4 sm:p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-warm)] text-[var(--ink-muted)] pb-2 font-mono">
                    <th className="py-2.5">Produit & Variantes</th>
                    <th className="py-2.5">Catégorie</th>
                    <th className="py-2.5">Prix en DH</th>
                    <th className="py-2.5">Stock Physique / Dispo</th>
                    <th className="py-2.5">Statut Plateforme</th>
                    <th className="py-2.5 text-right">Action Modération</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-warm)]">
                  {storeProducts.map((prod) => {
                    const isDeactivated = prod.isDeactivatedByAdmin || !prod.isActive;
                    const physicalStock = prod.stock;
                    const reservedStock = prod.reservedStock || 0;
                    const availableStock = Math.max(0, physicalStock - reservedStock);

                    return (
                      <tr key={prod.id} className="hover:bg-[var(--wall)]">
                        <td className="py-3">
                          <div className="font-bold text-[var(--ink)] text-sm">{prod.name}</div>
                          {prod.nameAr && (
                            <span className="text-[11px] text-[var(--ink-muted)] font-arabic block">
                              {prod.nameAr}
                            </span>
                          )}
                          {prod.variants && prod.variants.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {prod.variants.map((v) => (
                                <span
                                  key={v.id}
                                  className="px-1.5 py-0.5 rounded bg-[var(--wall)] border border-[var(--border-warm)] text-[10px] text-[var(--ink)] font-mono"
                                >
                                  {v.label} : <strong>{v.price.toFixed(2)} DH</strong> (Stock {v.stock})
                                </span>
                              ))}
                            </div>
                          )}
                        </td>

                        <td className="py-3 capitalize text-[var(--ink-muted)]">
                          {prod.category}
                        </td>

                        <td className="py-3 font-mono font-bold text-sm text-[var(--rust)]">
                          {prod.price.toFixed(2)} DH
                          <span className="text-[10px] font-normal text-[var(--ink-muted)] block">
                            par {prod.unit}
                          </span>
                        </td>

                        {/* Stock Levels: Physical, Reserved, Available */}
                        <td className="py-3 font-mono text-[11px]">
                          <div>
                            Physique : <strong>{physicalStock}</strong>
                          </div>
                          <div className="text-[10px] text-[var(--ink-muted)]">
                            Réservé : {reservedStock} • Dispo :{' '}
                            <strong className="text-emerald-700">{availableStock}</strong>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3">
                          {isDeactivated ? (
                            <div className="space-y-0.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                                Désactivé
                              </span>
                              {prod.deactivationReason && (
                                <span className="text-[10px] text-rose-700 block font-medium">
                                  Motif : {prod.deactivationReason}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Actif au catalogue
                            </span>
                          )}
                        </td>

                        {/* Moderation Button (Never Modify!) */}
                        <td className="py-3 text-right">
                          {isDeactivated ? (
                            <button
                              onClick={() => reactivateProductAdmin(prod.id, store.id)}
                              className="px-2.5 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 cursor-pointer shadow-xs"
                            >
                              Réactiver
                            </button>
                          ) : (
                            <button
                              onClick={() => setDeactivatingProductId(prod.id)}
                              className="px-2.5 py-1.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs cursor-pointer shadow-xs"
                            >
                              Désactiver ce produit
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {storeProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-xs text-[var(--ink-muted)]">
                        Aucun produit trouvé pour ce hanout.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVITÉ & AVIS */}
      {activeTab === 'activite' && (
        <div className="space-y-6">
          {/* Activity KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs">
              <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
                Chiffre d'Affaires Réseau
              </span>
              <span className="text-xl font-extrabold font-mono text-[var(--rust)]">
                {store.kpis.totalRevenueDh.toLocaleString()} DH
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs">
              <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
                Total Commandes
              </span>
              <span className="text-xl font-extrabold font-mono text-[var(--ink)]">
                {store.kpis.totalOrders}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs">
              <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
                Taux d'Annulation
              </span>
              <span className="text-xl font-extrabold font-mono text-emerald-700">
                {store.kpis.cancellationRatePct}%
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs">
              <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
                Délai Moyen Préparation
              </span>
              <span className="text-xl font-extrabold font-mono text-stone-800">
                {store.kpis.avgPrepTimeMin} min
              </span>
            </div>
          </div>

          {/* Reviews Moderation (Mask Review, Never Edit) */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-warm)]">
              <div>
                <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
                  <Star className="w-4 h-4 text-[var(--amber-gold)] fill-[var(--amber-gold)]" />
                  <span>Avis Clients & Modération</span>
                </h3>
                <p className="text-[11px] text-[var(--ink-muted)]">
                  L'administrateur peut masquer un avis abusif ou diffamatoire. Le texte de l'avis n'est jamais altéré.
                </p>
              </div>
              <span className="font-bold text-sm text-[var(--ink)] font-mono">
                Note globale : {store.kpis.rating} / 5
              </span>
            </div>

            <div className="space-y-2.5">
              {storeReviews.map((rev) => {
                const isMasked = rev.isMaskedByAdmin;

                return (
                  <div
                    key={rev.id}
                    className={`p-3.5 rounded-2xl border transition-colors ${
                      isMasked
                        ? 'bg-stone-100 border-stone-300 opacity-60'
                        : 'bg-[var(--wall)] border-[var(--border-warm)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[var(--ink)]">{rev.customerName}</span>
                        <div className="flex text-amber-500 text-xs">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[var(--ink-muted)]">{rev.date}</span>
                        {isMasked ? (
                          <button
                            onClick={() => unmaskReviewAdmin(rev.id, store.id)}
                            className="px-2 py-1 rounded-lg bg-stone-700 text-white text-[10px] font-bold cursor-pointer"
                          >
                            Rétablir l'avis
                          </button>
                        ) : (
                          <button
                            onClick={() => setMaskingReviewId(rev.id)}
                            className="px-2 py-1 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-[10px] font-bold cursor-pointer"
                          >
                            Masquer cet avis
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-[var(--ink)] text-xs mt-1">"{rev.comment}"</p>

                    {isMasked && rev.maskReason && (
                      <div className="mt-1 text-[10px] text-rose-800 font-semibold">
                        ⚠️ Avis masqué par l'admin pour motif : {rev.maskReason}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: KARNA (EXPOSITION TOTALE & COMPTES) */}
      {activeTab === 'karna' && (
        <div className="space-y-4">
          {/* Prominent Total Exposure Banner */}
          <div className="p-6 rounded-3xl bg-[var(--karna-paper)] border-2 border-[var(--border-warm)] shadow-sm text-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-[var(--rust)] uppercase tracking-wider block">
                  Exposition Totale du Carnet Karna
                </span>
                <div className="text-3xl font-extrabold font-mono text-[var(--rust)] mt-1">
                  {store.karnaExposure.totalDebtDh.toLocaleString()} DH
                </div>
                <p className="text-[11px] text-[var(--ink-muted)] mt-0.5">
                  Somme de toutes les créances accordées aux clients du quartier chez ce hanoutier
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 border border-[var(--border-warm)] text-right">
                <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
                  Plafond d'exposition autorisé
                </span>
                <span className="text-lg font-extrabold font-mono text-[var(--ink)]">
                  {store.karnaExposure.maxAllowedExposureDh.toLocaleString()} DH
                </span>
                <span
                  className={`text-[10px] font-bold block mt-0.5 ${
                    store.karnaExposure.isHighRisk ? 'text-rose-700' : 'text-emerald-700'
                  }`}
                >
                  {store.karnaExposure.isHighRisk
                    ? '⚠️ Dépassement de plafond détecté'
                    : '✓ Exposition maîtrisée'}
                </span>
              </div>
            </div>
          </div>

          {/* Karna Accounts List */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
            <h3 className="font-bold text-sm text-[var(--ink)] mb-3">
              Clients inscrits au Carnet Karna ({storeKarnaAccounts.length})
            </h3>

            <div className="divide-y divide-[var(--border-warm)] text-xs">
              {storeKarnaAccounts.map((account) => (
                <div key={account.id} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[var(--ink)] block">{account.clientName}</span>
                    <span className="text-[11px] text-[var(--ink-muted)] font-mono">
                      {account.clientPhone} • Limite autorisée : {account.creditLimitDh} DH
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-extrabold text-sm text-[var(--rust)] block">
                      {account.currentDebtDh.toFixed(2)} DH
                    </span>
                    <span className="text-[10px] text-[var(--ink-muted)]">
                      Dernier ordre : {account.lastOrderDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DÉSACTIVER PRODUIT AVEC MOTIF OBLIGATOIRE */}
      {deactivatingProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in text-xs text-left">
          <form
            onSubmit={handleConfirmProductDeactivation}
            className="w-full max-w-md bg-white rounded-3xl border-2 border-rose-500 shadow-2xl p-6 space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-base font-bold text-rose-800">
                Désactiver le produit du catalogue
              </h3>
              <p className="text-[var(--ink-muted)]">
                L'article sera immédiatement retiré de la vente en ligne. Une notification automatique motivée sera envoyée à Moul Lhanout.
              </p>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Motif réglementaire obligatoire :
              </label>
              <select
                value={productDeactivationReason}
                onChange={(e) => setProductDeactivationReason(e.target.value as ProductAdminDeactivationReason)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-bold text-[var(--ink)]"
              >
                <option value="Contenu inapproprié">Contenu inapproprié</option>
                <option value="Produit interdit">Produit interdit</option>
                <option value="Signalement client">Signalement client</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Précisions pour le commerçant (optionnel) :
              </label>
              <textarea
                value={productDeactivationNotes}
                onChange={(e) => setProductDeactivationNotes(e.target.value)}
                placeholder="Ex. : Lot de denrées périssables signalé par plusieurs clients..."
                rows={3}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-medium text-[var(--ink)]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeactivatingProductId(null)}
                className="px-4 py-2 rounded-xl border border-[var(--border-warm)] cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-700 text-white font-bold cursor-pointer"
              >
                Confirmer la désactivation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: MASQUER AVIS AVEC MOTIF OBLIGATOIRE */}
      {maskingReviewId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in text-xs text-left">
          <form
            onSubmit={handleConfirmReviewMask}
            className="w-full max-w-md bg-white rounded-3xl border-2 border-stone-800 shadow-2xl p-6 space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[var(--ink)]">
                Masquer cet avis client
              </h3>
              <p className="text-[var(--ink-muted)]">
                L'avis sera masqué de la page publique sans que son texte original ne soit modifié.
              </p>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Motif de modération standardisé :
              </label>
              <select
                value={reviewMaskReason}
                onChange={(e) => setReviewMaskReason(e.target.value as ReviewMaskReason)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-bold text-[var(--ink)]"
              >
                <option value="Propos diffamatoires ou injurieux">Propos diffamatoires ou injurieux</option>
                <option value="Faux avis / Spam">Faux avis / Spam</option>
                <option value="Hors sujet">Hors sujet</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Note de modération interne :
              </label>
              <textarea
                value={reviewMaskNotes}
                onChange={(e) => setReviewMaskNotes(e.target.value)}
                placeholder="Raison du signalement..."
                rows={2}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-medium text-[var(--ink)]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMaskingReviewId(null)}
                className="px-4 py-2 rounded-xl border border-[var(--border-warm)] cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[var(--ink)] text-white font-bold cursor-pointer"
              >
                Masquer l'avis
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: SUSPENDRE LE COMMERCE */}
      {isSuspendingStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in text-xs text-left">
          <form
            onSubmit={handleConfirmStoreSuspension}
            className="w-full max-w-lg bg-white rounded-3xl border-2 border-rose-500 shadow-2xl p-6 space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-base font-bold text-rose-800">
                Suspendre le commerce {store.name}
              </h3>
              <p className="text-[var(--ink-muted)]">
                Le hanout ne recevra plus de commandes en ligne. Une notification automatique sera transmise au commerçant.
              </p>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Motif standardisé obligatoire :
              </label>
              <select
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value as MerchantSuspensionReason)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-bold text-[var(--ink)]"
              >
                <option value="Fraude">Fraude</option>
                <option value="Plaintes répétées">Plaintes répétées</option>
                <option value="Produits non conformes">Produits non conformes</option>
                <option value="Documents invalides">Documents invalides</option>
                <option value="Comportement inapproprié">Comportement inapproprié</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">Durée :</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    checked={suspensionDuration === 'temporary_7d'}
                    onChange={() => setSuspensionDuration('temporary_7d')}
                    className="accent-[var(--rust)]"
                  />
                  <span>Temporaire (7 jours)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    checked={suspensionDuration === 'definitive'}
                    onChange={() => setSuspensionDuration('definitive')}
                    className="accent-[var(--rust)]"
                  />
                  <span>Définitive</span>
                </label>
              </div>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Précisions pour notification & audit :
              </label>
              <textarea
                value={suspensionNotes}
                onChange={(e) => setSuspensionNotes(e.target.value)}
                placeholder="Détails du dossier..."
                rows={2}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-medium text-[var(--ink)]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsSuspendingStore(false)}
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
    </div>
  );
};
