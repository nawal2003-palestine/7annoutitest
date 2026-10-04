import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  ArrowLeft,
  CheckCircle,
  Truck,
  Phone,
  MapPin,
  Clock,
  Bike,
  Building,
  Check,
} from 'lucide-react';

export const MerchantOrderDetailScreen: React.FC = () => {
  const { activeOrder, updateOrderStatus, setCurrentScreen } = useApp();
  const [selectedCourier, setSelectedCourier] = useState('hamza');
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({});

  const togglePacked = (prodId: string) => {
    setPackedItems((prev) => ({ ...prev, [prodId]: !prev[prodId] }));
  };

  const handleAssignAndDispatch = () => {
    updateOrderStatus(activeOrder.id, 'out_for_delivery');
    alert(`Commande ${activeOrder.orderNumber} remise au livreur. Le client a été notifié.`);
    setCurrentScreen('merchant-orders');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <button
          onClick={() => setCurrentScreen('merchant-orders')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--rust)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la liste des commandes</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mt-2">
          Traitement Commande {activeOrder.orderNumber}
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Client : {activeOrder.customerName} ({activeOrder.customerPhone})
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Packing Checklist */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-warm)] pb-3">
            <h3 className="font-bold text-sm text-[var(--ink)]">
              Liste de Préparation du Sac (Cocher les articles)
            </h3>
            <span className="text-xs font-mono font-bold text-[var(--rust)]">
              {activeOrder.items.length} articles
            </span>
          </div>

          {activeOrder.customerNote && (
            <div className="p-3 rounded-xl bg-[var(--wall-dark)] text-xs text-[var(--ink)] italic font-kalam">
              Remarque du client : « {activeOrder.customerNote} »
            </div>
          )}

          <div className="space-y-2">
            {activeOrder.items.map((item, idx) => {
              const isChecked = !!packedItems[item.productId || idx];
              return (
                <div
                  key={idx}
                  onClick={() => togglePacked(item.productId || String(idx))}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isChecked
                      ? 'bg-[var(--moroccan-green-light)]/40 border-[var(--moroccan-green)]/40 text-[var(--ink)]'
                      : 'bg-[var(--wall)] border-[var(--border-warm)] text-[var(--ink)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-[var(--moroccan-green)] border-[var(--moroccan-green)] text-white'
                          : 'border-[var(--ink-muted)]/40 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs">{item.productName}</div>
                      {item.variantLabel && (
                        <div className="text-[11px] text-[var(--ink-muted)]">{item.variantLabel}</div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-sm font-mono">{item.quantity}x</span>
                    <div className="text-[11px] font-mono text-[var(--rust)]">
                      {item.totalPrice.toFixed(2)} DH
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Courier assignment & Dispatch */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[var(--wall-dark)] border border-[var(--border-warm)] shadow-xs space-y-5">
          <h3 className="font-bold text-sm text-[var(--ink)]">Assigner un livreur de quartier</h3>

          <div className="space-y-3 text-xs">
            <div
              onClick={() => setSelectedCourier('hamza')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedCourier === 'hamza'
                  ? 'bg-white border-2 border-[var(--rust)] shadow-xs'
                  : 'bg-white/60 border-[var(--border-warm)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--rust-light)] text-[var(--rust)] flex items-center justify-center">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[var(--ink)]">Hamza El Fassi</div>
                  <div className="text-[11px] text-[var(--ink-muted)]">Moto 103 • Devant le hanout</div>
                </div>
              </div>
              <span className="font-bold text-[var(--moroccan-green)] text-[11px]">Disponible</span>
            </div>

            <div
              onClick={() => setSelectedCourier('simo')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedCourier === 'simo'
                  ? 'bg-white border-2 border-[var(--moroccan-green)] shadow-xs'
                  : 'bg-white/60 border-[var(--border-warm)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[var(--ink)]">Simo (Concierge)</div>
                  <div className="text-[11px] text-[var(--ink-muted)]">Gardien Résidence Yasmina</div>
                </div>
              </div>
              <span className="font-bold text-[var(--moroccan-green)] text-[11px]">À pied (immeuble)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[var(--border-warm)] space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-[var(--ink-muted)]">Total de la commande :</span>
              <span className="font-bold font-mono text-[var(--rust)]">
                {activeOrder.totalDh.toFixed(2)} DH
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--ink-muted)]">Mode d'encaissement :</span>
              <span className="font-bold capitalize">
                {activeOrder.paymentMethod === 'karna' ? 'Karna (Pas de cash à collecter)' : 'Collecter le cash'}
              </span>
            </div>
          </div>

          <button
            onClick={handleAssignAndDispatch}
            className="w-full py-3.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Truck className="w-4 h-4" />
            <span>Remettre le sac au livreur & Déclencher GPS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
