import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { AdminTopControlBar } from './AdminCoreScreens';
import { CourierSuspensionReason } from '../../types';
import {
  Bike,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Ban,
  RotateCcw,
  FileText,
  Clock,
  MapPin,
  Phone,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Building,
  AlertCircle,
  XCircle,
  Check,
} from 'lucide-react';

export const AdminCourierDetailScreen: React.FC = () => {
  const {
    adminCouriers,
    selectedAdminCourierId,
    setSelectedAdminCourierId,
    setCurrentScreen,
    orders,
    suspendCourierAdmin,
    reactivateCourierAdmin,
    validateCourierAdmin,
    verifyCourierDocumentAdmin,
  } = useApp();

  const courier = adminCouriers.find((c) => c.id === selectedAdminCourierId) || adminCouriers[0];

  // Active tab: 'profil' | 'missions' | 'incidents'
  const [activeTab, setActiveTab] = useState<'profil' | 'missions' | 'incidents'>('profil');

  // Suspension modal
  const [isSuspending, setIsSuspending] = useState(false);
  const [suspensionReason, setSuspensionReason] =
    useState<CourierSuspensionReason>('Retards répétés');
  const [suspensionNotes, setSuspensionNotes] = useState('');

  // Document verification modal
  const [rejectingDocId, setRejectingDocId] = useState<string | null>(null);
  const [docRejectionReason, setDocRejectionReason] = useState('Document flou ou illisible');

  // Courier missions (orders assigned to this courier)
  const courierMissions = orders.filter(
    (o) => o.courierName && o.courierName.toLowerCase().includes(courier.name.toLowerCase().split(' ')[0])
  );

  const handleConfirmSuspension = (e: React.FormEvent) => {
    e.preventDefault();
    suspendCourierAdmin(courier.id, suspensionReason, suspensionNotes);
    setIsSuspending(false);
    setSuspensionNotes('');
  };

  const handleConfirmDocRejection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingDocId) return;
    verifyCourierDocumentAdmin(courier.id, rejectingDocId, false, docRejectionReason);
    setRejectingDocId(null);
  };

  const hasHighComplaints = courier.incidentsReportedAgainstCourier.length >= 2;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      <AdminTopControlBar />

      {/* Header & Back Button */}
      <div className="space-y-3">
        <button
          onClick={() => setCurrentScreen('admin-couriers')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--rust)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la liste des livreurs & concierges</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] flex items-center justify-center font-extrabold text-xl text-[var(--rust)] shadow-xs">
              {courier.type === 'concierge' ? '🏢' : '🛵'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--ink)]">
                  {courier.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase font-mono bg-sky-100 text-sky-800">
                  {courier.type === 'concierge' ? 'Concierge de quartier' : courier.type === 'employee' ? 'Employé de hanout' : 'Coursier Pro'}
                </span>
                {courier.status === 'active' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Actif & Agréé
                  </span>
                )}
                {courier.status === 'pending' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    En attente vérification
                  </span>
                )}
                {courier.status === 'suspended' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                    Suspendu
                  </span>
                )}
                {hasHighComplaints && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    ⚠️ {courier.incidentsReportedAgainstCourier.length} Plaintes Clients
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--ink-muted)] mt-1 flex flex-wrap items-center gap-2">
                <span>CIN : <strong className="font-mono text-[var(--ink)]">{courier.cin}</strong></span>
                <span>•</span>
                <span>Tél : <strong className="font-mono text-[var(--ink)]">{courier.phone}</strong></span>
                {courier.typeDetails.workZone && (
                  <>
                    <span>•</span>
                    <span>Zone : {courier.typeDetails.workZone}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            {courier.status === 'pending' && (
              <button
                onClick={() => validateCourierAdmin(courier.id, 'Dossier et pièces validés')}
                className="px-4 py-2 rounded-xl bg-[var(--moroccan-green)] hover:bg-[var(--moroccan-green-hover)] text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Valider l'agrément livreur</span>
              </button>
            )}

            {courier.status === 'active' ? (
              <button
                onClick={() => setIsSuspending(true)}
                className="px-4 py-2 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Suspendre le livreur</span>
              </button>
            ) : courier.status === 'suspended' ? (
              <button
                onClick={() => reactivateCourierAdmin(courier.id)}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réactiver le livreur</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border-warm)] pb-1 overflow-x-auto text-xs font-bold">
        {[
          { id: 'profil', label: '1. Profil & Justificatifs', icon: Bike },
          { id: 'missions', label: `2. Missions & Gains (${courier.trustMetrics.totalDeliveries})`, icon: TrendingUp },
          { id: 'incidents', label: `3. Incidents (2 sens) ${hasHighComplaints ? '⚠️' : ''}`, icon: AlertTriangle },
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

      {/* TAB 1: PROFIL & JUSTIFICATIFS */}
      {activeTab === 'profil' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Specific Role Characteristics */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
              <Bike className="w-4 h-4 text-[var(--rust)]" />
              <span>Spécificités selon le Rôle</span>
            </h3>

            <div className="space-y-3">
              {courier.type === 'pro' && (
                <>
                  <div className="p-3 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-1">
                    <span className="text-[11px] text-[var(--ink-muted)] block">Véhicule & Immatriculation :</span>
                    <span className="font-bold text-[var(--ink)] block text-sm">
                      {courier.typeDetails.vehicle || 'Moto standard'}
                    </span>
                    <span className="font-mono text-[11px] text-stone-600 block">
                      Plaque : {courier.typeDetails.plateNumber || 'Non renseignée'}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-1">
                    <span className="text-[11px] text-[var(--ink-muted)] block">Zone d'intervention :</span>
                    <span className="font-bold text-[var(--ink)] block">
                      {courier.typeDetails.workZone || 'Quartier assigné'}
                    </span>
                  </div>
                </>
              )}

              {courier.type === 'concierge' && (
                <div className="p-3.5 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-2">
                  <span className="text-[11px] text-[var(--ink-muted)] block">Immeuble de Rattachement :</span>
                  <span className="font-bold text-[var(--ink)] block text-sm">
                    {courier.typeDetails.residenceBuildingAddress || 'Immeuble du quartier'}
                  </span>
                  <div className="pt-1 flex items-center gap-2">
                    <span className="text-[11px] text-[var(--ink-muted)]">Vérification de résidence :</span>
                    {courier.typeDetails.isResidencyVerified ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        ✓ Résidence vérifiée sur place
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        ⏳ En attente de vérification syndic
                      </span>
                    )}
                  </div>
                </div>
              )}

              {courier.type === 'employee' && (
                <div className="p-3.5 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-1">
                  <span className="text-[11px] text-[var(--ink-muted)] block">Hanout de Rattachement :</span>
                  <span className="font-bold text-[var(--ink)] block text-sm">
                    {courier.typeDetails.attachedStoreName || 'Hanout employeur'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Verification Documents & Moderation */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--rust)]" />
              <span>Pièces Justificatives Soumises ({courier.documents?.length || 0})</span>
            </h3>

            <div className="space-y-2.5">
              {(courier.documents || [
                { id: 'd1', type: 'cin', label: 'Carte d\'Identité Nationale (CIN)', submittedAt: '12/01/2026', status: 'verified' as const },
              ]).map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[var(--ink)] block">{doc.label}</span>
                    <span className="text-[10px] text-[var(--ink-muted)] block">
                      Soumis le : {doc.submittedAt}
                    </span>
                    {doc.rejectionReason && (
                      <span className="text-[10px] text-rose-700 block font-semibold">
                        Motif de rejet : {doc.rejectionReason}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.status === 'verified' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        ✓ Validé
                      </span>
                    )}
                    {doc.status === 'pending' && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => verifyCourierDocumentAdmin(courier.id, doc.id, true)}
                          className="px-2 py-1 rounded-lg bg-emerald-700 text-white font-bold text-[10px] hover:bg-emerald-800 cursor-pointer"
                        >
                          Valider
                        </button>
                        <button
                          onClick={() => setRejectingDocId(doc.id)}
                          className="px-2 py-1 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-[10px] cursor-pointer"
                        >
                          Rejeter
                        </button>
                      </div>
                    )}
                    {doc.status === 'rejected' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                        ✕ Rejeté
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MISSIONS & GAINS */}
      {activeTab === 'missions' && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs">
              <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
                Total Livraisons Effectuées
              </span>
              <span className="text-xl font-extrabold font-mono text-[var(--ink)]">
                {courier.trustMetrics.totalDeliveries}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs">
              <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
                Ponctualité (À l'heure)
              </span>
              <span className="text-xl font-extrabold font-mono text-emerald-700">
                {courier.trustMetrics.onTimeDeliveryRatePct}%
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs">
              <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
                Gains Totaux Cumulés
              </span>
              <span className="text-xl font-extrabold font-mono text-[var(--rust)]">
                {(courier.trustMetrics.totalEarningsDh || 1850).toFixed(2)} DH
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs">
              <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
                Gains du Mois en Cours
              </span>
              <span className="text-xl font-extrabold font-mono text-stone-800">
                {(courier.trustMetrics.monthlyEarningsDh || 890).toFixed(2)} DH
              </span>
            </div>
          </div>

          {/* Missions History */}
          <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
            <h3 className="font-bold text-sm text-[var(--ink)] mb-3">
              Historique des Courses Rattachées
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--border-warm)] text-[var(--ink-muted)] pb-2 font-mono">
                    <th className="py-2.5">N° Commande</th>
                    <th className="py-2.5">Hanoutier</th>
                    <th className="py-2.5">Client & Quartier</th>
                    <th className="py-2.5">Montant Course</th>
                    <th className="py-2.5">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-warm)]">
                  {courierMissions.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[var(--wall)]">
                      <td className="py-2.5 font-mono font-bold text-[var(--rust)]">
                        {ord.orderNumber}
                      </td>
                      <td className="py-2.5 font-bold text-[var(--ink)]">{ord.storeName}</td>
                      <td className="py-2.5">
                        {ord.customerName} ({ord.customerAddress.slice(0, 20)}...)
                      </td>
                      <td className="py-2.5 font-mono font-bold text-[var(--ink)]">
                        {ord.deliveryFeeDh > 0 ? `${ord.deliveryFeeDh.toFixed(2)} DH` : 'Gratuit'}
                      </td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {courierMissions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-xs text-[var(--ink-muted)]">
                        Aucune mission récente trouvée pour ce livreur.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INCIDENTS (DISTINCTION STRICTE DES 2 SENS) */}
      {activeTab === 'incidents' && (
        <div className="space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SENS 1: INCIDENTS SIGNALÉS PAR LE LIVREUR */}
            <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-warm)]">
                <div>
                  <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-1.5">
                    <span>1. Incidents signalés PAR le livreur</span>
                  </h3>
                  <p className="text-[11px] text-[var(--ink-muted)]">
                    Difficultés rencontrées sur le terrain (adresse introuvable, client absent, panne)
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-[var(--wall)]">
                  {courier.incidentsByCourier.length}
                </span>
              </div>

              <div className="space-y-2">
                {courier.incidentsByCourier.map((inc) => (
                  <div key={inc.id} className="p-3 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-1">
                    <div className="flex justify-between font-mono font-bold text-[11px]">
                      <span className="text-[var(--rust)]">Cmd {inc.orderNumber}</span>
                      <span className="text-[var(--ink-muted)]">{inc.date}</span>
                    </div>
                    <span className="font-bold text-[var(--ink)] block">
                      Motif : {inc.reason === 'client_absent' ? 'Client injoignable' : inc.reason === 'panne' ? 'Panne mécanique' : inc.reason}
                    </span>
                    <p className="text-[11px] text-stone-600">{inc.details}</p>
                  </div>
                ))}
                {courier.incidentsByCourier.length === 0 && (
                  <div className="p-4 text-center text-[var(--ink-muted)] italic">
                    Aucun incident terrain signalé par ce livreur.
                  </div>
                )}
              </div>
            </div>

            {/* SENS 2: INCIDENTS SIGNALÉS CONTRE LE LIVREUR PAR DES CLIENTS */}
            <div className="p-5 rounded-3xl bg-rose-50/60 border border-rose-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                <div>
                  <h3 className="font-bold text-sm text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>2. Plaintes signalées CONTRE le livreur</span>
                  </h3>
                  <p className="text-[11px] text-rose-700">
                    Réclamations formulées par les clients (retard excessif, colis abîmé, impoli)
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-rose-200 text-rose-900">
                  {courier.incidentsReportedAgainstCourier.length}
                </span>
              </div>

              <div className="space-y-2">
                {courier.incidentsReportedAgainstCourier.map((inc) => (
                  <div key={inc.id} className="p-3 rounded-2xl bg-white border border-rose-300 space-y-1">
                    <div className="flex justify-between font-bold text-[11px]">
                      <span className="text-rose-800">Par : {inc.clientName} (Cmd {inc.orderNumber})</span>
                      <span className="text-[10px] font-mono text-stone-500">{inc.date}</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase inline-block bg-rose-100 text-rose-900">
                      {inc.reason === 'colis_abime' ? 'Colis abîmé' : inc.reason === 'retard_excessif' ? 'Retard excessif' : 'Comportement'}
                    </span>
                    <p className="text-[11px] text-rose-950 font-medium">{inc.details}</p>
                  </div>
                ))}
                {courier.incidentsReportedAgainstCourier.length === 0 && (
                  <div className="p-4 text-center text-emerald-800 font-semibold">
                    ✓ Aucune réclamation client enregistrée contre ce livreur.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUSPENDRE LE LIVREUR */}
      {isSuspending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in text-xs text-left">
          <form
            onSubmit={handleConfirmSuspension}
            className="w-full max-w-lg bg-white rounded-3xl border-2 border-rose-500 shadow-2xl p-6 space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-base font-bold text-rose-800">
                Suspendre le Livreur {courier.name}
              </h3>
              <p className="text-[var(--ink-muted)]">
                Le coursier ne recevra plus de propositions de courses. Une notification automatique lui sera transmise.
              </p>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Motif réglementaire standardisé (Livreurs) :
              </label>
              <select
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value as CourierSuspensionReason)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-bold text-[var(--ink)]"
              >
                <option value="Incident de sécurité">Incident de sécurité</option>
                <option value="Retards répétés">Retards répétés</option>
                <option value="Fraude (fausse confirmation de livraison)">Fraude (fausse confirmation de livraison)</option>
                <option value="Comportement inapproprié">Comportement inapproprié</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Précisions pour le dossier de modération :
              </label>
              <textarea
                value={suspensionNotes}
                onChange={(e) => setSuspensionNotes(e.target.value)}
                placeholder="Détails du motif..."
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
                Confirmer la suspension
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: REJETER UN DOCUMENT AVEC MOTIF OBLIGATOIRE */}
      {rejectingDocId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in text-xs text-left">
          <form
            onSubmit={handleConfirmDocRejection}
            className="w-full max-w-md bg-white rounded-3xl border-2 border-rose-500 shadow-2xl p-6 space-y-4"
          >
            <h3 className="text-base font-bold text-rose-800">
              Rejeter la pièce justificative
            </h3>
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Motif obligatoire du rejet :
              </label>
              <select
                value={docRejectionReason}
                onChange={(e) => setDocRejectionReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-bold text-[var(--ink)]"
              >
                <option value="Document flou ou illisible">Document flou ou illisible</option>
                <option value="Document expiré">Document expiré</option>
                <option value="Identité non correspondante avec le compte">Identité non correspondante</option>
                <option value="Attestation de résidence non tamponnée par le syndic">Attestation non tamponnée syndic</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectingDocId(null)}
                className="px-4 py-2 rounded-xl border border-[var(--border-warm)] cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-700 text-white font-bold cursor-pointer"
              >
                Confirmer le rejet
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
