import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  MapPin,
  Clock,
  Star,
  Phone,
  Heart,
  Search,
  BookOpen,
  Plus,
  ArrowLeft,
  Check,
  Info,
  ShoppingBag,
  PenTool,
  Camera,
  UploadCloud,
  Sparkles,
  ArrowRight,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

export const ClientStoreScreen: React.FC = () => {
  const {
    selectedStore,
    products,
    addToCart,
    setCurrentScreen,
    setSelectedProduct,
    processGroceryInput,
  } = useApp();

  // 3-way ordering method: 'catalog' | 'text' | 'photo'
  const [orderingMethod, setOrderingMethod] = useState<'catalog' | 'text' | 'photo'>('catalog');

  // Method 2 (Free text) states
  const [freeTextList, setFreeTextList] = useState('2 lait, 1 pain, du sucre, 3 yaourts, de l\'huile');

  // Method 3 (Photo) states
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFileName, setPhotoFileName] = useState<string | null>(null);
  const [simulatedPhotoText, setSimulatedPhotoText] = useState(
    '2 lait, 1 pain, du sucre, 3 yaourts, de l\'huile'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Method 1 (Catalog) states
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [isFavorite, setIsFavorite] = useState(false);
  const [storeSearch, setStoreSearch] = useState('');

  const storeProducts = products.filter((p) => {
    const matchCat = selectedCat === 'all' || p.category === selectedCat;
    const matchSearch = p.name.toLowerCase().includes(storeSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories = [
    { id: 'all', label: 'Tout le hanout' },
    { id: 'epicerie', label: 'Épicerie & Couscous' },
    { id: 'frais', label: 'Produits Frais & Laitiers' },
    { id: 'boulangerie', label: 'Boulangerie & Pain' },
    { id: 'boissons', label: 'Boissons & Eau' },
    { id: 'hygiene', label: 'Hygiène & Savon beldi' },
  ];

  // Handle Free text submit
  const handleValidateFreeText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeTextList.trim()) return;
    processGroceryInput(freeTextList, 'text');
  };

  // Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset sample photo list helper
  const handleUseSamplePhoto = () => {
    setPhotoFileName('liste_manuscrite_dar.jpg');
    setPhotoPreview(
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260"><rect width="400" height="260" fill="%23FCF8EE"/><line x1="20" y1="50" x2="380" y2="50" stroke="%23EADDC7" stroke-width="2"/><line x1="20" y1="90" x2="380" y2="90" stroke="%23EADDC7" stroke-width="2"/><line x1="20" y1="130" x2="380" y2="130" stroke="%23EADDC7" stroke-width="2"/><line x1="20" y1="170" x2="380" y2="170" stroke="%23EADDC7" stroke-width="2"/><line x1="20" y1="210" x2="380" y2="210" stroke="%23EADDC7" stroke-width="2"/><text x="40" y="42" font-family="cursive" font-size="20" fill="%232A2118">2 lait centrale</text><text x="40" y="82" font-family="cursive" font-size="20" fill="%232A2118">1 pain rond beldi</text><text x="40" y="122" font-family="cursive" font-size="20" fill="%232A2118">du sucre</text><text x="40" y="162" font-family="cursive" font-size="20" fill="%232A2118">3 yaourts</text><text x="40" y="202" font-family="cursive" font-size="20" fill="%232A2118">de l\'huile</text></svg>'
    );
    setSimulatedPhotoText('2 lait, 1 pain, du sucre, 3 yaourts, de l\'huile');
  };

  // Handle Photo Analysis submit
  const handleAnalyzePhoto = () => {
    processGroceryInput(simulatedPhotoText, 'photo', photoPreview);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentScreen('client-home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--rust)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux hanouts du quartier</span>
        </button>
      </div>

      {/* Store Banner Card */}
      <div className="p-6 rounded-3xl bg-[var(--wall-dark)] border border-[var(--border-warm)] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
                {selectedStore.name}
              </h1>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-1.5 rounded-full hover:bg-white/50 text-[var(--rust)] cursor-pointer"
                title="Mettre en favori"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[var(--rust)]' : ''}`} />
              </button>
            </div>
            <p className="text-xs text-[var(--ink-muted)] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--rust)]" />
              <span>{selectedStore.address}</span>
              <span>•</span>
              <Phone className="w-3.5 h-3.5 text-[var(--moroccan-green)]" />
              <span>{selectedStore.phone}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[var(--border-warm)] text-xs text-center">
              <div className="flex items-center gap-1 font-bold text-[var(--amber-gold)]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{selectedStore.rating}</span>
              </div>
              <span className="text-[10px] text-[var(--ink-muted)]">({selectedStore.reviewsCount} avis)</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-[var(--moroccan-green-light)] border border-[var(--moroccan-green)]/30 text-[var(--moroccan-green)] text-xs text-center font-bold">
              <div>~{selectedStore.deliveryTimeMinutes} min</div>
              <span className="text-[10px] font-normal">Livraison rapide</span>
            </div>
          </div>
        </div>

        {/* Handcrafted grocer notice */}
        <div className="p-3 rounded-2xl bg-[var(--karna-paper)] border border-[var(--border-warm)] flex items-center justify-between text-xs">
          <div className="font-kalam text-sm sm:text-base text-[var(--rust)] font-bold">
            {selectedStore.bannerNote}
          </div>
          {selectedStore.hasKarna && (
            <span className="px-2.5 py-1 rounded-lg bg-[var(--rust)] text-white text-[11px] font-bold shrink-0">
              Karna Activé
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--ink-muted)] pt-1">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[var(--amber-gold)]" />
            <span>Horaires : {selectedStore.openingHours}</span>
          </span>
          <span>•</span>
          <span>Commande min : {selectedStore.minOrderDh} DH</span>
          <span>•</span>
          <span>Livraison : {selectedStore.deliveryFeeDh} DH (gratuite dès {selectedStore.freeDeliveryThresholdDh} DH)</span>
        </div>
      </div>

      {/* 3-WAY ORDERING METHOD SELECTOR (Demande Client) */}
      <div className="p-2 sm:p-2.5 rounded-2xl bg-white border-2 border-[var(--border-warm)] shadow-xs">
        <div className="text-xs font-bold text-[var(--ink-muted)] uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[var(--rust)]" />
          <span>Choisissez votre façon de commander :</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
          {/* Method 1 */}
          <button
            onClick={() => setOrderingMethod('catalog')}
            className={`p-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              orderingMethod === 'catalog'
                ? 'bg-[var(--rust)] text-white shadow-md'
                : 'bg-[var(--wall)] text-[var(--ink)] hover:bg-[var(--wall-dark)] border border-[var(--border-warm)]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>🛒 Parcourir le catalogue</span>
          </button>

          {/* Method 2 */}
          <button
            onClick={() => setOrderingMethod('text')}
            className={`p-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              orderingMethod === 'text'
                ? 'bg-[var(--rust)] text-white shadow-md'
                : 'bg-[var(--wall)] text-[var(--ink)] hover:bg-[var(--wall-dark)] border border-[var(--border-warm)]'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>✍️ Écrire ma liste</span>
          </button>

          {/* Method 3 */}
          <button
            onClick={() => setOrderingMethod('photo')}
            className={`p-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              orderingMethod === 'photo'
                ? 'bg-[var(--rust)] text-white shadow-md'
                : 'bg-[var(--wall)] text-[var(--ink)] hover:bg-[var(--wall-dark)] border border-[var(--border-warm)]'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>📷 Prendre une photo</span>
          </button>
        </div>
      </div>

      {/* METHOD 2 VIEW: ÉCRIRE SA LISTE EN TEXTE LIBRE */}
      {orderingMethod === 'text' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[var(--border-warm)] shadow-sm space-y-5 animate-in fade-in">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[var(--rust-light)] text-[var(--rust)]">✍️</span>
              <span>Écrire ma liste de courses en texte libre</span>
            </h2>
            <p className="text-xs text-[var(--ink-muted)]">
              Tapez vos produits comme dans un SMS ou un message WhatsApp envoyé à Ba Driss.
              Notre système va automatiquement identifier les articles dans le catalogue du hanout.
            </p>
          </div>

          <form onSubmit={handleValidateFreeText} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[var(--ink)] block mb-1.5">
                Votre liste pour {selectedStore.name} :
              </label>
              <textarea
                rows={4}
                required
                value={freeTextList}
                onChange={(e) => setFreeTextList(e.target.value)}
                placeholder="Écris ta liste, par exemple : 2 lait, 1 pain, du sucre, 3 yaourts, de l'huile"
                className="w-full p-4 rounded-2xl border-2 border-[var(--border-warm)] bg-[var(--wall)] text-sm text-[var(--ink)] placeholder-[var(--ink-muted)]/70 focus:outline-hidden focus:border-[var(--rust)] font-sans leading-relaxed"
              />
            </div>

            {/* Quick helper chip */}
            <div className="flex items-center justify-between text-xs flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[var(--ink-muted)]">Exemple de test :</span>
                <button
                  type="button"
                  onClick={() => setFreeTextList('2 lait, 1 pain, du sucre, 3 yaourts, de l\'huile')}
                  className="px-2.5 py-1 rounded-lg bg-[var(--wall-dark)] text-[var(--ink)] hover:text-[var(--rust)] font-semibold transition-colors cursor-pointer"
                >
                  « 2 lait, 1 pain, du sucre, 3 yaourts, de l'huile »
                </button>
              </div>

              <span className="text-[11px] text-[var(--ink-muted)] italic font-kalam">
                Séparez vos articles par des virgules ou retours à la ligne
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Valider ma liste</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* METHOD 3 VIEW: PRENDRE UNE PHOTO D'UNE LISTE MANUSCRITE */}
      {orderingMethod === 'photo' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[var(--border-warm)] shadow-sm space-y-6 animate-in fade-in">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)] flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[var(--rust-light)] text-[var(--rust)]">📷</span>
              <span>Prendre une photo de votre liste manuscrite</span>
            </h2>
            <p className="text-xs text-[var(--ink-muted)]">
              Vous avez griffonné votre liste sur un morceau de papier ou un bloc-notes à la maison ?
              Prenez-la en photo ou importez l'image pour que notre système lise vos articles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Upload & Camera Box */}
            <div className="space-y-3">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[var(--rust)]/60 rounded-3xl p-8 bg-[var(--wall)] hover:bg-[var(--wall-dark)] transition-colors cursor-pointer text-center space-y-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--rust-light)] text-[var(--rust)] flex items-center justify-center mx-auto">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <span className="font-bold text-sm text-[var(--ink)] block">
                    Prendre une photo ou Importer une image
                  </span>
                  <span className="text-xs text-[var(--ink-muted)]">
                    Appareil photo mobile, JPG, PNG ou capture
                  </span>
                </div>
              </div>

              {/* Fast testing preset button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleUseSamplePhoto}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--wall-dark)] hover:bg-stone-200 text-xs font-semibold text-[var(--ink)] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[var(--amber-gold)]" />
                  <span>Tester avec l'exemple de photo de liste manuscrite</span>
                </button>
              </div>
            </div>

            {/* Preview Box */}
            <div className="p-5 rounded-3xl bg-[var(--wall-dark)] border border-[var(--border-warm)] space-y-3 min-h-[220px] flex flex-col justify-between">
              <div>
                <span className="font-bold text-xs text-[var(--ink)] block mb-2">
                  Prévisualisation du document :
                </span>

                {photoPreview ? (
                  <div className="space-y-2">
                    <div className="rounded-2xl border border-[var(--border-warm)] overflow-hidden bg-white max-h-48 flex items-center justify-center">
                      <img
                        src={photoPreview}
                        alt="Aperçu liste manuscrite"
                        className="w-full h-auto object-contain max-h-48"
                      />
                    </div>
                    <span className="text-[11px] font-mono text-[var(--ink-muted)] block truncate">
                      Fichier : {photoFileName || 'image_liste.jpg'}
                    </span>
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs text-[var(--ink-muted)] space-y-1">
                    <ImageIcon className="w-8 h-8 mx-auto opacity-40 text-[var(--ink)]" />
                    <p>Aucune photo sélectionnée pour l'instant.</p>
                    <p className="text-[11px]">Cliquez sur le cadre de gauche pour choisir un fichier.</p>
                  </div>
                )}
              </div>

              {photoPreview && (
                <div className="pt-2 border-t border-[var(--border-warm)]">
                  <button
                    onClick={handleAnalyzePhoto}
                    className="w-full py-3 rounded-2xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Analyser ma photo et vérifier les articles</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* METHOD 1 VIEW: PARCOURIR LE CATALOGUE (Comportement et composants d'origine préservés) */}
      {orderingMethod === 'catalog' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Filter and search */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCat(c.id)}
                  className={`px-3 py-2 rounded-xl whitespace-nowrap font-medium transition-all cursor-pointer ${
                    selectedCat === c.id
                      ? 'bg-[var(--rust)] text-white shadow-xs'
                      : 'bg-white text-[var(--ink)] hover:bg-[var(--wall-dark)] border border-[var(--border-warm)]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--ink-muted)]" />
              <input
                type="text"
                value={storeSearch}
                onChange={(e) => setStoreSearch(e.target.value)}
                placeholder="Chercher dans ce hanout..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[var(--border-warm)] bg-white text-xs text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-hidden focus:border-[var(--rust)]"
              />
            </div>
          </div>

          <MoroccanStarBorder />

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {storeProducts.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] hover:shadow-md transition-all flex flex-col justify-between text-left group"
              >
                <div
                  className="cursor-pointer space-y-2"
                  onClick={() => {
                    setSelectedProduct(p);
                    setCurrentScreen('client-product');
                  }}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-[var(--wall-dark)] text-[var(--ink-muted)]">
                      {p.category}
                    </span>
                    {p.isPopular && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--amber-gold-light)] text-[var(--amber-gold)]">
                        Populaire
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-[var(--ink)] group-hover:text-[var(--rust)] transition-colors">
                      {p.name}
                    </h3>
                    {p.nameAr && (
                      <p className="font-kalam text-xs text-[var(--amber-gold)] mt-0.5">{p.nameAr}</p>
                    )}
                  </div>

                  <p className="text-xs text-[var(--ink-muted)] line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[var(--border-warm)] flex items-center justify-between">
                  <div>
                    <div className="text-base font-extrabold font-mono text-[var(--rust)]">
                      {p.price.toFixed(2)} DH
                    </div>
                    <div className="text-[10px] text-[var(--ink-muted)]">{p.unit}</div>
                  </div>

                  <button
                    onClick={() => addToCart(p, undefined, 1)}
                    className="px-3 py-1.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
