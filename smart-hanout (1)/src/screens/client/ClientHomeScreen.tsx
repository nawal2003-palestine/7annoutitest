import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanChalkboard } from '../../components/common/MoroccanChalkboard';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  Search,
  MapPin,
  Clock,
  Star,
  BookOpen,
  Filter,
  CheckCircle2,
  ArrowRight,
  Flame,
  Sparkles,
} from 'lucide-react';

export const ClientHomeScreen: React.FC = () => {
  const { stores, setSelectedStore, setCurrentScreen, products, addToCart } = useApp();
  const [search, setSearch] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [onlyKarna, setOnlyKarna] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tout le quartier', icon: '🏪' },
    { id: 'epicerie', label: 'Épicerie & Couscous', icon: '🌾' },
    { id: 'frais', label: 'Frais & Raïbi', icon: '🥛' },
    { id: 'boulangerie', label: 'Pain chaud beldi', icon: '🥖' },
    { id: 'boissons', label: 'Sidi Ali & Boissons', icon: '💧' },
    { id: 'hygiene', label: 'Savon beldi & Soins', icon: '🧼' },
  ];

  const filteredStores = stores.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.neighborhood.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase());
    const matchOpen = !onlyOpen || s.isOpen;
    const matchKarna = !onlyKarna || s.hasKarna;
    return matchSearch && matchOpen && matchKarna;
  });

  const popularProducts = products.filter((p) => p.isPopular);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8 text-left">
      {/* Search & Location Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--ink)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Position :</span>
            <span className="font-bold underline decoration-[var(--rust)]">
              Casablanca, Bourgogne (Rue Abou Ishak El Marouni)
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer text-[var(--ink)]">
              <input
                type="checkbox"
                checked={onlyOpen}
                onChange={(e) => setOnlyOpen(e.target.checked)}
                className="accent-[var(--rust)] rounded cursor-pointer"
              />
              <span className="font-semibold">Ouvert maintenant</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-[var(--ink)]">
              <input
                type="checkbox"
                checked={onlyKarna}
                onChange={(e) => setOnlyKarna(e.target.checked)}
                className="accent-[var(--rust)] rounded cursor-pointer"
              />
              <span className="font-semibold text-[var(--rust)]">Carnet Karna accepté</span>
            </label>
          </div>
        </div>

        {/* Big Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-[var(--ink-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Chercher un hanout, un produit (Atay Sultan, Raïbi, Khobz...)"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--border-warm)] bg-white text-sm text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-hidden focus:border-[var(--rust)] focus:ring-1 focus:ring-[var(--rust)] shadow-xs"
          />
        </div>

        {/* Categories Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-2 rounded-xl whitespace-nowrap font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === c.id
                  ? 'bg-[var(--rust)] text-white shadow-xs'
                  : 'bg-white text-[var(--ink)] hover:bg-[var(--wall)] border border-[var(--border-warm)]'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chalkboard Highlights + Quick Order Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Chalkboard specials of the day */}
        <div className="lg:col-span-5 space-y-4">
          <MoroccanChalkboard
            title="L'Ardoise du Jour chez Ba Driss"
            subtitle="Prix en dirhams • Arrivage frais"
          />
          <div className="p-3.5 rounded-xl bg-[var(--karna-paper)] border border-[var(--border-warm)] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--rust)]" />
              <span className="font-bold text-[var(--ink)]">Votre solde Karna en cours :</span>
            </div>
            <span className="font-mono font-bold text-sm text-[var(--rust)]">142.50 DH</span>
          </div>
        </div>

        {/* Right: Fast 1-click popular products */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[var(--ink)] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[var(--rust)]" />
              <span>Incontournables du panier marocain</span>
            </h3>
            <span className="text-xs text-[var(--ink-muted)]">Ajout immédiat en 1 clic</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularProducts.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl bg-white border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] transition-all flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs text-[var(--ink)]">{p.name}</h4>
                  <div className="text-[11px] font-mono font-bold text-[var(--rust)]">
                    {p.price.toFixed(2)} DH <span className="text-[10px] font-normal text-[var(--ink-muted)]">/ {p.unit}</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(p, undefined, 1)}
                  className="px-3 py-1.5 rounded-lg bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  + Ajouter
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MoroccanStarBorder />

      {/* Stores List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[var(--ink)]">
              Hanouts disponibles dans votre quartier ({filteredStores.length})
            </h2>
            <p className="text-xs text-[var(--ink-muted)]">
              Livraison locale en 15 à 25 minutes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStores.map((st) => (
            <div
              key={st.id}
              onClick={() => {
                setSelectedStore(st);
                setCurrentScreen('client-store');
              }}
              className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] hover:shadow-md transition-all cursor-pointer space-y-3 group text-left"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base text-[var(--ink)] group-hover:text-[var(--rust)] transition-colors">
                      {st.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--ink-muted)] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--rust)]" />
                    <span>{st.address}</span>
                  </p>
                </div>
                <span className="px-2 py-1 rounded-lg bg-[var(--amber-gold-light)] text-[var(--amber-gold)] text-xs font-bold flex items-center gap-1 border border-[var(--amber-gold)]/20 shrink-0">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {st.rating}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[var(--wall-dark)] text-xs text-[var(--ink)] font-kalam italic">
                {st.bannerNote}
              </div>

              <div className="pt-2 border-t border-[var(--border-warm)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[var(--moroccan-green)]" />
                  ~{st.deliveryTimeMinutes} min
                </span>
                {st.hasKarna && (
                  <span className="px-2 py-0.5 rounded bg-[var(--rust-light)] text-[var(--rust)] font-semibold text-[11px] border border-[var(--rust)]/20">
                    Karna ✓
                  </span>
                )}
                <span className="font-semibold text-[var(--ink)]">
                  Min {st.minOrderDh} DH
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
