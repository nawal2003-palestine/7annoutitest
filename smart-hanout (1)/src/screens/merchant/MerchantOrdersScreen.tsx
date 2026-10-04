import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { OrderStatus, Order } from '../../types';
import {
  ShoppingBag,
  Clock,
  ArrowRight,
  CheckCircle,
  Truck,
  Phone,
  MapPin,
  Filter,
} from 'lucide-react';

export const MerchantOrdersScreen: React.FC = () => {
  const { orders, setActiveOrder, updateOrderStatus, setCurrentScreen } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status === filterStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">En attente d'acceptation</span>;
      case 'preparing':
        return <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">En préparation au hanout</span>;
      case 'out_for_delivery':
        return <span className="px-2.5 py-1 rounded-full bg-[var(--rust-light)] text-[var(--rust)] border border-[var(--rust)]/30 text-xs font-bold">Livreur en route</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">Livrée ✓</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Commandes Entrantes du Quartier
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Traitez les commandes en direct, préparez les sacs et assignez les livreurs ou concierges
          </p>
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'pending', label: 'En attente' },
            { id: 'preparing', label: 'En préparation' },
            { id: 'out_for_delivery', label: 'En cours de route' },
            { id: 'delivered', label: 'Livrées' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-[var(--rust)] text-white shadow-xs'
                  : 'bg-white text-[var(--ink)] hover:bg-[var(--wall)] border border-[var(--border-warm)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <MoroccanStarBorder />

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((ord) => (
          <div
            key={ord.id}
            className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-warm)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--wall-dark)] text-[var(--rust)] flex items-center justify-center font-bold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base text-[var(--ink)]">
                      {ord.orderNumber}
                    </span>
                    {getStatusBadge(ord.status)}
                  </div>
                  <p className="text-xs text-[var(--ink-muted)]">
                    Reçue : {ord.createdAt} • Client : <strong>{ord.customerName}</strong> ({ord.customerPhone})
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-extrabold font-mono text-[var(--rust)]">
                  {ord.totalDh.toFixed(2)} DH
                </div>
                <div className="text-xs font-semibold capitalize text-[var(--ink-muted)]">
                  {ord.paymentMethod === 'karna' ? '📖 Inscrire au Karna' : '💵 Espèces (COD)'}
                </div>
              </div>
            </div>

            {/* Customer Note if any */}
            {ord.customerNote && (
              <div className="p-3 rounded-xl bg-[var(--wall)] border border-[var(--border-warm)] text-xs text-[var(--ink)] italic font-kalam">
                Consigne client : {ord.customerNote}
              </div>
            )}

            {/* Items summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
              {ord.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-[var(--wall-dark)]/50 border border-[var(--border-warm)] flex items-center justify-between"
                >
                  <span className="font-medium text-[var(--ink)]">
                    {item.quantity}x {item.productName}
                  </span>
                  <span className="font-mono font-bold text-[var(--ink)]">
                    {item.totalPrice.toFixed(2)} DH
                  </span>
                </div>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[var(--ink-muted)] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--rust)]" />
                <span>{ord.customerAddress}</span>
              </span>

              <div className="flex items-center gap-2">
                {ord.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'preparing')}
                    className="px-4 py-2 rounded-xl bg-[var(--moroccan-green)] hover:bg-[var(--moroccan-green-hover)] text-white font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Accepter & Commencer Préparation
                  </button>
                )}

                {ord.status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'out_for_delivery')}
                    className="px-4 py-2 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Sac Prêt → Assigner Livreur
                  </button>
                )}

                <button
                  onClick={() => {
                    setActiveOrder(ord);
                    setCurrentScreen('merchant-order-detail');
                  }}
                  className="px-4 py-2 rounded-xl border border-[var(--border-warm)] hover:bg-[var(--wall)] text-[var(--ink)] font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Détail complet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
