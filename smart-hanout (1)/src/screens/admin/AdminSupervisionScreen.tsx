import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { AdminTopControlBar } from './AdminCoreScreens';
import { Order, OrderStatus } from '../../types';
import {
  MapPin,
  Clock,
  Phone,
  ShoppingBag,
  Store as StoreIcon,
  Bike,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Eye,
  RefreshCw,
  FileText,
  Printer,
  User,
  Navigation,
  Sparkles,
  ShieldAlert,
  Check,
  Radio,
  Camera,
  PenTool,
  Send,
  MessageCircle,
  DollarSign,
  TrendingUp,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const AdminOrdersScreen: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    reassignOrderCourier,
    resolveOrderAlert,
    flagOrderAlert,
    cancelOrderAdmin,
    adminCouriers,
    adminClients,
    setSelectedAdminMerchantId,
    setSelectedAdminClientId,
    setSelectedAdminCourierId,
    setCurrentScreen,
    currentAdminRole,
  } = useApp();

  // State management
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [originFilter, setOriginFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'list' | 'radar'>('list');

  // Inspection & Interaction Modals
  const [inspectedOrder, setInspectedOrder] = useState<Order | null>(null);
  const [reassignModalOrder, setReassignModalOrder] = useState<Order | null>(null);
  const [selectedNewCourierId, setSelectedNewCourierId] = useState<string>('');
  const [contactModalData, setContactModalData] = useState<{
    targetName: string;
    role: 'client' | 'merchant' | 'courier';
    phone: string;
    orderNum: string;
  } | null>(null);
  const [cancelModalOrder, setCancelModalOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState<string>(
    'Client injoignable après 3 tentatives et 20 minutes d\'attente'
  );
  const [showPrintReceipt, setShowPrintReceipt] = useState<Order | null>(null);
  const [customAlertNote, setCustomAlertNote] = useState<string>('');
  const [isInjectingAlert, setIsInjectingAlert] = useState<boolean>(false);

  // Active Radar Selected Courier/Order
  const [radarSelectedOrderId, setRadarSelectedOrderId] = useState<string>('ord-101');

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      // City filter
      const matchesCity =
        selectedCity === 'all' ||
        (ord.city && ord.city.toLowerCase() === selectedCity.toLowerCase());

      // Status filter
      let matchesStatus = true;
      if (statusFilter === 'alerts') {
        matchesStatus = !!ord.alertFlag;
      } else if (statusFilter === 'in_progress') {
        matchesStatus = ord.status === 'out_for_delivery';
      } else if (statusFilter === 'preparing') {
        matchesStatus = ord.status === 'preparing';
      } else if (statusFilter === 'unassigned') {
        matchesStatus = ord.status === 'pending' || !ord.courierName;
      } else if (statusFilter === 'delivered') {
        matchesStatus = ord.status === 'delivered';
      }

      // Origin filter
      let matchesOrigin = true;
      if (originFilter !== 'all') {
        matchesOrigin = ord.orderOrigin === originFilter;
      }

      // Payment filter
      let matchesPayment = true;
      if (paymentFilter !== 'all') {
        matchesPayment = ord.paymentMethod === paymentFilter;
      }

      // Search Query
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        ord.orderNumber.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q) ||
        ord.storeName.toLowerCase().includes(q) ||
        ord.customerAddress.toLowerCase().includes(q) ||
        (ord.courierName && ord.courierName.toLowerCase().includes(q));

      return matchesCity && matchesStatus && matchesOrigin && matchesPayment && matchesSearch;
    });
  }, [orders, selectedCity, statusFilter, originFilter, paymentFilter, searchQuery]);

  // Aggregate metrics for supervisor bar
  const totalOrdersCount = orders.length;
  const preparingCount = orders.filter((o) => o.status === 'preparing').length;
  const inDeliveryCount = orders.filter((o) => o.status === 'out_for_delivery').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
  const alertsCount = orders.filter((o) => !!o.alertFlag).length;
  const totalGmvDh = orders.reduce((sum, o) => sum + o.totalDh, 0);
  const totalKarnaDh = orders
    .filter((o) => o.paymentMethod === 'karna')
    .reduce((sum, o) => sum + o.totalDh, 0);

  // Available couriers for reassignment
  const availableCouriersList = [
    {
      name: 'Hamza El Fassi (Moto 103)',
      phone: '+212 6 54 21 88 90',
      type: 'pro' as const,
      zone: 'Casablanca (Bourgogne - Gauthier)',
      distanceEta: '3 min',
    },
    {
      name: 'Simo (Concierge Immeuble)',
      phone: '+212 6 60 11 22 33',
      type: 'concierge' as const,
      zone: 'Bourgogne (Résidence)',
      distanceEta: '1 min à pied',
    },
    {
      name: 'Rachid Mounir (Vélo Beldi)',
      phone: '+212 6 77 44 22 10',
      type: 'pro' as const,
      zone: 'Rabat (Agdal - Hassan)',
      distanceEta: '5 min',
    },
    {
      name: 'Amine Kabbaj (Scooter Express)',
      phone: '+212 6 71 88 44 99',
      type: 'pro' as const,
      zone: 'Marrakech (Guéliz)',
      distanceEta: '4 min',
    },
  ];

  // Reassignment action
  const handleConfirmReassignment = () => {
    if (!reassignModalOrder || !selectedNewCourierId) return;
    const targetCourier = availableCouriersList.find((c) => c.name === selectedNewCourierId);
    if (targetCourier) {
      reassignOrderCourier(
        reassignModalOrder.id,
        targetCourier.name,
        targetCourier.phone,
        targetCourier.type
      );
    }
    setReassignModalOrder(null);
    setSelectedNewCourierId('');
  };

  // Status fast-forward
  const handleAdvanceStatus = (ord: Order) => {
    if (ord.status === 'pending') {
      updateOrderStatus(ord.id, 'preparing');
    } else if (ord.status === 'preparing') {
      updateOrderStatus(ord.id, 'out_for_delivery');
    } else if (ord.status === 'out_for_delivery') {
      updateOrderStatus(ord.id, 'delivered');
    }
  };

  // Custom Alert Trigger
  const handleTriggerCustomAlert = (orderId: string) => {
    if (!customAlertNote.trim()) return;
    flagOrderAlert(orderId, {
      type: 'delay',
      message: customAlertNote,
      severity: 'warning',
    });
    setCustomAlertNote('');
    setIsInjectingAlert(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      {/* Central Navigation & Role Bar */}
      <AdminTopControlBar />

      {/* Main Title & Live Connection Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Live Radar National Connecté
            </span>
            <span className="text-xs text-[var(--ink-muted)]">
              • Mise à jour continue (Casablanca, Rabat, Marrakech)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
            Tour de Contrôle & Supervision des Commandes
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Dispatch en temps réel, affectation de livreurs de secours, contrôle du Karna et résolution d'incidents
          </p>
        </div>

        {/* View Switcher Tabs (Liste vs Radar Map) */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] self-start md:self-auto">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'list'
                ? 'bg-white text-[var(--ink)] shadow-xs'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[var(--rust)]" />
            <span>Flux des Commandes ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'radar'
                ? 'bg-[var(--rust)] text-white shadow-xs'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Radar GPS Flotte & Villes</span>
          </button>
        </div>
      </div>

      <MoroccanStarBorder />

      {/* Top Operations KPI Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Orders */}
        <div className="p-3.5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs">
          <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
            Commandes (Jour)
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-extrabold font-mono text-[var(--ink)]">
              {totalOrdersCount}
            </span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1 py-0.5 rounded">
              100% actifs
            </span>
          </div>
        </div>

        {/* In Preparation */}
        <div
          onClick={() => setStatusFilter(statusFilter === 'preparing' ? 'all' : 'preparing')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
            statusFilter === 'preparing'
              ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300'
              : 'bg-white border-[var(--border-warm)] hover:border-amber-300'
          }`}
        >
          <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
            En Préparation
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-extrabold font-mono text-amber-700">
              {preparingCount}
            </span>
            <span className="text-[10px] text-stone-500 font-medium">aux hanouts</span>
          </div>
        </div>

        {/* Out for Delivery */}
        <div
          onClick={() => setStatusFilter(statusFilter === 'in_progress' ? 'all' : 'in_progress')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
            statusFilter === 'in_progress'
              ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300'
              : 'bg-white border-[var(--border-warm)] hover:border-sky-300'
          }`}
        >
          <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
            En Route (Livreurs)
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-extrabold font-mono text-sky-700">
              {inDeliveryCount}
            </span>
            <span className="text-[10px] text-stone-500 font-medium">GPS actif</span>
          </div>
        </div>

        {/* Delivered Today */}
        <div
          onClick={() => setStatusFilter(statusFilter === 'delivered' ? 'all' : 'delivered')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
            statusFilter === 'delivered'
              ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300'
              : 'bg-white border-[var(--border-warm)] hover:border-emerald-300'
          }`}
        >
          <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
            Livrées & Réglées
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-extrabold font-mono text-emerald-700">
              {deliveredCount}
            </span>
            <span className="text-[10px] text-stone-500 font-medium">100% conformes</span>
          </div>
        </div>

        {/* SLA Alerts / Incidents */}
        <div
          onClick={() => setStatusFilter(statusFilter === 'alerts' ? 'all' : 'alerts')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
            statusFilter === 'alerts'
              ? 'bg-rose-100 border-rose-500 ring-2 ring-rose-400'
              : alertsCount > 0
              ? 'bg-rose-50 border-rose-300 hover:border-rose-400'
              : 'bg-white border-[var(--border-warm)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-rose-800 uppercase block font-bold">
              Alertes SLA
            </span>
            {alertsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            )}
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-extrabold font-mono text-rose-800">
              {alertsCount}
            </span>
            <span className="text-[10px] text-rose-700 font-bold">
              {alertsCount > 0 ? 'Action requise' : 'Aucune'}
            </span>
          </div>
        </div>

        {/* Total GMV & Karna Volume */}
        <div className="p-3.5 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] shadow-xs">
          <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block">
            Volume Total du Jour
          </span>
          <div className="mt-1">
            <span className="text-base font-extrabold font-mono text-[var(--rust)] block leading-tight">
              {totalGmvDh.toFixed(2)} DH
            </span>
            <span className="text-[10px] text-[var(--ink-muted)] block">
              Karna : <span className="font-bold text-[var(--rust)]">{totalKarnaDh.toFixed(2)} DH</span>
            </span>
          </div>
        </div>
      </div>

      {/* VIEW 1: RADAR MAP VISUALIZER */}
      {activeTab === 'radar' && (
        <div className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[var(--rust)]" />
                <span>Radar Tactique des Équipes & Livraisons</span>
              </h2>
              <p className="text-xs text-[var(--ink-muted)]">
                Localisation en direct des hanouts, coursiers et points de remise
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--wall)] border border-[var(--border-warm)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--rust)]" />
                <span>Hanouts Partenaires</span>
              </span>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--wall)] border border-[var(--border-warm)]">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse" />
                <span>Livreurs en Mouvement</span>
              </span>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--wall)] border border-[var(--border-warm)]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>Clients Destinataires</span>
              </span>
            </div>
          </div>

          {/* Interactive SVG Radar Map */}
          <div className="relative w-full h-[360px] rounded-2xl bg-[#EDE4D0] border-2 border-[var(--border-warm)] overflow-hidden flex items-center justify-center">
            {/* Map Background Grid & Roads Pattern */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DAC9B0" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Main Boulevards simulation (Casablanca / Rabat) */}
              <line x1="50" y1="180" x2="850" y2="180" stroke="#C4B093" strokeWidth="6" />
              <line x1="280" y1="40" x2="280" y2="340" stroke="#C4B093" strokeWidth="5" />
              <line x1="600" y1="40" x2="600" y2="340" stroke="#C4B093" strokeWidth="4" />
              <line x1="100" y1="80" x2="780" y2="300" stroke="#C4B093" strokeWidth="3" strokeDasharray="4 2" />
            </svg>

            {/* Neighborhood Labels */}
            <div className="absolute top-4 left-6 text-[11px] font-bold font-mono text-stone-500 uppercase tracking-widest pointer-events-none">
              Casablanca • Bourgogne / Gauthier
            </div>
            <div className="absolute top-4 right-6 text-[11px] font-bold font-mono text-stone-500 uppercase tracking-widest pointer-events-none">
              Rabat • Agdal / Hassan
            </div>
            <div className="absolute bottom-4 left-6 text-[11px] font-bold font-mono text-stone-500 uppercase tracking-widest pointer-events-none">
              Marrakech • Guéliz
            </div>

            {/* Node 1: Hanout Ba Driss */}
            <div
              className="absolute left-[260px] top-[140px] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              onClick={() => setRadarSelectedOrderId('ord-101')}
            >
              <div className="w-10 h-10 rounded-2xl bg-[var(--rust)] text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                <StoreIcon className="w-5 h-5" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[var(--chalkboard)] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                Hanout Ba Driss (Casablanca)
              </div>
            </div>

            {/* Node 2: Courier Hamza (Moto 103) - Moving */}
            <div
              className="absolute left-[360px] top-[180px] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20 animate-pulse"
              onClick={() => setRadarSelectedOrderId('ord-101')}
            >
              <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-125 transition-transform">
                <Bike className="w-4 h-4" />
              </div>
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-sky-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap flex items-center gap-1">
                <span>🏍️ Hamza • 28 km/h</span>
              </div>
            </div>

            {/* Route Line between Ba Driss and Karim destination */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="260"
                y1="140"
                x2="480"
                y2="210"
                stroke="#1D5D8A"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
            </svg>

            {/* Node 3: Customer Karim Bennani Destination */}
            <div
              className="absolute left-[480px] top-[210px] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              onClick={() => setRadarSelectedOrderId('ord-101')}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-[var(--ink)] border border-[var(--border-warm)] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs whitespace-nowrap">
                Karim Bennani (ETA 6m)
              </div>
            </div>

            {/* Node 4: Rabat Si Mohamed */}
            <div
              className="absolute right-[180px] top-[100px] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              onClick={() => setRadarSelectedOrderId('ord-104')}
            >
              <div className="w-9 h-9 rounded-2xl bg-[var(--amber-gold)] text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                <StoreIcon className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[var(--chalkboard)] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                Épicerie Al Amal (Rabat)
              </div>
            </div>

            {/* Node 5: Courier Rachid (Vélo Agdal) */}
            <div
              className="absolute right-[120px] top-[160px] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              onClick={() => setRadarSelectedOrderId('ord-104')}
            >
              <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md border-2 border-white animate-bounce">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-rose-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                ⚠️ Retard Prépa (+12m)
              </div>
            </div>
          </div>

          {/* Quick Selected Order Drawer on Radar */}
          {(() => {
            const radOrd = orders.find((o) => o.id === radarSelectedOrderId) || orders[0];
            return (
              <div className="p-4 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[var(--rust)]">
                      {radOrd.orderNumber}
                    </span>
                    <span className="text-xs font-bold text-[var(--ink)]">
                      {radOrd.customerName}
                    </span>
                    <span className="text-[11px] text-[var(--ink-muted)]">
                      ({radOrd.customerAddress})
                    </span>
                  </div>
                  <div className="text-xs text-[var(--ink-muted)] flex items-center gap-3">
                    <span>
                      Hanout : <strong className="text-[var(--ink)]">{radOrd.storeName}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Livreur :{' '}
                      <strong className="text-[var(--ink)]">{radOrd.courierName || 'Non assigné'}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Total :{' '}
                      <strong className="text-[var(--rust)] font-mono">{radOrd.totalDh.toFixed(2)} DH</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInspectedOrder(radOrd)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[var(--border-warm)] text-xs font-bold text-[var(--ink)] hover:bg-[var(--wall-dark)] cursor-pointer"
                  >
                    Ouvrir Fiche Complète
                  </button>
                  <button
                    onClick={() => setReassignModalOrder(radOrd)}
                    className="px-3 py-1.5 rounded-xl bg-[var(--rust)] text-white text-xs font-bold hover:bg-[var(--rust-hover)] shadow-xs cursor-pointer"
                  >
                    Réaffecter Livreur
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* FILTER & CONTROL PANEL */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par N° commande, client, hanoutier, quartier ou téléphone..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] text-xs font-medium text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--rust)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>

          {/* City Slicer */}
          <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 lg:pb-0">
            <span className="text-[11px] font-bold text-[var(--ink-muted)] whitespace-nowrap pl-1">
              Ville :
            </span>
            {[
              { id: 'all', label: 'Toutes les villes' },
              { id: 'casablanca', label: 'Casablanca' },
              { id: 'rabat', label: 'Rabat' },
              { id: 'marrakech', label: 'Marrakech' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCity(c.id)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCity === c.id
                    ? 'bg-[var(--ink)] text-white shadow-xs'
                    : 'bg-[var(--wall)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--border-warm)] text-xs">
          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-[var(--ink-muted)]">Statut :</span>
            {[
              { id: 'all', label: `Tout (${orders.length})` },
              { id: 'alerts', label: `🚨 Alertes SLA (${alertsCount})` },
              { id: 'preparing', label: `🍳 En prépa (${preparingCount})` },
              { id: 'in_progress', label: `🛵 En livraison (${inDeliveryCount})` },
              { id: 'delivered', label: `✅ Livrées (${deliveredCount})` },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setStatusFilter(s.id)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  statusFilter === s.id
                    ? s.id === 'alerts'
                      ? 'bg-rose-700 text-white shadow-xs'
                      : 'bg-[var(--rust)] text-white shadow-xs'
                    : 'bg-[var(--wall)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Order Origin Filter (3 Ways to Order) */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[var(--ink-muted)]">Méthode client :</span>
            {[
              { id: 'all', label: 'Toutes' },
              { id: 'catalog', label: '🛒 Catalogue' },
              { id: 'text_list', label: '✍️ Texte tapé' },
              { id: 'photo_list', label: '📷 Photo dar' },
            ].map((o) => (
              <button
                key={o.id}
                onClick={() => setOriginFilter(o.id)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  originFilter === o.id
                    ? 'bg-[var(--ink)] text-white shadow-xs'
                    : 'bg-[var(--wall)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          {/* Payment Method Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[var(--ink-muted)]">Paiement :</span>
            {[
              { id: 'all', label: 'Tout' },
              { id: 'karna', label: '📖 Karna' },
              { id: 'cod', label: '💵 Espèces' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPaymentFilter(p.id)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  paymentFilter === p.id
                    ? 'bg-[var(--ink)] text-white shadow-xs'
                    : 'bg-[var(--wall)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ORDERS MASTER SUPERVISION TABLE */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-warm)]">
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-sm sm:text-base text-[var(--ink)]">
              File Active des Commandes en Supervision
            </h2>
            <span className="text-xs font-mono font-bold text-[var(--ink-muted)]">
              ({filteredOrders.length} résultat{filteredOrders.length > 1 ? 's' : ''})
            </span>
          </div>

          {/* Fast Refresh Simulation */}
          <button
            onClick={() => {
              // Quick alert simulator to demonstrate live supervision responsiveness
              const randomOrd = orders.find((o) => !o.alertFlag);
              if (randomOrd) {
                flagOrderAlert(randomOrd.id, {
                  type: 'delay',
                  message: 'Alerte automatique : temps de préparation dépassé (+15 min).',
                  severity: 'warning',
                });
              }
            }}
            className="text-xs text-[var(--rust)] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Simuler alerte terrain</span>
          </button>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border-warm)] text-[var(--ink-muted)] pb-2 font-mono">
                <th className="py-2.5">N° / Origine</th>
                <th className="py-2.5">Hanout & Ville</th>
                <th className="py-2.5">Client & Contact</th>
                <th className="py-2.5">Montant & Mode</th>
                <th className="py-2.5">Livreur & Véhicule</th>
                <th className="py-2.5">Statut & SLA</th>
                <th className="py-2.5 text-right">Intervention Directe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-warm)]">
              {filteredOrders.map((ord) => {
                const hasAlert = !!ord.alertFlag;

                return (
                  <tr
                    key={ord.id}
                    className={`transition-colors ${
                      hasAlert ? 'bg-rose-50/70 hover:bg-rose-50' : 'hover:bg-[var(--wall)]'
                    }`}
                  >
                    {/* Order Number & Origin Badge */}
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-sm text-[var(--rust)]">
                          {ord.orderNumber}
                        </span>
                        {hasAlert && (
                          <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                        )}
                      </div>

                      {/* 3 Ordering Methods Visual Badge */}
                      <div className="mt-1">
                        {ord.orderOrigin === 'text_list' && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                            <PenTool className="w-2.5 h-2.5" />
                            <span>Texte libre</span>
                          </span>
                        )}
                        {ord.orderOrigin === 'photo_list' && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-200">
                            <Camera className="w-2.5 h-2.5" />
                            <span>Photo dar</span>
                          </span>
                        )}
                        {(!ord.orderOrigin || ord.orderOrigin === 'catalog') && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700">
                            <ShoppingBag className="w-2.5 h-2.5" />
                            <span>Catalogue</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[var(--ink-muted)] block font-mono mt-0.5">
                        {ord.createdAt}
                      </span>
                    </td>

                    {/* Store & City */}
                    <td className="py-3">
                      <div className="font-bold text-[var(--ink)] flex items-center gap-1">
                        <span>{ord.storeName}</span>
                      </div>
                      <div className="text-[11px] text-[var(--ink-muted)] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[var(--rust)]" />
                        <span>
                          {ord.neighborhood ? `${ord.neighborhood}, ` : ''}
                          <strong>{ord.city || 'Casablanca'}</strong>
                        </span>
                      </div>
                    </td>

                    {/* Customer & Phone */}
                    <td className="py-3">
                      <div className="font-bold text-[var(--ink)]">{ord.customerName}</div>
                      <div className="text-[11px] font-mono text-[var(--ink-muted)]">
                        {ord.customerPhone}
                      </div>
                      <div className="text-[10px] text-stone-500 truncate max-w-[150px]">
                        {ord.customerAddress}
                      </div>
                    </td>

                    {/* Total & Payment Method */}
                    <td className="py-3 font-mono">
                      <div className="font-bold text-sm text-[var(--ink)]">
                        {ord.totalDh.toFixed(2)} DH
                      </div>
                      <div className="mt-0.5">
                        {ord.paymentMethod === 'karna' ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[var(--karna-paper)] text-[var(--rust)] border border-[var(--border-warm)]">
                            📖 Karna (Crédit)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            💵 Espèces (COD)
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Assigned Courier */}
                    <td className="py-3">
                      {ord.courierName ? (
                        <div className="space-y-0.5">
                          <div className="font-bold text-[var(--ink)] flex items-center gap-1">
                            <Bike className="w-3.5 h-3.5 text-sky-700" />
                            <span>{ord.courierName}</span>
                          </div>
                          <div className="text-[10px] font-mono text-[var(--ink-muted)]">
                            {ord.courierPhone}
                          </div>
                          <span className="text-[9px] uppercase px-1 py-0.5 rounded font-mono font-bold bg-sky-50 text-sky-800">
                            {ord.courierType === 'concierge' ? '🏢 Concierge' : '🛵 Pro'}
                          </span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          Non assigné
                        </span>
                      )}
                    </td>

                    {/* Status & SLA Alert Flag */}
                    <td className="py-3">
                      {ord.status === 'out_for_delivery' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
                          En route (ETA {ord.etaMinutes}m)
                        </span>
                      )}
                      {ord.status === 'preparing' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 inline-flex items-center gap-1">
                          En préparation
                        </span>
                      )}
                      {ord.status === 'pending' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-800 inline-flex items-center gap-1">
                          En attente dispatch
                        </span>
                      )}
                      {ord.status === 'delivered' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 inline-flex items-center gap-1">
                          ✓ Livrée
                        </span>
                      )}
                      {ord.status === 'cancelled' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 inline-flex items-center gap-1">
                          ✕ Annulée
                        </span>
                      )}

                      {/* Display Alert Reason if exists */}
                      {ord.alertFlag && (
                        <div className="mt-1 p-1.5 rounded-lg bg-rose-100/90 border border-rose-300 text-[10px] text-rose-900 font-semibold space-y-1">
                          <div className="flex items-center gap-1 text-rose-800 font-bold">
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                            <span>{ord.alertFlag.message}</span>
                          </div>
                          <button
                            onClick={() => resolveOrderAlert(ord.id)}
                            className="text-[9px] text-rose-800 underline font-bold hover:text-rose-950 block cursor-pointer"
                          >
                            ✓ Marquer comme résolu
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Direct Intervention Action Buttons */}
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        {/* Inspect Details */}
                        <button
                          onClick={() => setInspectedOrder(ord)}
                          title="Inspecter la fiche de commande"
                          className="p-1.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] hover:bg-white text-[var(--ink)] cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Reassign Courier */}
                        <button
                          onClick={() => {
                            setReassignModalOrder(ord);
                            setSelectedNewCourierId(availableCouriersList[0].name);
                          }}
                          title="Réaffecter un coursier"
                          className="p-1.5 rounded-xl border border-sky-300 bg-sky-50 text-sky-800 hover:bg-sky-100 cursor-pointer"
                        >
                          <Bike className="w-3.5 h-3.5" />
                        </button>

                        {/* Direct Call Dialog */}
                        <button
                          onClick={() =>
                            setContactModalData({
                              targetName: ord.customerName,
                              role: 'client',
                              phone: ord.customerPhone,
                              orderNum: ord.orderNumber,
                            })
                          }
                          title="Contacter le client ou le hanout"
                          className="p-1.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </button>

                        {/* Fast forward status */}
                        {ord.status !== 'delivered' && ord.status !== 'cancelled' && (
                          <button
                            onClick={() => handleAdvanceStatus(ord)}
                            title="Avancer manuellement le statut"
                            className="px-2 py-1 rounded-xl bg-[var(--ink)] text-white text-[10px] font-bold hover:bg-black cursor-pointer"
                          >
                            Avancer
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-[var(--ink-muted)]">
                    Aucune commande ne correspond aux filtres sélectionnés.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: INSPECTION COMPLÈTE & FICHE D'INTERVENTION */}
      {inspectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in text-xs text-left">
          <div className="w-full max-w-3xl bg-white rounded-3xl border border-[var(--border-warm)] shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[var(--border-warm)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-[var(--rust)] uppercase">
                    Fiche de Supervision Opérationnelle
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--wall-dark)] font-bold">
                    {inspectedOrder.city || 'Casablanca'} • {inspectedOrder.neighborhood || 'Centre'}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[var(--ink)] mt-0.5">
                  Commande {inspectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setInspectedOrder(null)}
                className="p-1.5 text-stone-400 hover:text-black font-bold text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* 3-Way Order Source Banner if applicable */}
            {inspectedOrder.orderOrigin === 'text_list' && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 space-y-1.5">
                <span className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                  <PenTool className="w-3.5 h-3.5 text-amber-700" />
                  <span>Origine de la commande : Liste manuscrite libre tapée par le client</span>
                </span>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200 font-mono text-[11px] text-[var(--ink)] italic">
                  "{inspectedOrder.originalText}"
                </div>
                <p className="text-[10px] text-amber-800">
                  Correspondance et prix gelés au moment de la validation par le client.
                </p>
              </div>
            )}

            {inspectedOrder.orderOrigin === 'photo_list' && (
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-300 space-y-2">
                <span className="font-bold text-purple-900 flex items-center gap-1.5 text-xs">
                  <Camera className="w-3.5 h-3.5 text-purple-700" />
                  <span>Origine de la commande : Photo de liste manuscrite (Dar)</span>
                </span>
                <div className="flex items-center gap-3">
                  {inspectedOrder.photoUrl && (
                    <img
                      src={inspectedOrder.photoUrl}
                      alt="Liste manuscrite"
                      className="w-24 h-16 object-cover rounded-lg border border-purple-200"
                    />
                  )}
                  <div className="text-[11px] text-purple-950 font-mono">
                    {inspectedOrder.originalText}
                  </div>
                </div>
              </div>
            )}

            {/* SLA Alert details if present */}
            {inspectedOrder.alertFlag && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 space-y-1 text-rose-900">
                <span className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Alerte Opérationnelle Détectée :</span>
                </span>
                <p className="text-xs">{inspectedOrder.alertFlag.message}</p>
                <div className="pt-1 flex gap-2">
                  <button
                    onClick={() => {
                      resolveOrderAlert(inspectedOrder.id);
                      setInspectedOrder({ ...inspectedOrder, alertFlag: undefined });
                    }}
                    className="px-3 py-1 rounded-xl bg-rose-700 text-white font-bold text-[10px] cursor-pointer"
                  >
                    ✓ Lever l'alerte
                  </button>
                  <button
                    onClick={() => {
                      setReassignModalOrder(inspectedOrder);
                      setInspectedOrder(null);
                    }}
                    className="px-3 py-1 rounded-xl bg-white border border-rose-300 text-rose-800 font-bold text-[10px] cursor-pointer"
                  >
                    Envoyer livreur de secours
                  </button>
                </div>
              </div>
            )}

            {/* 3-Party Contacts Grid (Hanout, Client, Livreur) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Hanout */}
              <div className="p-3.5 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-1.5">
                <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block font-bold">
                  Commerçant (Moul Lhanout)
                </span>
                <div className="font-bold text-[var(--ink)] text-sm">{inspectedOrder.storeName}</div>
                <div className="text-[11px] text-[var(--ink-muted)] font-mono">+212 5 22 39 10 40</div>
                <button
                  onClick={() =>
                    setContactModalData({
                      targetName: inspectedOrder.storeName,
                      role: 'merchant',
                      phone: '+212 5 22 39 10 40',
                      orderNum: inspectedOrder.orderNumber,
                    })
                  }
                  className="w-full mt-2 py-1.5 rounded-xl bg-white border border-[var(--border-warm)] font-bold text-[10px] text-[var(--ink)] hover:bg-[var(--wall-dark)] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Phone className="w-3 h-3 text-[var(--rust)]" />
                  <span>Joindre l'épicier</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedAdminMerchantId(inspectedOrder.storeId);
                    setCurrentScreen('admin-merchant-detail');
                  }}
                  className="w-full py-1 text-[10px] text-[var(--rust)] font-semibold hover:underline flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                  <span>Fiche détaillée du hanout</span>
                </button>
              </div>

              {/* Client */}
              <div className="p-3.5 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-1.5">
                <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block font-bold">
                  Client Destinataire
                </span>
                <div className="font-bold text-[var(--ink)] text-sm">{inspectedOrder.customerName}</div>
                <div className="text-[11px] text-[var(--ink-muted)] font-mono">
                  {inspectedOrder.customerPhone}
                </div>
                <div className="text-[10px] text-stone-500 truncate">
                  {inspectedOrder.customerAddress}
                </div>
                <button
                  onClick={() =>
                    setContactModalData({
                      targetName: inspectedOrder.customerName,
                      role: 'client',
                      phone: inspectedOrder.customerPhone,
                      orderNum: inspectedOrder.orderNumber,
                    })
                  }
                  className="w-full mt-2 py-1.5 rounded-xl bg-white border border-[var(--border-warm)] font-bold text-[10px] text-[var(--ink)] hover:bg-[var(--wall-dark)] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Phone className="w-3 h-3 text-[var(--rust)]" />
                  <span>Joindre le client</span>
                </button>
                <button
                  onClick={() => {
                    const matchedClient = adminClients.find(
                      (c) =>
                        c.name.toLowerCase() === inspectedOrder.customerName.toLowerCase() ||
                        c.phone === inspectedOrder.customerPhone
                    );
                    if (matchedClient) {
                      setSelectedAdminClientId(matchedClient.id);
                    }
                    setCurrentScreen('admin-client-detail');
                  }}
                  className="w-full py-1 text-[10px] text-[var(--rust)] font-semibold hover:underline flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                  <span>Fiche détaillée client & CNDP</span>
                </button>
              </div>

              {/* Livreur */}
              <div className="p-3.5 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-1.5">
                <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase block font-bold">
                  Livreur Assigné
                </span>
                <div className="font-bold text-[var(--ink)] text-sm">
                  {inspectedOrder.courierName || 'Non assigné'}
                </div>
                <div className="text-[11px] text-[var(--ink-muted)] font-mono">
                  {inspectedOrder.courierPhone || 'N/A'}
                </div>
                <div className="text-[10px] text-sky-800 font-semibold">
                  {inspectedOrder.status === 'out_for_delivery'
                    ? `En mouvement (ETA ~${inspectedOrder.etaMinutes} min)`
                    : 'En attente de prise en charge'}
                </div>
                <button
                  onClick={() => {
                    setReassignModalOrder(inspectedOrder);
                    setSelectedNewCourierId(availableCouriersList[0].name);
                  }}
                  className="w-full mt-2 py-1.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Bike className="w-3 h-3" />
                  <span>Changer de livreur</span>
                </button>
                {inspectedOrder.courierName && (
                  <button
                    onClick={() => {
                      const matchedCourier = adminCouriers.find(
                        (c) =>
                          inspectedOrder.courierName &&
                          c.name.toLowerCase().includes(inspectedOrder.courierName.toLowerCase().split(' ')[0])
                      );
                      if (matchedCourier) {
                        setSelectedAdminCourierId(matchedCourier.id);
                      }
                      setCurrentScreen('admin-courier-detail');
                    }}
                    className="w-full py-1 text-[10px] text-sky-800 font-semibold hover:underline flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="w-2.5 h-2.5" />
                    <span>Dossier complet du livreur</span>
                  </button>
                )}
              </div>
            </div>

            {/* Chronological Timeline */}
            <div className="p-4 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-2">
              <span className="font-bold text-[var(--ink)] block text-xs">
                Jalons Opérationnels Horodatés
              </span>
              <div className="space-y-2">
                {(inspectedOrder.timeline || [
                  { stage: 'Commande reçue', timestamp: inspectedOrder.createdAt, done: true },
                  { stage: 'Préparation au Hanout', timestamp: '11:20', done: true },
                  { stage: 'Prise en charge livreur', timestamp: 'En cours', done: false },
                ]).map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[11px]">
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] mt-0.5 ${
                        t.done ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-600'
                      }`}
                    >
                      {t.done ? '✓' : '•'}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[var(--ink)]">{t.stage}</span>
                        <span className="text-[10px] font-mono text-[var(--ink-muted)]">
                          {t.timestamp}
                        </span>
                      </div>
                      {t.description && (
                        <p className="text-[10px] text-[var(--ink-muted)] mt-0.5">{t.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Articles Details Table */}
            <div className="border border-[var(--border-warm)] rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--wall)] font-mono text-[var(--ink-muted)]">
                  <tr>
                    <th className="p-2.5">Article</th>
                    <th className="p-2.5 text-center">Qté</th>
                    <th className="p-2.5 text-right">Prix Unitaire</th>
                    <th className="p-2.5 text-right">Sous-Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-warm)]">
                  {inspectedOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-bold text-[var(--ink)]">
                        {item.productName}
                        {item.variantLabel && (
                          <span className="text-[10px] text-[var(--ink-muted)] block font-normal">
                            {item.variantLabel}
                          </span>
                        )}
                      </td>
                      <td className="p-2.5 text-center font-mono">{item.quantity}</td>
                      <td className="p-2.5 text-right font-mono">{item.pricePerUnit.toFixed(2)} DH</td>
                      <td className="p-2.5 text-right font-mono font-bold">
                        {item.totalPrice.toFixed(2)} DH
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-3 bg-[var(--wall)] border-t border-[var(--border-warm)] flex items-center justify-between font-mono">
                <div className="text-[11px] text-[var(--ink-muted)]">
                  Frais de livraison : {inspectedOrder.deliveryFeeDh.toFixed(2)} DH • Mode :{' '}
                  <strong className="text-[var(--rust)]">
                    {inspectedOrder.paymentMethod === 'karna' ? 'Carnet Karna' : 'Espèces'}
                  </strong>
                </div>
                <div className="text-base font-extrabold text-[var(--rust)]">
                  Total : {inspectedOrder.totalDh.toFixed(2)} DH
                </div>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--border-warm)]">
              <div className="flex items-center gap-2">
                {/* Print Official Moroccan Delivery Slip */}
                <button
                  onClick={() => setShowPrintReceipt(inspectedOrder)}
                  className="px-3 py-2 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] hover:bg-white text-[var(--ink)] font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimer Bon de Livraison</span>
                </button>

                {/* Cancel with reason */}
                {inspectedOrder.status !== 'cancelled' && inspectedOrder.status !== 'delivered' && (
                  <button
                    onClick={() => {
                      setCancelModalOrder(inspectedOrder);
                      setInspectedOrder(null);
                    }}
                    className="px-3 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Annulation Litige</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInspectedOrder(null)}
                  className="px-5 py-2 rounded-xl bg-[var(--ink)] text-white font-bold cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: RÉAFFECTATION COURSIER RAPIDE */}
      {reassignModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in text-xs text-left">
          <div className="w-full max-w-md bg-white rounded-3xl border border-[var(--border-warm)] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-warm)] pb-2.5">
              <div>
                <span className="text-[11px] font-mono text-[var(--rust)] font-bold uppercase">
                  Dispatch & Réaffectation
                </span>
                <h3 className="text-base font-bold text-[var(--ink)]">
                  Commande {reassignModalOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setReassignModalOrder(null)}
                className="text-stone-400 hover:text-black font-bold text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-[var(--ink-muted)]">
              Sélectionnez un livreur disponible à proximité pour prendre le relais immédiat :
            </p>

            <div className="space-y-2">
              {availableCouriersList.map((cour, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedNewCourierId(cour.name)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedNewCourierId === cour.name
                      ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-300'
                      : 'bg-[var(--wall)] border-[var(--border-warm)] hover:bg-white'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-[var(--ink)] block">{cour.name}</span>
                    <span className="text-[11px] text-[var(--ink-muted)] block font-mono">
                      {cour.phone} • {cour.zone}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                      ETA {cour.distanceEta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setReassignModalOrder(null)}
                className="px-4 py-2 rounded-xl border border-[var(--border-warm)] cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmReassignment}
                className="px-5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold cursor-pointer"
              >
                Confirmer l'affectation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CONTACT RAPIDE WHATSAPP / GSM */}
      {contactModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in text-xs text-left">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-[var(--border-warm)] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-warm)] pb-2">
              <div>
                <span className="text-[11px] font-mono text-[var(--rust)] font-bold uppercase">
                  Assistance Téléphonique Directe
                </span>
                <h3 className="text-base font-bold text-[var(--ink)]">
                  {contactModalData.targetName}
                </h3>
              </div>
              <button
                onClick={() => setContactModalData(null)}
                className="text-stone-400 hover:text-black font-bold text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-1 text-center font-mono">
              <span className="text-[11px] text-[var(--ink-muted)] block">Numéro de ligne :</span>
              <span className="text-base font-bold text-[var(--ink)] block">
                {contactModalData.phone}
              </span>
              <span className="text-[10px] text-stone-500">
                Commande liée : {contactModalData.orderNum}
              </span>
            </div>

            <div className="space-y-2">
              <a
                href={`tel:${contactModalData.phone}`}
                className="w-full py-2.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs text-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Appel GSM direct</span>
              </a>

              <a
                href={`https://wa.me/${contactModalData.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message WhatsApp de coordination</span>
              </a>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setContactModalData(null)}
                className="px-4 py-1.5 rounded-xl text-stone-500 hover:text-black font-semibold cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ANNULATION ADMINISTRATIVE AVEC MOTIF */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in text-xs text-left">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              cancelOrderAdmin(cancelModalOrder.id, cancelReason);
              setCancelModalOrder(null);
            }}
            className="w-full max-w-md bg-white rounded-3xl border-2 border-rose-500 shadow-2xl p-6 space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-base font-bold text-rose-800">
                Annuler la Commande {cancelModalOrder.orderNumber}
              </h3>
              <p className="text-[var(--ink-muted)]">
                Cette action arrête la tournée et ajuste automatiquement l'exposition Karna ou rembourse le client.
              </p>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Motif réglementaire d'annulation :
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-medium text-[var(--ink)]"
              >
                <option value="Client injoignable après 3 tentatives et 20 minutes d'attente">
                  Client injoignable après 3 tentatives (20 min)
                </option>
                <option value="Rupture de stock critique au Hanout sans produit de substitution">
                  Rupture de stock critique chez Moul Lhanout
                </option>
                <option value="Adresse client hors zone ou introuvable malgré guidage GPS">
                  Adresse hors zone de livraison / introuvable
                </option>
                <option value="Refus du colis par le client à la réception">
                  Refus du colis par le client
                </option>
                <option value="Plafond Karna dépassé non autorisé par le commerçant">
                  Plafond Karna dépassé non validé
                </option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancelModalOrder(null)}
                className="px-4 py-2 rounded-xl border border-[var(--border-warm)] cursor-pointer"
              >
                Retour
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold cursor-pointer"
              >
                Confirmer l'annulation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 5: BON DE LIVRAISON OFFICIEL SMART HANOUT (IMPRIMABLE) */}
      {showPrintReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in text-xs text-left">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-[var(--border-warm)] shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--border-warm)] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-[var(--rust)] text-white font-bold flex items-center justify-center text-xs">
                  SH
                </span>
                <span className="font-extrabold text-base text-[var(--ink)]">
                  Bon de Livraison Officiel
                </span>
              </div>
              <button
                onClick={() => setShowPrintReceipt(null)}
                className="text-stone-400 hover:text-black font-bold text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Printable Ticket Receipt */}
            <div className="p-4 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-3 font-mono text-[11px]">
              <div className="text-center pb-2 border-b border-[var(--border-warm)] space-y-0.5">
                <h4 className="font-extrabold text-sm text-[var(--ink)] font-kalam text-lg">
                  SMART HANOUT MAROC
                </h4>
                <p className="text-[10px] text-[var(--ink-muted)]">
                  Plateforme Digitale des Commerces de Proximité
                </p>
                <div className="text-[10px] text-stone-500">
                  Royaume du Maroc • R.C : 58921 / CNDP : D-W-412/2026
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-[var(--ink-muted)] block">N° Commande :</span>
                  <span className="font-bold text-[var(--rust)]">{showPrintReceipt.orderNumber}</span>
                </div>
                <div className="text-right">
                  <span className="text-[var(--ink-muted)] block">Date & Heure :</span>
                  <span className="font-bold">{showPrintReceipt.createdAt}</span>
                </div>
                <div>
                  <span className="text-[var(--ink-muted)] block">Hanout Partenaire :</span>
                  <span className="font-bold text-[var(--ink)]">{showPrintReceipt.storeName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[var(--ink-muted)] block">Ville / Zone :</span>
                  <span className="font-bold">{showPrintReceipt.city || 'Casablanca'}</span>
                </div>
                <div>
                  <span className="text-[var(--ink-muted)] block">Client :</span>
                  <span className="font-bold">{showPrintReceipt.customerName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[var(--ink-muted)] block">Livreur :</span>
                  <span className="font-bold">{showPrintReceipt.courierName || 'Concierge'}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="border-t border-b border-[var(--border-warm)] py-2 space-y-1">
                {showPrintReceipt.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {it.quantity}x {it.productName}
                    </span>
                    <span className="font-bold">{it.totalPrice.toFixed(2)} DH</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-1 pt-1 text-right">
                <div className="flex justify-between text-[10px] text-[var(--ink-muted)]">
                  <span>Sous-total articles :</span>
                  <span>{showPrintReceipt.subtotalDh.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between text-[10px] text-[var(--ink-muted)]">
                  <span>Frais de livraison :</span>
                  <span>{showPrintReceipt.deliveryFeeDh.toFixed(2)} DH</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[var(--rust)] pt-1 border-t border-[var(--border-warm)]">
                  <span>NET À PAYER :</span>
                  <span>{showPrintReceipt.totalDh.toFixed(2)} DH</span>
                </div>
                <div className="text-left text-[10px] text-emerald-800 font-bold mt-1">
                  Mode de règlement :{' '}
                  {showPrintReceipt.paymentMethod === 'karna'
                    ? 'Carnet Karna (Inscrit au compte client)'
                    : 'Espèces à la livraison (Encaissé)'}
                </div>
              </div>

              <div className="pt-2 text-center text-[9px] text-stone-400">
                Cachet électronique Smart Hanout certifié • Merci pour votre confiance !
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPrintReceipt(null)}
                className="px-4 py-2 rounded-xl border border-[var(--border-warm)] cursor-pointer"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Lancer Impression</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
