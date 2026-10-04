import React from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  Clock,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Package,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export const ClientOrderHistoryScreen: React.FC = () => {
  const { orders, setActiveOrder, setCurrentScreen } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Historique de mes Commandes
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Retrouvez tous vos achats récents et réapprovisionnez-vous en 1 clic
          </p>
        </div>
      </div>

      <MoroccanStarBorder />

      <div className="space-y-4">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-warm)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[var(--ink)]">
                    {ord.orderNumber}
                  </span>
                  <span className="text-xs text-[var(--ink-muted)]">• {ord.createdAt}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ord.status === 'delivered'
                        ? 'bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)]'
                        : 'bg-[var(--amber-gold-light)] text-[var(--amber-gold)]'
                    }`}
                  >
                    {ord.status === 'delivered' ? 'Livré' : 'En cours'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[var(--ink)] mt-0.5">
                  {ord.storeName}
                </p>
              </div>

              <div className="text-right">
                <div className="text-base font-extrabold font-mono text-[var(--rust)]">
                  {ord.totalDh.toFixed(2)} DH
                </div>
                <div className="text-[10px] text-[var(--ink-muted)] capitalize">
                  {ord.paymentMethod === 'karna' ? 'Crédit Karna' : 'Espèces'}
                </div>
              </div>
            </div>

            {/* Items summary */}
            <div className="text-xs text-[var(--ink-muted)] flex flex-wrap gap-2">
              {ord.items.map((it, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-lg bg-[var(--wall)] border border-[var(--border-warm)]"
                >
                  {it.quantity}x {it.productName}
                </span>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[var(--ink-muted)] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--rust)]" />
                <span>{ord.customerAddress}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveOrder(ord);
                    setCurrentScreen('client-tracking');
                  }}
                  className="px-3 py-1.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] hover:bg-[var(--wall-dark)] text-[var(--ink)] font-bold transition-colors cursor-pointer"
                >
                  Suivi GPS
                </button>
                <button
                  onClick={() => {
                    setActiveOrder(ord);
                    setCurrentScreen('client-order-detail');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Détail / Facture</span>
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
