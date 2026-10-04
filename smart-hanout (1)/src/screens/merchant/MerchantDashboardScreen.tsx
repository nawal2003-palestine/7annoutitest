import React from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  TrendingUp,
  ShoppingBag,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Users,
} from 'lucide-react';

export const MerchantDashboardScreen: React.FC = () => {
  const { selectedStore, orders, products, karnaEntries, setCurrentScreen, setActiveOrder } =
    useApp();

  const totalKarnaDebt = karnaEntries.reduce((sum, k) => sum + k.currentDebtDh, 0);
  const lowStockItems = products.filter((p) => p.stock <= p.lowStockThreshold);
  const pendingOrders = orders.filter((o) => o.status !== 'delivered');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      {/* Header with store greeting */}
      <div className="p-6 rounded-3xl bg-[var(--wall-dark)] border border-[var(--border-warm)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-kalam text-sm font-bold text-[var(--rust)]">
              Espace Moul Lhanout
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] font-bold">
              ✓ Boutique Ouverte
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mt-0.5">
            {selectedStore.name}
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Gérant : {selectedStore.ownerName} • {selectedStore.neighborhood}, {selectedStore.city}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCurrentScreen('merchant-karna')}
            className="px-4 py-2 rounded-xl bg-[var(--karna-paper)] border border-[var(--amber-gold)]/40 text-[var(--ink)] hover:border-[var(--amber-gold)] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-[var(--amber-gold)]" />
            <span className="font-kalam text-sm text-[var(--rust)] font-bold">Ouvrir le Karna</span>
          </button>

          <button
            onClick={() => setCurrentScreen('merchant-orders')}
            className="px-4 py-2 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Commandes ({orders.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Revenue */}
        <div className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--ink-muted)] font-medium">CA du Jour</span>
            <div className="p-2 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-[var(--ink)]">
            1 845.50 DH
          </div>
          <div className="text-[11px] text-[var(--moroccan-green)] font-semibold">
            +18% par rapport à hier
          </div>
        </div>

        {/* Active Orders */}
        <div
          onClick={() => setCurrentScreen('merchant-orders')}
          className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--ink-muted)] font-medium">Commandes à Traiter</span>
            <div className="p-2 rounded-xl bg-[var(--rust-light)] text-[var(--rust)]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-[var(--rust)]">
            {pendingOrders.length} en cours
          </div>
          <div className="text-[11px] text-[var(--ink-muted)]">
            Délai moyen de préparation : 4 min
          </div>
        </div>

        {/* Karna Total Debt */}
        <div
          onClick={() => setCurrentScreen('merchant-karna')}
          className="p-5 rounded-2xl bg-[var(--karna-paper)] border border-[var(--border-warm)] shadow-xs hover:border-[var(--amber-gold)] transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--ink-muted)] font-medium">Total Crédit Karna Actif</span>
            <div className="p-2 rounded-xl bg-[var(--amber-gold-light)] text-[var(--amber-gold)]">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-[var(--rust)]">
            {totalKarnaDebt.toFixed(2)} DH
          </div>
          <div className="text-[11px] text-[var(--ink-muted)] font-kalam">
            4 clients réguliers du derb
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div
          onClick={() => setCurrentScreen('merchant-stock')}
          className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--ink-muted)] font-medium">Alertes Stock Bas</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-amber-700">
            {lowStockItems.length} articles
          </div>
          <div className="text-[11px] text-[var(--ink-muted)]">
            À réapprovisionner auprès du grossiste
          </div>
        </div>
      </div>

      <MoroccanStarBorder />

      {/* Main Grid: Incoming Orders & Low Stock Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Incoming Orders preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[var(--ink)] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[var(--rust)]" />
              <span>Dernières Commandes Entrantes</span>
            </h3>
            <button
              onClick={() => setCurrentScreen('merchant-orders')}
              className="text-xs font-bold text-[var(--rust)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Voir tout <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 3).map((ord) => (
              <div
                key={ord.id}
                onClick={() => {
                  setActiveOrder(ord);
                  setCurrentScreen('merchant-order-detail');
                }}
                className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[var(--ink)]">
                      {ord.orderNumber}
                    </span>
                    <span className="text-xs text-[var(--ink-muted)]">• {ord.customerName}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ord.paymentMethod === 'karna'
                          ? 'bg-[var(--rust-light)] text-[var(--rust)]'
                          : 'bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)]'
                      }`}
                    >
                      {ord.paymentMethod === 'karna' ? 'Karna' : 'Espèces'}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--ink-muted)]">
                    {ord.items.length} articles • {ord.customerAddress.slice(0, 30)}...
                  </p>
                </div>

                <div className="text-right">
                  <div className="font-mono font-extrabold text-sm text-[var(--ink)]">
                    {ord.totalDh.toFixed(2)} DH
                  </div>
                  <span className="text-[11px] text-[var(--rust)] font-bold">
                    Ouvrir →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[var(--ink)] flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-600" />
              <span>Stock faible au Hanout</span>
            </h3>
            <button
              onClick={() => setCurrentScreen('merchant-stock')}
              className="text-xs font-bold text-[var(--rust)] hover:underline cursor-pointer"
            >
              Gérer le stock
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
            {lowStockItems.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between text-xs py-2 border-b border-[var(--border-warm)] last:border-b-0"
              >
                <div>
                  <div className="font-bold text-[var(--ink)]">{p.name}</div>
                  <div className="text-[11px] text-[var(--ink-muted)]">Seuil bas : {p.lowStockThreshold}</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-mono font-bold text-xs border border-rose-200">
                    Reste : {p.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
