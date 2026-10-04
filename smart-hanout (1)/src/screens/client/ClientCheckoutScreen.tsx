import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  MapPin,
  Banknote,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  MessageSquare,
} from 'lucide-react';

export const ClientCheckoutScreen: React.FC = () => {
  const { cart, cartTotalDh, selectedStore, placeOrder, setCurrentScreen } = useApp();
  const [address, setAddress] = useState('Immeuble Yasmina, Apt 4 (Bourgogne - 2ème étage)');
  const [addressRepere, setAddressRepere] = useState('En face de la mosquée Al Badr');
  const [note, setNote] = useState('Pain bien cuit s\'il vous plaît Ba Driss. Merci !');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'karna'>('cod');

  const deliveryFee = cartTotalDh >= selectedStore.freeDeliveryThresholdDh ? 0 : selectedStore.deliveryFeeDh;
  const grandTotal = cartTotalDh + deliveryFee;

  const handleConfirmOrder = () => {
    placeOrder(paymentMethod, `${note} • Repère: ${addressRepere}`);
    setCurrentScreen('client-tracking');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <button
          onClick={() => setCurrentScreen('client-cart')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--rust)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modifier le panier</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mt-2">
          Finaliser la Commande
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Chez {selectedStore.name} • Livraison en ~{selectedStore.deliveryTimeMinutes} minutes
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="space-y-6">
        {/* Step 1: Address */}
        <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-[var(--ink)]">
            <span className="w-6 h-6 rounded-full bg-[var(--rust-light)] text-[var(--rust)] flex items-center justify-center text-xs">
              1
            </span>
            <span>Adresse de Livraison au Quartier</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Adresse précise (Immeuble, Porte, Étage)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-[var(--rust)]" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Repère typique du quartier (pour aider le livreur / concierge)
              </label>
              <input
                type="text"
                value={addressRepere}
                onChange={(e) => setAddressRepere(e.target.value)}
                placeholder="Ex: À côté du boucher / En face de la pharmacie"
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Note to Moul Lhanout */}
        <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-[var(--ink)]">
            <span className="w-6 h-6 rounded-full bg-[var(--amber-gold-light)] text-[var(--amber-gold)] flex items-center justify-center text-xs">
              2
            </span>
            <span>Consigne pour le Commerçant (Moul Lhanout)</span>
          </div>
          <div className="relative">
            <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: Pain bien doré, menthe fraîche avec beaucoup de parfum..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
            />
          </div>
        </div>

        {/* Step 3: Payment Method */}
        <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-[var(--ink)]">
            <span className="w-6 h-6 rounded-full bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] flex items-center justify-center text-xs">
              3
            </span>
            <span>Mode de Règlement</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* COD */}
            <div
              onClick={() => setPaymentMethod('cod')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
                paymentMethod === 'cod'
                  ? 'border-[var(--moroccan-green)] bg-[var(--moroccan-green-light)]/40 shadow-xs'
                  : 'border-[var(--border-warm)] bg-white hover:border-[var(--moroccan-green)]/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-[var(--ink)]">
                  <Banknote className="w-5 h-5 text-[var(--moroccan-green)]" />
                  <span>Espèces à la livraison (Cash)</span>
                </div>
                {paymentMethod === 'cod' && (
                  <CheckCircle2 className="w-4 h-4 text-[var(--moroccan-green)]" />
                )}
              </div>
              <p className="text-[11px] text-[var(--ink-muted)]">
                Payez directement en dirhams au livreur ou au concierge dès la remise du sac.
              </p>
            </div>

            {/* Karna */}
            <div
              onClick={() => setPaymentMethod('karna')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
                paymentMethod === 'karna'
                  ? 'border-[var(--rust)] bg-[var(--rust-light)]/50 shadow-xs'
                  : 'border-[var(--border-warm)] bg-white hover:border-[var(--rust)]/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-[var(--rust)]">
                  <BookOpen className="w-5 h-5 text-[var(--rust)]" />
                  <span>Carnet de Karna (Crédit)</span>
                </div>
                {paymentMethod === 'karna' && (
                  <CheckCircle2 className="w-4 h-4 text-[var(--rust)]" />
                )}
              </div>
              <p className="text-[11px] text-[var(--ink-muted)]">
                Ajouté à votre solde de confiance. Règlement prévu à la fin du mois.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary & Confirm */}
        <div className="p-6 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] space-y-4">
          <div className="flex justify-between items-baseline">
            <div>
              <span className="text-xs text-[var(--ink-muted)]">Total net à régler :</span>
              <div className="text-2xl font-extrabold font-mono text-[var(--rust)]">
                {grandTotal.toFixed(2)} DH
              </div>
            </div>
            <div className="text-right text-xs text-[var(--ink-muted)]">
              <div>{cart.length} articles</div>
              <div className="font-semibold text-[var(--moroccan-green)]">
                {deliveryFee === 0 ? 'Livraison offerte' : `+ ${deliveryFee.toFixed(2)} DH livraison`}
              </div>
            </div>
          </div>

          <button
            onClick={handleConfirmOrder}
            className="w-full py-3.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Confirmer la commande ({grandTotal.toFixed(2)} DH)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
