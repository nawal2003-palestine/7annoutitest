import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { DetectedOrderItem, Product } from '../../types';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Camera,
  FileText,
  Search,
  ChevronDown,
} from 'lucide-react';

export const ClientOrderReviewScreen: React.FC = () => {
  const {
    orderReviewItems,
    setOrderReviewItems,
    orderReviewSource,
    originalInputText,
    originalPhotoPreview,
    selectedStore,
    products,
    addReviewedItemsToCart,
    setCurrentScreen,
  } = useApp();

  const [activeCatalogPickerId, setActiveCatalogPickerId] = useState<string | null>(null);
  const [catalogSearch, setCatalogSearch] = useState('');

  // Update item quantity
  const handleQuantityChange = (id: string, delta: number) => {
    setOrderReviewItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          const nextQty = Math.max(1, it.quantity + delta);
          return { ...it, quantity: nextQty };
        }
        return it;
      })
    );
  };

  // Remove item from detected list
  const handleRemoveItem = (id: string) => {
    setOrderReviewItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Choose a suggestion or manual catalog match
  const handleSelectProduct = (itemId: string, product: Product) => {
    setOrderReviewItems((prev) =>
      prev.map((it) => {
        if (it.id === itemId) {
          return {
            ...it,
            matchedProduct: product,
            confidence: 'high',
          };
        }
        return it;
      })
    );
    setActiveCatalogPickerId(null);
  };

  // Calculate provisional total for valid matched items
  const validItems = orderReviewItems.filter((it) => it.matchedProduct);
  const provisionalTotalDh = validItems.reduce((sum, it) => {
    return sum + (it.matchedProduct ? it.matchedProduct.price * it.quantity : 0);
  }, 0);

  const filteredCatalogProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(catalogSearch.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
      {/* Top back & navigation */}
      <div>
        <button
          onClick={() => setCurrentScreen('client-store')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--rust)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au hanout ({selectedStore.name})</span>
        </button>
      </div>

      {/* Main Header */}
      <div className="p-6 rounded-3xl bg-[var(--wall-dark)] border border-[var(--border-warm)] shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[var(--rust-light)] text-[var(--rust)]">
            {orderReviewSource === 'photo' ? (
              <Camera className="w-4 h-4" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
          </span>
          <span className="text-xs font-bold text-[var(--rust)] uppercase tracking-wider font-mono">
            {orderReviewSource === 'photo'
              ? 'Analyse intelligente de photo manuscrite'
              : 'Analyse de votre liste de courses'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Voici ce qu'on a compris de ta liste
        </h1>

        <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
          Vérifiez chaque produit avant validation. Aucun article n'est ajouté au panier
          tant que vous n'avez pas confirmé en bas de page.
        </p>

        {/* Small preview of original source */}
        {originalInputText && (
          <div className="pt-2 text-xs text-[var(--ink-muted)] border-t border-[var(--border-warm)] flex items-baseline gap-2">
            <span className="font-semibold text-[var(--ink)]">Texte analysé :</span>
            <span className="font-kalam text-sm text-[var(--rust)] italic">
              « {originalInputText} »
            </span>
          </div>
        )}
      </div>

      <MoroccanStarBorder />

      {/* Detected items list */}
      <div className="space-y-4">
        {orderReviewItems.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-[var(--border-warm)] text-center space-y-3">
            <p className="text-sm font-bold text-[var(--ink)]">
              Aucun produit restant dans cette liste.
            </p>
            <button
              onClick={() => setCurrentScreen('client-store')}
              className="px-4 py-2 rounded-xl bg-[var(--rust)] text-white text-xs font-bold"
            >
              Revenir au catalogue
            </button>
          </div>
        ) : (
          orderReviewItems.map((item) => {
            const isHigh = item.confidence === 'high' && item.matchedProduct;
            const isMedium = item.confidence === 'medium';
            const isLow = item.confidence === 'low' || !item.matchedProduct;

            return (
              <div
                key={item.id}
                className={`p-5 rounded-3xl bg-white border-2 transition-all space-y-3 shadow-xs ${
                  isHigh
                    ? 'border-emerald-200'
                    : isMedium
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[var(--border-warm)]">
                  {/* Original text snippet */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--ink-muted)] font-medium">Vous avez écrit :</span>
                    <span className="font-kalam text-base font-bold text-[var(--ink)] bg-[var(--wall)] px-2.5 py-0.5 rounded-lg border border-[var(--border-warm)]">
                      « {item.originalText} »
                    </span>
                  </div>

                  {/* Confidence Badge */}
                  <div>
                    {isHigh && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Correspondance fiable</span>
                      </span>
                    )}
                    {isMedium && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Correspondance incertaine — À confirmer</span>
                      </span>
                    )}
                    {isLow && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Non trouvé au hanout</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Match display & selection */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-7 space-y-2">
                    {item.matchedProduct ? (
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-[var(--rust)] font-bold">Produit retenu :</span>
                          <span className="text-sm font-bold text-[var(--ink)]">
                            {item.matchedProduct.name}
                          </span>
                        </div>
                        <div className="text-xs font-mono font-bold text-[var(--rust)] mt-0.5">
                          {item.matchedProduct.price.toFixed(2)} DH{' '}
                          <span className="text-[10px] font-normal text-[var(--ink-muted)]">
                            / {item.matchedProduct.unit}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-rose-700 space-y-1">
                        <p className="font-semibold">
                          Aucun produit correspondant directement à « {item.originalText} » dans l'épicerie {selectedStore.name}.
                        </p>
                        <p className="text-[11px] text-[var(--ink-muted)]">
                          Choisissez un produit similaire dans le catalogue ci-dessous ou retirez cette ligne.
                        </p>
                      </div>
                    )}

                    {/* Suggestions dropdown if Medium confidence */}
                    {isMedium && item.suggestions && item.suggestions.length > 0 && (
                      <div className="pt-1 space-y-1">
                        <label className="text-[11px] font-bold text-[var(--ink)] block">
                          Choisir parmi les produits similaires disponibles :
                        </label>
                        <select
                          value={item.matchedProduct?.id}
                          onChange={(e) => {
                            const found = products.find((p) => p.id === e.target.value);
                            if (found) handleSelectProduct(item.id, found);
                          }}
                          className="w-full p-2 rounded-xl border border-amber-300 bg-white text-xs text-[var(--ink)] font-semibold cursor-pointer"
                        >
                          {item.suggestions.map((sug) => (
                            <option key={sug.id} value={sug.id}>
                              {sug.name} — {sug.price.toFixed(2)} DH ({sug.unit})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Manual picker button if Low confidence */}
                    {isLow && (
                      <div className="pt-1">
                        <button
                          onClick={() =>
                            setActiveCatalogPickerId(
                              activeCatalogPickerId === item.id ? null : item.id
                            )
                          }
                          className="px-3 py-1.5 rounded-xl border border-[var(--border-warm)] bg-white hover:border-[var(--rust)] text-xs font-bold text-[var(--rust)] cursor-pointer flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>Chercher dans le catalogue pour remplacer</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Dropdown catalog picker popup */}
                    {activeCatalogPickerId === item.id && (
                      <div className="mt-2 p-3 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] space-y-2 animate-in fade-in">
                        <input
                          type="text"
                          value={catalogSearch}
                          onChange={(e) => setCatalogSearch(e.target.value)}
                          placeholder="Rechercher un produit de remplacement..."
                          className="w-full p-2 text-xs rounded-xl border border-[var(--border-warm)] bg-white"
                        />
                        <div className="max-h-36 overflow-y-auto space-y-1 text-xs">
                          {filteredCatalogProducts.slice(0, 6).map((cp) => (
                            <div
                              key={cp.id}
                              onClick={() => handleSelectProduct(item.id, cp)}
                              className="p-2 rounded-lg bg-white hover:bg-[var(--rust-light)] hover:text-[var(--rust)] cursor-pointer flex justify-between items-center transition-colors"
                            >
                              <span className="font-semibold truncate mr-2">{cp.name}</span>
                              <span className="font-mono font-bold shrink-0">
                                {cp.price.toFixed(2)} DH
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantity & Item Subtotal & Remove */}
                  <div className="md:col-span-5 flex items-center justify-between md:justify-end gap-4 pt-2 md:pt-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[var(--ink-muted)]">Quantité :</span>
                      <div className="flex items-center border border-[var(--border-warm)] rounded-xl bg-[var(--wall)] overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-1.5 hover:bg-white text-[var(--ink)] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-bold font-mono text-xs text-[var(--ink)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-1.5 hover:bg-white text-[var(--ink)] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {item.matchedProduct && (
                      <div className="text-right min-w-[70px]">
                        <span className="text-sm font-mono font-extrabold text-[var(--ink)]">
                          {(item.matchedProduct.price * item.quantity).toFixed(2)} DH
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Retirer ce produit de ma liste"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Summary & Confirmation Bar */}
      {orderReviewItems.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-warm)]">
            <div>
              <span className="text-xs text-[var(--ink-muted)]">
                Articles validés prêts pour le panier :
              </span>
              <div className="text-sm font-bold text-[var(--ink)]">
                {validItems.length} article(s) reconnu(s) sur {orderReviewItems.length}
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-[var(--ink-muted)] block">Sous-total provisoire :</span>
              <span className="text-2xl font-extrabold font-mono text-[var(--rust)]">
                {provisionalTotalDh.toFixed(2)} DH
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setCurrentScreen('client-store')}
              className="text-xs text-[var(--ink-muted)] hover:text-[var(--rust)] underline cursor-pointer"
            >
              Je préfère choisir moi-même dans le catalogue
            </button>

            <button
              onClick={() => addReviewedItemsToCart(orderReviewItems)}
              disabled={validItems.length === 0}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Ajouter tout au panier ({provisionalTotalDh.toFixed(2)} DH)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
