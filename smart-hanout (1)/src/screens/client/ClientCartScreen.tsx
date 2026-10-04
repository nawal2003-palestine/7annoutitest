import React from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Truck,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const ClientCartScreen: React.FC = () => {
  const {
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartTotalDh,
    selectedStore,
    setCurrentScreen,
  } = useApp();

  const isFreeDelivery = cartTotalDh >= selectedStore.freeDeliveryThresholdDh;
  const deliveryFee = cartTotalDh === 0 ? 0 : isFreeDelivery ? 0 : selectedStore.deliveryFeeDh;
  const finalTotalDh = cartTotalDh + deliveryFee;
  const remainingForFree = Math.max(0, selectedStore.freeDeliveryThresholdDh - cartTotalDh);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => setCurrentScreen('client-store')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--rust)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continuer mes courses chez {selectedStore.name}</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mt-2">
            Mon Panier de Courses
          </h1>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-[var(--rust)] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Vider le panier</span>
          </button>
        )}
      </div>

      <MoroccanStarBorder />

      {cart.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border border-[var(--border-warm)] text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--wall-dark)] text-[var(--rust)] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[var(--ink)]">Votre panier est vide</h3>
          <p className="text-xs text-[var(--ink-muted)] max-w-sm mx-auto">
            Faites le plein de pain frais, menthe, thé vert ou Raïbi auprès de votre hanoutier favori.
          </p>
          <button
            onClick={() => setCurrentScreen('client-store')}
            className="px-6 py-2.5 rounded-xl bg-[var(--rust)] text-white text-xs font-bold hover:bg-[var(--rust-hover)] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Voir le catalogue du hanout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart items list */}
          <div className="lg:col-span-7 space-y-3">
            {/* Free delivery threshold progress */}
            <div className="p-3.5 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-[var(--ink)]">
                  <Truck className="w-4 h-4 text-[var(--moroccan-green)]" />
                  <span>Livraison gratuite dès {selectedStore.freeDeliveryThresholdDh} DH</span>
                </span>
                {isFreeDelivery ? (
                  <span className="text-[var(--moroccan-green)] font-bold">Atteint ! (0 DH)</span>
                ) : (
                  <span className="text-[var(--rust)]">Encore {remainingForFree.toFixed(2)} DH</span>
                )}
              </div>
              <div className="w-full h-2 rounded-full bg-white overflow-hidden">
                <div
                  className="h-full bg-[var(--moroccan-green)] transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      (cartTotalDh / selectedStore.freeDeliveryThresholdDh) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2.5">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.variantId || idx}`}
                  className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[var(--ink)]">{item.product.name}</h4>
                    {item.variantLabel && (
                      <span className="text-[11px] text-[var(--ink-muted)] block">
                        Format : {item.variantLabel}
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold text-[var(--rust)]">
                      {item.unitPrice.toFixed(2)} DH
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[var(--border-warm)] rounded-xl bg-[var(--wall)] overflow-hidden">
                      <button
                        onClick={() =>
                          updateCartQty(item.product.id, item.variantId, -1)
                        }
                        className="p-2 hover:bg-white text-[var(--ink)] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-bold font-mono text-xs text-[var(--ink)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQty(item.product.id, item.variantId, 1)
                        }
                        className="p-2 hover:bg-white text-[var(--ink)] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right min-w-[60px]">
                      <div className="text-sm font-bold font-mono text-[var(--ink)]">
                        {(item.unitPrice * item.quantity).toFixed(2)} DH
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.variantId)}
                      className="p-1.5 text-[var(--ink-muted)] hover:text-[var(--rust)] cursor-pointer"
                      title="Supprimer l'article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart summary & Checkout button */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[var(--ink)]">Récapitulatif de commande</h3>

            <div className="space-y-2 text-xs text-[var(--ink-muted)] pb-3 border-b border-[var(--border-warm)]">
              <div className="flex justify-between">
                <span>Sous-total articles :</span>
                <span className="font-mono font-semibold text-[var(--ink)]">
                  {cartTotalDh.toFixed(2)} DH
                </span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison ({selectedStore.neighborhood}) :</span>
                <span className="font-mono font-semibold text-[var(--ink)]">
                  {deliveryFee === 0 ? 'Offerte (0.00 DH)' : `${deliveryFee.toFixed(2)} DH`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="text-base font-bold text-[var(--ink)]">Total à régler :</span>
              <span className="text-2xl font-extrabold font-mono text-[var(--rust)]">
                {finalTotalDh.toFixed(2)} DH
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--karna-paper)] border border-[var(--border-warm)] text-xs text-[var(--ink-muted)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--amber-gold)] shrink-0" />
              <span>
                Paiement possible en <strong className="text-[var(--rust)]">Espèces</strong> ou consigné sur votre{' '}
                <strong className="text-[var(--rust)]">Karna</strong> à la livraison.
              </span>
            </div>

            <button
              onClick={() => setCurrentScreen('client-checkout')}
              className="w-full py-3.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Passer ma commande</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
