import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  ArrowLeft,
  Check,
  ShoppingBag,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Package,
} from 'lucide-react';

export const ClientProductScreen: React.FC = () => {
  const { selectedProduct, addToCart, setCurrentScreen, selectedStore } = useApp();
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    selectedProduct.variants?.[0]?.id
  );
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const currentVariant = selectedProduct.variants?.find((v) => v.id === selectedVariantId);
  const currentPrice = currentVariant ? currentVariant.price : selectedProduct.price;

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedVariantId, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <button
          onClick={() => setCurrentScreen('client-store')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--rust)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au catalogue de {selectedStore.name}</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Product representation */}
        <div className="md:col-span-5 p-8 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-24 h-24 rounded-3xl bg-[var(--rust-light)] text-[var(--rust)] flex items-center justify-center font-bold text-3xl shadow-inner">
            <Package className="w-12 h-12" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider font-mono text-[var(--ink-muted)]">
              Origine Maroc 🇲🇦
            </span>
            <div className="font-kalam text-lg text-[var(--rust)] font-bold mt-1">
              Produit certifié du hanout
            </div>
          </div>
          <div className="text-xs text-[var(--ink-muted)] bg-white/70 px-3 py-1.5 rounded-lg border border-[var(--border-warm)]">
            En stock chez {selectedStore.name} ({selectedProduct.stock} unités)
          </div>
        </div>

        {/* Right: Details & Variant Selection */}
        <div className="md:col-span-7 space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--wall-dark)] text-[var(--ink-muted)] uppercase">
                {selectedProduct.category}
              </span>
              {selectedProduct.isPopular && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[var(--amber-gold-light)] text-[var(--amber-gold)]">
                  ★ Très demandé dans le quartier
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
              {selectedProduct.name}
            </h1>
            {selectedProduct.nameAr && (
              <p className="font-kalam text-base text-[var(--amber-gold)] font-bold">
                {selectedProduct.nameAr}
              </p>
            )}
          </div>

          <div className="text-2xl font-extrabold font-mono text-[var(--rust)]">
            {currentPrice.toFixed(2)} DH{' '}
            <span className="text-xs font-sans font-normal text-[var(--ink-muted)]">
              / {currentVariant ? currentVariant.label : selectedProduct.unit}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Variants choice if available */}
          {selectedProduct.variants && selectedProduct.variants.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[var(--border-warm)]">
              <label className="text-xs font-bold text-[var(--ink)] block">
                Format / Variante disponible :
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                      selectedVariantId === v.id
                        ? 'bg-[var(--rust)] text-white shadow-xs'
                        : 'bg-[var(--wall)] text-[var(--ink)] hover:bg-[var(--wall-dark)] border border-[var(--border-warm)]'
                    }`}
                  >
                    <span>{v.label}</span>
                    <span className="font-mono text-[11px] opacity-90">{v.price.toFixed(2)} DH</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-[var(--border-warm)] rounded-xl bg-[var(--wall)] overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 hover:bg-white text-[var(--ink)] transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-bold font-mono text-sm text-[var(--ink)]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 hover:bg-white text-[var(--ink)] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                Ajouter au panier • {(currentPrice * quantity).toFixed(2)} DH
              </span>
            </button>
          </div>

          {addedNotice && (
            <div className="p-3 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Ajouté avec succès ! Cliquez sur « Mon Panier » pour commander.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
