import React from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  ArrowLeft,
  Printer,
  Download,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  BookOpen,
  ShoppingBag,
} from 'lucide-react';

export const ClientOrderDetailScreen: React.FC = () => {
  const { activeOrder, setCurrentScreen } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('client-order-history')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--rust)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'historique des commandes</span>
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-xl border border-[var(--border-warm)] bg-white text-xs font-bold text-[var(--ink)] hover:border-[var(--rust)] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[var(--rust)]" />
            <span>Imprimer le ticket</span>
          </button>
        </div>
      </div>

      {/* Moroccan Printable Receipt Ticket */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--karna-paper)] border border-[var(--border-warm)] shadow-md space-y-6 relative overflow-hidden">
        {/* Top Stamp */}
        <div className="text-center space-y-1 pb-4 border-b border-dashed border-[var(--karna-line)]">
          <div className="font-kalam text-xl font-bold text-[var(--rust)]">
            ★ Ticket de Caisse Hanoutier ★
          </div>
          <h2 className="text-xl font-extrabold text-[var(--ink)]">{activeOrder.storeName}</h2>
          <p className="text-xs text-[var(--ink-muted)]">
            Commande n° {activeOrder.orderNumber} • Date : {activeOrder.createdAt}
          </p>
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-white text-[11px] font-mono font-bold text-[var(--moroccan-green)] border border-[var(--moroccan-green)]/30 mt-1">
            Statut : {activeOrder.status === 'out_for_delivery' ? 'Livreur en route' : 'Validée'}
          </div>
        </div>

        {/* Customer & Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-white/70 p-4 rounded-2xl border border-[var(--border-warm)]">
          <div>
            <span className="font-bold text-[var(--ink)] block mb-0.5">Destinataire :</span>
            <div>{activeOrder.customerName}</div>
            <div className="text-[var(--ink-muted)]">{activeOrder.customerPhone}</div>
          </div>
          <div>
            <span className="font-bold text-[var(--ink)] block mb-0.5">Lieu de livraison :</span>
            <div>{activeOrder.customerAddress}</div>
            {activeOrder.customerNote && (
              <div className="text-[var(--rust)] font-kalam text-xs mt-1">
                « {activeOrder.customerNote} »
              </div>
            )}
          </div>
        </div>

        {/* Frozen Items Table */}
        <div className="space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--ink)]">
            Articles achetés (Prix figés à la commande)
          </h3>
          <div className="space-y-2">
            {activeOrder.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs py-1.5 border-b border-dashed border-[var(--karna-line)]"
              >
                <div>
                  <span className="font-bold text-[var(--ink)]">{item.productName}</span>
                  {item.variantLabel && (
                    <span className="text-[11px] text-[var(--ink-muted)] block">
                      {item.variantLabel}
                    </span>
                  )}
                  <div className="text-[11px] text-[var(--ink-muted)]">
                    {item.quantity} x {item.pricePerUnit.toFixed(2)} DH
                  </div>
                </div>
                <div className="font-mono font-bold text-[var(--ink)]">
                  {item.totalPrice.toFixed(2)} DH
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="pt-3 border-t-2 border-[var(--border-warm)] space-y-1.5 text-xs">
          <div className="flex justify-between text-[var(--ink-muted)]">
            <span>Sous-total HT :</span>
            <span className="font-mono">{activeOrder.subtotalDh.toFixed(2)} DH</span>
          </div>
          <div className="flex justify-between text-[var(--ink-muted)]">
            <span>Frais de livraison :</span>
            <span className="font-mono">
              {activeOrder.deliveryFeeDh === 0 ? 'Offerts (0.00 DH)' : `${activeOrder.deliveryFeeDh.toFixed(2)} DH`}
            </span>
          </div>
          <div className="flex justify-between text-base font-extrabold text-[var(--rust)] pt-2 border-t border-[var(--karna-line)]">
            <span>Total TTC :</span>
            <span className="font-mono text-xl">{activeOrder.totalDh.toFixed(2)} DH</span>
          </div>
          <div className="flex justify-between text-xs text-[var(--ink)] pt-1">
            <span>Mode de règlement :</span>
            <span className="font-bold capitalize">
              {activeOrder.paymentMethod === 'karna' ? 'Carnet de Karna (Différé)' : 'Espèces à la remise (COD)'}
            </span>
          </div>
        </div>

        {/* Bottom signature */}
        <div className="pt-4 border-t border-dashed border-[var(--karna-line)] text-center text-xs text-[var(--ink-muted)] space-y-1 font-kalam">
          <div>« Choukran pour votre confiance et bon appétit ! »</div>
          <div className="text-[11px] font-sans">
            Smart Hanout • Assistance : +212 5 22 99 88 77
          </div>
        </div>
      </div>
    </div>
  );
};
